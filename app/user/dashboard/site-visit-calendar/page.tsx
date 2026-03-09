

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef } from "react";
import {
  CalendarDays,
  Eye,
  X,
  MapPin,
  Clock3,
  User,
  AlertCircle,
  Phone,
  Mail,
} from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type PropertyType = {
  _id: string;
  title: string;
  location: string;
  images: string[];
};

type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type Booking = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  moveInData: string;
  phone: string;
  status: "pending" | "confirmed" | "completed" | "cancelled" | string;
  user: UserType | null;
  property: PropertyType | null;
  createdAt: string;
  updatedAt: string;
};

type BookingDetail = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  moveInData: string;
  phone: string;
  status: string;
  user: UserType | string | null;
  property: PropertyType | string | null;
  createdAt: string;
  updatedAt: string;
};

type VisitSummary = {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  agent: string;
  contact: string;
  note: string;
  statusLabel: string;
  raw: Booking;
};

type SessionUser = {
  accessToken?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatDate(iso: string): string {
  if (!iso) return "Invalid date";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Invalid date";

  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function isFuture(dateStr: string): boolean {
  if (!dateStr) return false;

  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return false;

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return d > now;
}

function formatStatusLabel(status?: string): string {
  if (!status) return "Unknown";

  const normalized = status.toLowerCase().trim();

  if (normalized === "cancelled") return "Cancelled";
  if (normalized === "completed") return "Completed";
  if (normalized === "confirmed") return "Confirmed";
  if (normalized === "pending") return "Pending";
  if (normalized === "approved") return "Approved";

  const cleaned = status.replace(/_/g, " ").trim();
  if (!cleaned) return "Unknown";

  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
}

function isPropertyObject(
  value: PropertyType | string | null | undefined
): value is PropertyType {
  return !!value && typeof value === "object" && "_id" in value;
}

function buildVisitSummary(booking: Booking): VisitSummary {
  const title = booking.property?.title || "Untitled Property";
  const location = booking.property?.location || "Location not available";
  const date = formatDate(booking.moveInData);

  const agent = booking.user
    ? `${booking.user.firstName ?? ""} ${booking.user.lastName ?? ""}`.trim() ||
      "N/A"
    : "N/A";

  const note = `Requested by ${booking.firstName || ""} ${
    booking.lastName || ""
  }`.trim();

  const normalizedStatus = booking.status?.toLowerCase()?.trim();

  const statusLabel =
    normalizedStatus === "cancelled"
      ? "Cancelled"
      : isFuture(booking.moveInData)
      ? "Upcoming"
      : "Completed";

  return {
    id: booking._id,
    title,
    location,
    date,
    time: "Not specified",
    agent,
    contact: booking.phone || "N/A",
    note: note || "No note",
    statusLabel,
    raw: booking,
  };
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-[#E9E9E9] bg-white p-5 shadow-[0_4px_14px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div className="h-6 w-3/4 rounded bg-gray-200" />
        <div className="h-5 w-20 rounded-full bg-gray-200" />
      </div>
      <div className="mt-5 space-y-3">
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-4 w-4/6 rounded bg-gray-200" />
        <div className="h-4 w-3/6 rounded bg-gray-200" />
      </div>
      <div className="mt-5 h-10 rounded-lg bg-gray-200" />
    </div>
  );
}

function StatCard({
  value,
  label,
  icon,
  loading = false,
}: {
  value: number | string;
  label: string;
  icon: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#E9E9E9] bg-white px-4 py-5 shadow-[0_4px_14px_rgba(15,23,42,0.06)] sm:px-5 sm:py-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          {loading ? (
            <div className="h-9 w-16 animate-pulse rounded bg-gray-200" />
          ) : (
            <h3 className="text-[28px] font-bold leading-none text-[#0B2239] sm:text-[32px]">
              {value}
            </h3>
          )}
          <p className="mt-2 text-[12px] text-[#5E6773] sm:text-[13px]">
            {label}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3FAFF] text-[#0B2239] sm:h-11 sm:w-11">
          {icon}
        </div>
      </div>
    </div>
  );
}

