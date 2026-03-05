"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ListingMini = {
  id: number;
  price: string;
  location: string;
  title: string;
};

type EmailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: ListingMini | null;
};

export default function EmailModal({ open, onOpenChange, listing }: EmailModalProps) {
  const [loading, setLoading] = useState(false);
  const labelClass = "text-[12px] font-semibold text-[#1F2937]";
  const inputClass =
    "mt-1 h-11 w-full rounded-md border border-[#D1D5DB] bg-white px-3 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#9CA3AF]";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Here call your API
    // await fetch("/api/contact", { method: "POST", body: ... })

    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[610px] rounded-xl p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader className="pr-8">
            <DialogTitle className="text-[20px] font-semibold text-[#1E1E1E]">
              {listing?.title ?? "Email Agent"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  First Name <span className="text-[#E02424]">*</span>
                </label>
                <input
                  required
                  className={inputClass}
                  placeholder="Mariam"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Last Name <span className="text-[#E02424]">*</span>
                </label>
                <input
                  required
                  className={inputClass}
                  placeholder="Beck"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Email Address <span className="text-[#E02424]">*</span>
              </label>
              <input
                required
                type="email"
                className={inputClass}
                placeholder="mariam.beck@example.com"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="relative">
                <label className={labelClass}>Preferred Date</label>
                <input
                  type="date"
                  className={`${inputClass} pr-10`}
                />
                <span className="pointer-events-none absolute right-3 top-[38px] text-[#9AA3AF]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 2V5M17 2V5M3 9H21M5 5H19C20.1046 5 21 5.89543 21 7V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7C3 5.89543 3.89543 5 5 5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="tel"
                  className={inputClass}
                  placeholder="+88 74869 65"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="h-11 w-full rounded-md bg-[#0B1B33] hover:bg-[#0B1B33]/90"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </Button>

            <label className="flex items-start gap-2 text-[16px] text-[#7D7D7D]">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0B1B33] focus:ring-[#0B1B33]"
                defaultChecked
              />
              Email me listings and apartment related info.
            </label>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
