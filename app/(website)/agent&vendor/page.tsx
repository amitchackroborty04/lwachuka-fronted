"use client";

import { useMemo, useState } from "react";
import VendorCard from "@/components/common/VendorCard";

type TabKey = "agent" | "vendor";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function TrustedAgentsVendors() {
  const [tab, setTab] = useState<TabKey>("agent");

  const agents = useMemo(
    () => [
      {
        id: 1,
        name: "Rain Altmann",
        company: "Prime Properties Kenya",
        image: "/vendor.png",
        listings: 45,
      },
      {
        id: 2,
        name: "Rain Altmann",
        company: "Prime Properties Kenya",
        image: "/vendor.png",
        listings: 45,
      },
      {
        id: 3,
        name: "Rain Altmann",
        company: "Prime Properties Kenya",
        image: "/vendor.png",
        listings: 45,
      },
    ],
    []
  );

  const vendors = agents;

  const filtered = useMemo(() => (tab === "agent" ? agents : vendors), [agents, vendors, tab]);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[22px] sm:text-[40px] font-extrabold text-slate-900">
            Our Trusted{" "}
            <span className="text-[#D3920E]">Agents & Vendors</span>
          </h2>
          <p className="text-[12px] sm:text-[18px] text-[#7D7D7D]">
            Connect with experienced professionals to find your perfect property
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex items-center gap-6 ">
          <button
            onClick={() => setTab("agent")}
            className={cn(
              "relative pb-3 text-[16px] font-semibold transition-colors",
              tab === "agent" ? "text-slate-900" : "text-slate-400 hover:text-slate-700"
            )}
          >
            Agent
            <span
              className={cn(
                "absolute left-0 -bottom-[1px] h-[2px] w-full rounded-full transition-all",
                tab === "agent" ? "bg-slate-900" : "bg-transparent"
              )}
            />
          </button>

          <button
            onClick={() => setTab("vendor")}
            className={cn(
              "relative pb-3 text-[16px] font-semibold transition-colors",
              tab === "vendor" ? "text-slate-900" : "text-slate-400 hover:text-slate-700"
            )}
          >
            Vendor
            <span
              className={cn(
                "absolute left-0 -bottom-[1px] h-[2px] w-full rounded-full transition-all",
                tab === "vendor" ? "bg-slate-900" : "bg-transparent"
              )}
            />
          </button>
        </div>

        {/* Cards */}
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <VendorCard
              key={item.id}
              id={item.id}
              name={item.name}
              company={item.company}
              listings={item.listings}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
