"use client";

import { PropertyCard } from "@/components/common/PropertyCard";
import { useMemo, useState } from "react";

type TabType = "all" | "sale" | "rent";

export function PropertyListingsSection() {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  // Dummy Data (you can replace later)
  const properties = useMemo(
    () => [
      {
        id: 1,
        image: '/cardimage.jpg',
        title: "Modern 3-Bedroom Apartment in Westland’s",
        location: "Westland’s, Nairobi",
        price: "KSh 45.0M",
        beds: 5,
        baths: 6,
        status: "For Sale" as const,
        availability: "Available",
        builtUpSqft: "1,976 sqft",
        plotSqft: "2,268 sqft",
        tagline: "Genuine Resale | End Unit | Luxurious",
      },
      {
        id: 2,
        image: '/cardimage.jpg',
        title: "Modern 3-Bedroom Apartment in Westland’s",
        location: "Westland’s, Nairobi",
        price: "KSh 45.0M",
        beds: 5,
        baths: 6,
        status: "For Sale" as const,
        availability: "Available",
        builtUpSqft: "1,976 sqft",
        plotSqft: "2,268 sqft",
        tagline: "Genuine Resale | End Unit | Luxurious",
      },
      {
        id: 3,
        image: '/cardimage.jpg',
        title: "Modern 3-Bedroom Apartment in Westland’s",
        location: "Westland’s, Nairobi",
        price: "KSh 45.0M",
        beds: 5,
        baths: 6,
        status: "For Sale" as const,
        availability: "Available",
        builtUpSqft: "1,976 sqft",
        plotSqft: "2,268 sqft",
        tagline: "Genuine Resale | End Unit | Luxurious",
      },

      // Extra dummy for Rent tab (you said you will add later)
      {
        id: 4,
        image: '/cardimage.jpg',
        title: "Luxury 2BR Apartment in Kilimani",
        location: "Kilimani, Nairobi",
        price: "KSh 85,000/mo",
        beds: 2,
        baths: 2,
        status: "For Rent" as const,
        availability: "Available",
        builtUpSqft: "1,150 sqft",
        plotSqft: "—",
        tagline: "Fully Furnished | Great View | Secure",
      },
      {
        id: 5,
        image: '/cardimage.jpg',
        title: "Cozy Studio Flat in Lavington",
        location: "Lavington, Nairobi",
        price: "KSh 45,000/mo",
        beds: 1,
        baths: 1,
        status: "For Rent" as const,
        availability: "Available",
        builtUpSqft: "520 sqft",
        plotSqft: "—",
        tagline: "Affordable | Near Mall | Quiet Area",
      },
      {
        id: 6,
       image: '/cardimage.jpg',
        title: "Spacious 3BR Townhouse in Karen",
        location: "Karen, Nairobi",
        price: "KSh 120,000/mo",
        beds: 3,
        baths: 3,
        status: "For Rent" as const,
        availability: "Available",
        builtUpSqft: "1,980 sqft",
        plotSqft: "—",
        tagline: "Family Friendly | Parking | Garden",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (activeTab === "all") return properties.slice(0, 3); // show 3 like screenshot
    if (activeTab === "sale")
      return properties.filter((p) => p.status === "For Sale").slice(0, 3);
    return properties.filter((p) => p.status === "For Rent").slice(0, 3);
  }, [activeTab, properties]);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl md:text-[32px] font-bold text-[#0B1C39]">
            All <span className="text-[#D3920E]">Property Listings</span>
          </h2>
          <p className="mt-3 text-base text-[#8E938F] ">
            A thoughtfully designed property offering modern features, quality
            finishes, and a comfortable living experience in a prime location.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex items-center gap-8 text-xl">
          <TabButton
            active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
            label="All Properties"
          />
          <TabButton
            active={activeTab === "sale"}
            onClick={() => setActiveTab("sale")}
            label="For Sale"
          />
          <TabButton
            active={activeTab === "rent"}
            onClick={() => setActiveTab("rent")}
            label="For Rent"
          />
        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard
              key={p.id}
              image={p.image}
              title={p.title}
              location={p.location}
              price={p.price}
              beds={p.beds}
              baths={p.baths}
              status={p.status}
              availability={p.availability}
              builtUpSqft={p.builtUpSqft}
              plotSqft={p.plotSqft}
              tagline={p.tagline}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TabButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative pb-2 transition",
        active ? "text-[#0B1C39] font-semibold" : "text-[#8A8A8A]",
      ].join(" ")}
    >
      {label}
      {/* underline like screenshot */}
      <span
        className={[
          "absolute left-0 -bottom-[2px] h-[2px] w-full rounded-full transition",
          active ? "bg-[#0B1C39]" : "bg-transparent",
        ].join(" ")}
      />
    </button>
  );
}