function UpcomingVisitCard({
  item,
  onView,
  onCancel,
}: {
  item: VisitSummary;
  onView: (visit: VisitSummary) => void;
  onCancel: (visit: VisitSummary) => void;
}) {
  return (
    <div className="rounded-2xl border border-[#E9E9E9] bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.06)] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[16px] font-medium text-[#2E353A] sm:text-[18px]">
          {item.title}
        </h3>
        <span className="shrink-0 rounded-full bg-[#EAFBF1] px-3 py-1 text-[11px] font-medium text-[#55C28A]">
          {item.statusLabel}
        </span>
      </div>

      <div className="mt-4 space-y-2.5 text-[12px] text-[#8B8F97] sm:text-[13px]">
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-[#8B8F97]" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5 text-[#8B8F97]" />
          <span>{item.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock3 className="h-3.5 w-3.5 text-[#8B8F97]" />
          <span>{item.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-3.5 w-3.5 text-[#8B8F97]" />
          <span>{item.agent}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#FBF4E7] px-3 py-3 text-[14px] font-medium text-[#D3920E]">
        <AlertCircle className="h-4 w-4 shrink-0" />
        <span>Move-in: {item.date}</span>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => onView(item)}
          className="h-11 flex-1 rounded-lg border-2 border-[#061F3D] bg-white text-[14px] font-medium text-[#061F3D] hover:bg-slate-50"
        >
          View Details
        </button>
        <button
          type="button"
          onClick={() => onCancel(item)}
          className="h-11 rounded-lg bg-[#E5533D] px-4 text-[13px] font-medium text-white hover:bg-[#cf432f]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function PastVisitRow({
  item,
  onView,
}: {
  item: VisitSummary;
  onView: (visit: VisitSummary) => void;
}) {
  const color = item.statusLabel === "Completed" ? "#6F8DFF" : "#E5533D";
  const bg = item.statusLabel === "Completed" ? "#EEF4FF" : "#FFEBEB";

  return (
    <div className="rounded-xl border border-[#ECECEC] bg-white px-4 py-4 shadow-[0_4px_14px_rgba(15,23,42,0.05)] sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-[15px] font-medium text-[#2E353A] sm:text-[16px]">
              {item.title}
            </h4>
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-medium"
              style={{ backgroundColor: bg, color }}
            >
              {item.statusLabel}
            </span>
          </div>
          <p className="mt-2 text-[12px] text-[#9A9FA8] sm:text-[13px]">
            {item.location}
            <span className="mx-2">•</span>
            {item.date}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onView(item)}
          className="text-left text-[12px] font-medium text-[#6E737B] hover:text-[#0B2239] sm:text-right"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

function CancelConfirmModal({
  open,
  visit,
  loading,
  error,
  onClose,
  onConfirm,
}: {
  open: boolean;
  visit: VisitSummary | null;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!open || !visit) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.3)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[18px] font-semibold text-[#1F2A37]">
              Cancel Visit
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to cancel this visit for{" "}
              <span className="font-medium text-[#1F2A37]">{visit.title}</span>?
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-lg border border-gray-300 py-2.5 font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Keep Visit
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-lg bg-red-500 py-2.5 font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Cancelling..." : "Cancel Visit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MyBookings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const activeDetailId = useRef<string | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedVisit, setSelectedVisit] = useState<VisitSummary | null>(null);
  const [bookingDetail, setBookingDetail] = useState<BookingDetail | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [visitToCancel, setVisitToCancel] = useState<VisitSummary | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (status === "loading") return;

        const token = (session?.user as SessionUser | undefined)?.accessToken;

        if (!token) {
          setError("User token not found. Please login again.");
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/calender/my-bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res?.data?.success && Array.isArray(res?.data?.data)) {
          setBookings(res.data.data);
        } else {
          setError("Invalid response format");
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to load bookings");
        } else {
          setError("Failed to load bookings");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session, status]);

  const handleViewDetails = async (visit: VisitSummary) => {
    setSelectedVisit(visit);
    setBookingDetail(null);
    setDetailsError(null);
    setDetailsLoading(true);
    activeDetailId.current = visit.id;

    if (status === "loading") {
      setDetailsError("Session is still loading. Please try again.");
      setDetailsLoading(false);
      return;
    }

    const token = (session?.user as SessionUser | undefined)?.accessToken;

    if (!token) {
      setDetailsError("User token not found. Please login again.");
      setDetailsLoading(false);
      return;
    }

    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/calender/${visit.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (activeDetailId.current !== visit.id) return;

      if (res?.data?.success && res?.data?.data) {
        setBookingDetail(res.data.data);
      } else {
        setDetailsError("Invalid response format");
      }
    } catch (err: unknown) {
      if (activeDetailId.current !== visit.id) return;

      if (axios.isAxiosError(err)) {
        setDetailsError(
          err.response?.data?.message || "Failed to load booking details"
        );
      } else {
        setDetailsError("Failed to load booking details");
      }
    } finally {
      if (activeDetailId.current === visit.id) {
        setDetailsLoading(false);
      }
    }
  };

  const openCancelModal = (visit: VisitSummary) => {
    setVisitToCancel(visit);
    setCancelError(null);
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    if (cancelLoading) return;
    setCancelModalOpen(false);
    setVisitToCancel(null);
    setCancelError(null);
  };

  const handleCancelVisit = async () => {
    if (!visitToCancel?.id) return;

    const token = (session?.user as SessionUser | undefined)?.accessToken;

    if (!token) {
      setCancelError("User token not found. Please login again.");
      return;
    }

    try {
      setCancelLoading(true);
      setCancelError(null);

      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/calender/${visitToCancel.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === visitToCancel.id
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );

      if (selectedVisit?.id === visitToCancel.id) {
        closeDetails();
      }

      setCancelModalOpen(false);
      setVisitToCancel(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setCancelError(
          err.response?.data?.message || "Failed to cancel the visit"
        );
      } else {
        setCancelError("Failed to cancel the visit");
      }
    } finally {
      setCancelLoading(false);
    }
  };

  const closeDetails = () => {
    activeDetailId.current = null;
    setSelectedVisit(null);
    setBookingDetail(null);
    setDetailsError(null);
    setDetailsLoading(false);
  };

  const upcoming: VisitSummary[] = bookings
    .filter(
      (b) =>
        b.property &&
        isFuture(b.moveInData) &&
        b.status?.toLowerCase() !== "cancelled"
    )
    .map(buildVisitSummary);

  const past: VisitSummary[] = bookings
    .filter(
      (b) =>
        b.property &&
        (!isFuture(b.moveInData) || b.status?.toLowerCase() === "cancelled")
    )
    .map(buildVisitSummary);

  const stats = [
    {
      value: upcoming.length,
      label: "Upcoming Visits",
      icon: <CalendarDays className="h-5 w-5" />,
    },
    {
      value: past.filter((p) => p.statusLabel === "Completed").length,
      label: "Completed",
      icon: <Eye className="h-5 w-5" />,
    },
    {
      value: past.filter((p) => p.statusLabel === "Cancelled").length,
      label: "Canceled",
      icon: <X className="h-5 w-5" />,
    },
  ];

  const detailProperty = isPropertyObject(bookingDetail?.property)
    ? bookingDetail.property
    : null;

  const summaryProperty = selectedVisit?.raw?.property ?? null;

  const propertyId =
    detailProperty?._id ||
    (typeof bookingDetail?.property === "string"
      ? bookingDetail.property
      : null) ||
    summaryProperty?._id ||
    null;

  const propertyTitle =
    detailProperty?.title ||
    summaryProperty?.title ||
    selectedVisit?.title ||
    "Untitled Property";

  const propertyLocation =
    detailProperty?.location ||
    summaryProperty?.location ||
    selectedVisit?.location ||
    "Location not available";

  const moveInDate = bookingDetail?.moveInData
    ? formatDate(bookingDetail.moveInData)
    : selectedVisit?.date || "Invalid date";

  const visitorName = (() => {
    const detailName = `${bookingDetail?.firstName ?? ""} ${
      bookingDetail?.lastName ?? ""
    }`.trim();

    if (detailName) return detailName;

    const summaryName = `${selectedVisit?.raw?.firstName ?? ""} ${
      selectedVisit?.raw?.lastName ?? ""
    }`.trim();

    return summaryName || "N/A";
  })();

  const visitorEmail = bookingDetail?.email || selectedVisit?.raw?.email || "N/A";
  const visitorPhone = bookingDetail?.phone || selectedVisit?.raw?.phone || "N/A";

  const modalStatusLabel =
    selectedVisit?.statusLabel ||
    formatStatusLabel(bookingDetail?.status) ||
    "Unknown";

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  return (
    <section className="min-h-screen w-full bg-[#F8F8F8]">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((item) => (
            <StatCard
              key={item.label}
              value={loading ? "•••" : item.value}
              label={item.label}
              icon={item.icon}
              loading={loading}
            />
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-[22px] font-medium text-[#2E353A] sm:text-[24px]">
            Site Visits
          </h2>

          {loading ? (
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : upcoming.length === 0 ? (
            <p className="mt-6 text-center text-gray-500">
              No upcoming visits found.
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
              {upcoming.map((item) => (
                <UpcomingVisitCard
                  key={item.id}
                  item={item}
                  onView={handleViewDetails}
                  onCancel={openCancelModal}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-[22px] font-medium text-[#2E353A] sm:text-[24px]">
            Past Site Visits
          </h2>

          {loading ? (
            <div className="mt-4 space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : past.length === 0 ? (
            <p className="mt-6 text-center text-gray-500">No past visits yet.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {past.map((item) => (
                <PastVisitRow
                  key={item.id}
                  item={item}
                  onView={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-[0_24px_60px_rgba(15,23,42,0.3)]">
            <div className="flex items-start justify-between gap-4 px-6 py-5">
              <div>
                <h2 className="text-[16px] font-semibold text-[#1F2A37]">
                  {propertyTitle}
                </h2>
                <span className="mt-2 inline-flex rounded-full bg-[#EAFBF1] px-2.5 py-1 text-[10px] font-medium text-[#55C28A]">
                  {modalStatusLabel}
                </span>
              </div>

              <button
                type="button"
                onClick={closeDetails}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="border-t px-6 py-5">
              {detailsLoading && (
                <p className="mb-3 text-[12px] text-gray-500">
                  Loading latest details...
                </p>
              )}

              {detailsError && (
                <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">
                  {detailsError}
                </div>
              )}

              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-700">Location</div>
                    {propertyLocation}
                  </div>
                </div>

                <div className="flex gap-3">
                  <CalendarDays className="mt-1 h-4 w-4 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-700">Move-in Date</div>
                    {moveInDate}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock3 className="mt-1 h-4 w-4 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-700">Time</div>
                    {selectedVisit.time}
                  </div>
                </div>

                <div className="flex gap-3">
                  <User className="mt-1 h-4 w-4 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-700">Booked By</div>
                    {visitorName}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Mail className="mt-1 h-4 w-4 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-700">Email</div>
                    {visitorEmail}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="mt-1 h-4 w-4 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-700">Contact</div>
                    {visitorPhone}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border bg-gray-50 p-4">
                <div className="flex items-center gap-2 font-medium text-gray-700">
                  <AlertCircle className="h-4 w-4" />
                  Important Note
                </div>
                <p className="mt-2 text-gray-600">{selectedVisit.note}</p>
              </div>
            </div>

            <div className="flex gap-3 border-t px-6 py-5">
              <button
                type="button"
                disabled={!propertyId}
                className={cn(
                  "flex-1 rounded-lg border py-2.5 font-medium",
                  propertyId
                    ? "border-gray-800 hover:bg-gray-50"
                    : "cursor-not-allowed border-gray-300 text-gray-400"
                )}
                onClick={() => {
                  if (!propertyId) return;
                  closeDetails();
                  router.push(`/property-buy/${propertyId}`);
                }}
              >
                View Property
              </button>

              <button
                type="button"
                onClick={() => openCancelModal(selectedVisit)}
                className="flex-1 rounded-lg bg-red-500 py-2.5 font-medium text-white hover:bg-red-600"
              >
                Cancel Visit
              </button>
            </div>
          </div>
        </div>
      )}

      <CancelConfirmModal
        open={cancelModalOpen}
        visit={visitToCancel}
        loading={cancelLoading}
        error={cancelError}
        onClose={closeCancelModal}
        onConfirm={handleCancelVisit}
      />
    </section>
  );
}