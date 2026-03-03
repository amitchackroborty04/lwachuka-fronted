"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const faqs = [
    {
      q: "What is Deal360?",
      a: "Deal360 is a verified property platform connecting buyers, tenants, and investors with licensed RERA agents and exclusive property opportunities across the UAE. We focus on verified deals, not just listings.",
    },
    { q: "How do I verify an agent?", a: "You can verify an agent by checking their RERA license details on their profile and confirming verification badges on the platform." },
    { q: "What is a “Below Market” deal?", a: "A “Below Market” deal is a property opportunity priced below the typical market rate for a similar property in the same area." },
    { q: "How do private listings work?", a: "Private listings are shared with qualified buyers only. You can request access, and once approved, details become available." },
    { q: "What is SmartLink?", a: "SmartLink is a shareable listing link that tracks engagement and helps agents manage leads efficiently." },
    { q: "What is the Lead Unlock system?", a: "Lead Unlock lets agents access verified buyer leads after meeting certain criteria or using platform credits." },
    { q: "How do I create a buyer requirement?", a: "Go to your dashboard, select Buyer Requirements, and submit your preferred location, budget, and property type." },
    { q: "Are there fees for buyers?", a: "Basic browsing is free. Some premium features may require a subscription depending on your plan." },
    { q: "How do I report a problem?", a: "Use the support form or email support with screenshots and details. Our team will respond quickly." },
    { q: "What is Off-plan?", a: "Off-plan properties are purchased before construction is completed, often at early-bird pricing." },
    { q: "How do I schedule a property viewing?", a: "Open a listing and click ‘Schedule Viewing’, choose a date/time, and confirm with the agent." },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C39]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#8A8A8A]">
            Find quick answers to the most common questions about our facilities and services.
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border-b-0 py-2"
            >
              <AccordionTrigger
                className="
                  group flex w-full items-center
                  py-4 text-left text-[18px] font-semibold text-[#1E1E1E]
                  hover:no-underline [&>svg]:hidden
                "
              >
                <span>{item.q}</span>
                <span
                  className="
                    ml-4 grid h-7 w-7 place-items-center rounded-full
                    border border-[#0B1C39] text-[#0B1C39]
                  "
                >
                  <Plus className="h-4 w-4 group-data-[state=open]:hidden" />
                  <Minus className="h-4 w-4 hidden group-data-[state=open]:block" />
                </span>
              </AccordionTrigger>

              <AccordionContent className="pb-4 pr-10 text-base font-normal leading-6 text-[#7D7D7D]">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
