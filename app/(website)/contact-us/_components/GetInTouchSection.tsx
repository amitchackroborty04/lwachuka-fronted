"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export function GetInTouchSection() {
  return (
    <section className="py-10 md:py-14 ">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        {/* Outer card */}
        <div className="overflow-hidden rounded-2xl border border-[#EDEDED] ">
          <div className="grid lg:grid-cols-2">
            {/* Left: Form */}
            <div className="p-6 sm:p-8 md:p-10">
              <h3 className="text-4xl font-bold text-[#05203D]">
                Get in Touch
              </h3>
              <p className="mt-1 text-base text-[#6C757D]">
                Our friendly team would love to hear from you.
              </p>

              <form className="mt-6 space-y-4">
                {/* First + Last name */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-base font-medium text-[#343A40]">
                      First Name
                    </label>
                    <Input
                      placeholder="Name Here"
                      className="h-[48px] rounded-[8px] border-[#C0C3C1] focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-base font-medium text-[#343A40]">
                      Last Name
                    </label>
                    <Input
                      placeholder="Name Here"
                      className="h-[48px] rounded-[8px] border-[#C0C3C1] focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-base font-medium text-[#343A40]">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="help@example.com"
                    className="h-[48px] rounded-[8px] border-[#C0C3C1] focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-base font-medium text-[#343A40]">
                    Phone Number
                  </label>
                  <Input
                    placeholder="+971 4567890"
                    className="h-[48px] rounded-[8px] border-[#C0C3C1] focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-base font-medium text-[#343A40]">
                    Message
                  </label>
                  <Textarea
                    placeholder="Write your message here..."
                    className="min-h-[140px] rounded-[8px] border-[#C0C3C1] resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2 pt-1">
                  <Checkbox id="terms" className="mt-0.5" />
                  <label
                    htmlFor="terms"
                    className="text-[11px] leading-5 text-[#8A8A8A]"
                  >
                    You agree to our{" "}
                    <Link href="#" className="text-[#0B1C39] underline">
                      Terms &amp; Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-[#0B1C39] underline">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                {/* Button */}
                <Button className="mt-2 h-11 w-full rounded-md bg-[#05203D] hover:bg-[#05203D]/90 text-white">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Right: Image */}
            <div className="relative min-h-[240px] sm:min-h-[320px] lg:min-h-full">
              <Image
                src="/contact.png" 
                alt="Team"
                fill
                priority
                className="object-cover"
              />
              {/* slight dark vignette like screenshot */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/0 to-black/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
