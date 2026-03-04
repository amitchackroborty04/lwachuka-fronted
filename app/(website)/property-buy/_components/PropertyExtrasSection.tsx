import {
  BedDouble,
  Bath,
  Ruler,
  Utensils,
  Car,
  Sparkles,
  Wind,
  CheckCircle2,
  Mountain,
  Shirt,
  Sofa,
  ConciergeBell,
  PawPrint,
  CookingPot,
  HeartHandshake,
  Users,
  ClipboardList,
  Salad,
  Siren,
  Bus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ---------------- DUMMY DATA ---------------- */

const highlights = [
  { icon: BedDouble, label: "5 Bedrooms" },
  { icon: Bath, label: "6 Bathrooms" },
  { icon: Ruler, label: "Built-up: 2,364 sqft" },
  { icon: Mountain, label: "Balcony with Open View" },
  { icon: Utensils, label: "Fully Equipped Kitchen" },
  { icon: Shirt, label: "Built-in Wardrobes" },
  { icon: Car, label: "Covered Parking Space" },
  { icon: Wind, label: "Central Air Conditioning" },
  { icon: Sparkles, label: "High-Quality Finishes" },
  { icon: CheckCircle2, label: "Ready-to-Move In" },
];

const amenities = [
  { icon: Sofa, label: "Furnished" },
  { icon: ConciergeBell, label: "Concierge" },
  { icon: PawPrint, label: "Pet-Friendly" },
  { icon: CookingPot, label: "Meal Preparation And Service" },
  { icon: HeartHandshake, label: "Faith Based" },
  { icon: Users, label: "Community-Sponsored Activities" },
  { icon: ClipboardList, label: "Move-In Coordination" },
  { icon: Salad, label: "Special Dietary Restrictions" },
  { icon: Siren, label: "Emergency Alert System" },
  { icon: Bus, label: "Transportation & Parking" },
];

const infoRows = [
  { leftLabel: "Type", leftValue: "Modern 3-Bedroom Apartment in Westland’s", rightLabel: "Added on", rightValue: "16 January 2026" },
  { leftLabel: "Purpose", leftValue: "For Sale", rightLabel: "Original price", rightValue: "KSH 100,000" },
  { leftLabel: "Reference no.", leftValue: "748596", rightLabel: "Handover date", rightValue: "16 January 2026" },
  { leftLabel: "Furnishing", leftValue: "Unfurnished", rightLabel: "Completion", rightValue: "Off-Plan" },
];

/* ---------------- COMPONENT ---------------- */

export function PropertyExtrasSection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        {/* Key Property Highlights */}
        <div>
          <h2 className="text-[32px]  font-bold text-[#0B1C39]">
            Key <span className="text-[#D3920E]">Property Highlights</span>
          </h2>
          <p className="mt-2 text-sm text-[#8A8A8A] max-w-3xl">
            A thoughtfully designed property offering modern features, quality finishes, and a comfortable living experience in a prime location.
          </p>

          <div className="mt-6 grid gap-y-4 gap-x-6 sm:grid-cols-2 lg:grid-cols-5">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2 text-sm text-[#0B1C39]">
                  <span className="">
                    <Icon className="h-4 w-4 text-[#D3920E]" />
                  </span>
                  <span className="text-[#2B2B2B]">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Property & Community Amenities */}
        <div className="mt-14">
          <h2 className="text-[32px] font-bold text-[#0B1C39]">
            Property & <span className="text-[#D3920E]">Community Amenities</span>
          </h2>
          <p className="mt-2 text-sm text-[#8A8A8A] max-w-3xl">
            A range of modern facilities and conveniences designed to enhance everyday living and provide comfort, safety, and convenience.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {amenities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E8E8E8] bg-white px-4 py-2 text-sm text-[#2B2B2B]"
                >
                  <Icon className="h-4 w-4 text-[#D3920E]" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Property Information */}
        <div className="mt-16">
          <h2 className="text-[32px] font-bold text-[#0B1C39]">
            Property <span className="text-[#D3920E]">Information</span>
          </h2>

          <div className="mt-6 overflow-hidden rounded-xl border border-[#EDEDED] bg-white">
            {/* Table Header (desktop) */}
            <div className="hidden md:grid md:grid-cols-4 bg-[#FAFAFA] border-b border-[#EDEDED] text-xs font-semibold text-[#6F6F6F]">
              <div className="px-6 py-4"> </div>
              <div className="px-6 py-4"> </div>
              <div className="px-6 py-4"> </div>
              <div className="px-6 py-4"> </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-[#F0F0F0]">
              {infoRows.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-0 px-4 sm:px-6 py-5"
                >
                  {/* Left label */}
                  <div className="text-xs font-semibold text-[#0B1C39]">
                    {row.leftLabel}
                  </div>

                  {/* Left value */}
                  <div className="text-sm text-[#6F6F6F]">
                    {row.leftValue}
                  </div>

                  {/* Right label */}
                  <div className="text-xs font-semibold text-[#0B1C39]">
                    {row.rightLabel}
                  </div>

                  {/* Right value */}
                  <div className="text-sm text-[#6F6F6F] md:text-right">
                    {row.rightValue}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Button */}
          <div className="mt-10 flex justify-center">
            <Button className="h-10 px-10 rounded-md bg-[#B78222] hover:bg-[#9f6f1d] text-white">
              Contact Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}