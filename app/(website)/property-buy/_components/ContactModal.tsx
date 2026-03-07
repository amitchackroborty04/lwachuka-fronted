"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ContactModalProps {
  trigger?: React.ReactNode;
}

export default function ContactModal({ trigger }: ContactModalProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ekhane pore API call / email / form submit logic dite parba
    console.log("Message submitted");

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <button
            type="button"
            className="h-10 rounded-md bg-[#B78222] px-10 text-white transition hover:bg-[#9f6f1d]"
          >
            Contact Now
          </button>
        )}
      </DialogTrigger>

      <DialogContent
        className="
          w-[calc(100%-24px)]
          max-w-[560px]
          rounded-[16px]
          border-none
          bg-[#F8F8F8]
          p-0
          shadow-2xl
        "
      >
        <div className="rounded-[16px] bg-[#F8F8F8] p-5 sm:p-7">
          <div className="mb-6">
            <h2 className="text-[34px] font-bold leading-none text-[#0B2341]">
              Get in Touch
            </h2>
            <p className="mt-2 text-[18px] text-[#7A7A7A]">
              Our friendly team would love to hear from you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-[15px] font-medium text-[#3D3D3D]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="hello@example.com"
                className="
                  h-[48px]
                  w-full
                  rounded-[4px]
                  border
                  border-[#CFCFCF]
                  bg-transparent
                  px-4
                  text-[15px]
                  text-[#333]
                  outline-none
                  placeholder:text-[#9A9A9A]
                  focus:border-[#0B2341]
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-[15px] font-medium text-[#3D3D3D]">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+971 4567890"
                className="
                  h-[48px]
                  w-full
                  rounded-[4px]
                  border
                  border-[#CFCFCF]
                  bg-transparent
                  px-4
                  text-[15px]
                  text-[#333]
                  outline-none
                  placeholder:text-[#9A9A9A]
                  focus:border-[#0B2341]
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-[15px] font-medium text-[#3D3D3D]">
                Message
              </label>
              <textarea
                rows={7}
                placeholder="Write your message here..."
                className="
                  min-h-[160px]
                  w-full
                  resize-none
                  rounded-[4px]
                  border
                  border-[#CFCFCF]
                  bg-transparent
                  px-4
                  py-3
                  text-[15px]
                  text-[#333]
                  outline-none
                  placeholder:text-[#9A9A9A]
                  focus:border-[#0B2341]
                "
              />
            </div>

            <button
              type="submit"
              className="
                h-[48px]
                w-full
                rounded-[8px]
                bg-[#0B2341]
                text-[16px]
                font-medium
                text-white
                transition
                hover:bg-[#081a31]
              "
            >
              Send Message
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}