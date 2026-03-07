"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Eye,
  CircleCheck,
  MessageSquare,
  X,
  Send,
} from "lucide-react";

type InquiryStatus = "Responded" | "Pending" | "Viewed";

type InquiryItem = {
  id: number;
  title: string;
  location: string;
  message: string;
  agent: string;
  date: string;
  status: InquiryStatus;
  response?: string;
  responseDate?: string;
};

type StatusCardProps = {
  count: number;
  label: string;
  icon: React.ReactNode;
};

type InquiryCardProps = {
  item: InquiryItem;
  onClick?: () => void;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getStatusStyles(status: InquiryStatus) {
  switch (status) {
    case "Responded":
      return {
        badge: "bg-[#EAFBF1] text-[#55C28A]",
        iconWrap: "text-[#0B2341]",
        icon: <CircleCheck className="h-4 w-4" />,
      };
    case "Pending":
      return {
        badge: "bg-[#FBF4E3] text-[#C8A343]",
        iconWrap: "text-[#B8860B]",
        icon: <Clock3 className="h-4 w-4" />,
      };
    case "Viewed":
      return {
        badge: "bg-[#EEF4FF] text-[#6F8DFF]",
        iconWrap: "text-[#4F7BFF]",
        icon: <Eye className="h-4 w-4" />,
      };
    default:
      return {
        badge: "bg-slate-100 text-slate-600",
        iconWrap: "text-slate-600",
        icon: <CircleCheck className="h-4 w-4" />,
      };
  }
}

function StatusCard({ count, label, icon }: StatusCardProps) {
  return (
    <div className="rounded-2xl bg-white border border-[#ECECEC] shadow-[0_4px_14px_rgba(15,23,42,0.06)] px-4 py-5 sm:px-5 sm:py-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[28px] sm:text-[32px] leading-none font-bold text-[#0B2341]">
            {count}
          </h3>
          <p className="mt-2 text-[13px] sm:text-[14px] text-[#5E6773]">
            {label}
          </p>
        </div>

        <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#F3FAFF] text-[#0B2341]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function InquiryCard({ item, onClick }: InquiryCardProps) {
  const styles = getStatusStyles(item.status);

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl bg-white border border-[#ECECEC] text-left shadow-[0_4px_14px_rgba(15,23,42,0.06)] px-4 py-4 sm:px-5 sm:py-5 transition hover:border-[#D8DDE3]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <span className={cn("mt-2 shrink-0", styles.iconWrap)}>
              {styles.icon}
            </span>

            <div className="min-w-0">
              <h3 className="truncate text-[18px] sm:text-[20px] font-medium text-[#3E4650]">
                {item.title}
              </h3>
              <p className="mt-1 text-[13px] sm:text-[14px] text-[#9A9FA8]">
                {item.location}
              </p>
            </div>
          </div>
        </div>

        <span
          className={cn(
            "shrink-0 rounded-full px-3 py-1 text-[11px] sm:text-[12px] font-medium",
            styles.badge
          )}
        >
          {item.status}
        </span>
      </div>

      <p className="mt-4 text-[13px] sm:text-[14px] leading-6 text-[#5F6874]">
        {item.message}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-[12px] sm:text-[13px] text-[#8A9099] truncate">
          Agent: {item.agent}
        </p>
        <p className="shrink-0 text-[12px] sm:text-[13px] text-[#9A9FA8]">
          {item.date}
        </p>
      </div>
    </button>
  );
}

export default function InquiryDashboardClone() {
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);

  const stats = [
    {
      count: 4,
      label: "Responded",
      icon: <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      count: 2,
      label: "Pending",
      icon: <Clock3 className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      count: 2,
      label: "Viewed",
      icon: <Eye className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
  ];

  const inquiries: InquiryItem[] = [
    {
      id: 1,
      title: "3 Bedroom Apartment in Kilimani",
      location: "Kilimani, Nairobi",
      message:
        "Hi, I'm interested in viewing this property. Is it still available? What are the move-in requirements?",
      agent: "Sarah Mwangi",
      date: "2/6/2024",
      status: "Responded",
      response:
        "Hello! Yes, the property is still available. You can schedule a viewing this week. Move-in requires 2 months deposit and 1 month rent.",
      responseDate: "2/6/2024",
    },
    {
      id: 2,
      title: "4 Bedroom Villa in Karen",
      location: "Kilimani, Nairobi",
      message:
        "I would like more information about the amenities and security features of this villa.",
      agent: "David Ochieng",
      date: "2/6/2024",
      status: "Responded",
      response:
        "The villa has 24/7 security, CCTV coverage, backup generator, and a private garden. We can share a detailed amenities list if needed.",
      responseDate: "2/6/2024",
    },
    {
      id: 3,
      title: "3 Bedroom Apartment in Kilimani",
      location: "Kilimani, Nairobi",
      message:
        "Hi, I'm interested in viewing this property. Is it still available? What are the move-in requirements?",
      agent: "Sarah Mwangi",
      date: "2/6/2024",
      status: "Responded",
      response:
        "Yes, it is available. I can share available viewing slots for this week. Let me know your preferred day.",
      responseDate: "2/6/2024",
    },
    {
      id: 4,
      title: "4 Bedroom Villa in Karen",
      location: "Kilimani, Nairobi",
      message:
        "I would like more information about the amenities and security features of this villa.",
      agent: "David Ochieng",
      date: "2/6/2024",
      status: "Responded",
      response:
        "The villa includes a modern gym, heated pool, and covered parking. Security includes gated access and guards.",
      responseDate: "2/6/2024",
    },
    {
      id: 5,
      title: "Penthouse in Westlands",
      location: "Westlands, Nairobi",
      message:
        "Is the penthouse furnished? What utilities are included in the rent?",
      agent: "Grace Kamau",
      date: "2/6/2024",
      status: "Pending",
    },
    {
      id: 6,
      title: "2 Bedroom Townhouse in Lavington",
      location: "Kilimani, Nairobi",
      message:
        "I would like more information about the amenities and security features of this villa.",
      agent: "David Ochieng",
      date: "2/6/2024",
      status: "Viewed",
    },
    {
      id: 7,
      title: "3 Bedroom Apartment in Kilimani",
      location: "Kilimani, Nairobi",
      message:
        "Hi, I'm interested in viewing this property. Is it still available? What are the move-in requirements?",
      agent: "Sarah Mwangi",
      date: "2/6/2024",
      status: "Viewed",
    },
    {
      id: 8,
      title: "4 Bedroom Villa in Karen",
      location: "Kilimani, Nairobi",
      message:
        "I would like more information about the amenities and security features of this villa.",
      agent: "David Ochieng",
      date: "2/6/2024",
      status: "Pending",
    },
  ];

  return (
    <section className="w-full bg-[#F8F8F8]">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Top stat cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stats.map((item) => (
            <StatusCard
              key={item.label}
              count={item.count}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </div>

        {/* Inquiry cards */}
        <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
          {inquiries.map((item) => (
            <InquiryCard
              key={item.id}
              item={item}
              onClick={() => setSelectedInquiry(item)}
            />
          ))}
        </div>
      </div>

      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-[672px] rounded-2xl bg-white shadow-[0_20px_50px_rgba(15,23,42,0.25)]">
            <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-[20px] sm:text-[18px] font-semibold text-[#061F3D]">
                  {selectedInquiry.title}
                </h2>
                <p className="mt-1 text-[12px] sm:text-[16px] text-[#4A5565]">
                  {selectedInquiry.location}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="rounded-full p-1 text-[#98A2B3] transition hover:bg-[#F2F4F7]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="border-t border-[#EEF2F6] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2 text-[#1F2A37]">
                <MessageSquare className="h-4 w-4" />
                <h3 className="text-[18px] font-semibold text-[#051E3C]">Your Inquiry</h3>
              </div>

              <div className="mt-3 rounded-xl border-2 border-[#E5E7EB]  bg-white px-4 py-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
                <p className="text-[12px] sm:text-[16px] text-[#364153]">
                  {selectedInquiry.message}
                </p>
                <p className="mt-2 text-[11px] text-[#A0A8B3]">
                  Sent on {selectedInquiry.date}
                </p>
              </div>
            </div>

            <div className="border-t border-[#EEF2F6] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2 text-[#1F2A37]">
                <CheckCircle2 className="h-4 w-4" />
                <h3 className="text-[20px] font-semibold text-[#051E3C]">Agent Response</h3>
              </div>

              <div className="mt-3 rounded-xl border border-[#E8EDF2] bg-white px-4 py-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
                <p className="text-[12px] sm:text-[16px] text-[#364153]">
                  {selectedInquiry.response ??
                    "Awaiting response from the agent. We'll notify you as soon as they reply."}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-[#A0A8B3]">
                  <span>{selectedInquiry.response ? `- ${selectedInquiry.agent}` : ""}</span>
                  <span>{selectedInquiry.responseDate ?? selectedInquiry.date}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#EEF2F6] px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#061F3D] bg-white px-4 py-2 text-[16px] font-medium text-[#1F2A37]"
                >
                  <Eye className="h-4 w-4" />
                  View Property
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B2341] px-4 py-2 text-[16px] font-medium text-white"
                >
                  <Send className="h-4 w-4" />
                  Contact Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
