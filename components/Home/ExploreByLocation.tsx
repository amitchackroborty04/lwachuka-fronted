import Image from "next/image";
import { MapPin, BedDouble, Bath, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

type NearbyProperty = {
  id: string;
  title: string;
  location: string;
  image: string;
  beds: number;
  baths: number;
  area: number; // m²
  price: string;
};

export function ExploreByLocation() {
  const nearby: NearbyProperty[] = [
    {
      id: "1",
      title: "Modern 2BR Apartment",
      location: "Westlands, Nairobi",
      image: "/miniimage.png",
      beds: 5,
      baths: 6,
      area: 100,
      price: "KSh 85,000/mo",
    },
    {
      id: "2",
      title: "Cozy Studio Flat",
      location: "Kilimani, Nairobi",
      image: "/miniimage.png",
      beds: 1,
      baths: 1,
      area: 35,
      price: "KSh 45,000/mo",
    },
    {
      id: "3",
      title: "Spacious 3BR Townhouse",
      location: "Karen, Nairobi",
      image: "/miniimage.png",
      beds: 3,
      baths: 4,
      area: 150,
      price: "KSh 120,000/mo",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C39]">
            Explore <span className="text-[#D3920E]">Properties</span> by Location
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#8A8A8A]">
            Use our interactive map to discover properties in your preferred neighborhoods
          </p>
        </div>

        {/* Layout */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-start">
          {/* Map (BG Image) */}
          <div className="relative w-full h-[420px] md:h-[460px] rounded-2xl overflow-hidden bg-[#F4F6F8]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.16174540213!2d36.76499554664578!3d-1.3032076027224155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sbd!4v1772525152311!5m2!1sen!2sbd" width="600" height="450" loading="lazy" className="w-full h-full"></iframe>
          </div>

          {/* Right: Nearby list */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold text-[#1E1E1E]">
                Nearby Properties
              </h3>

              <Button
                variant="ghost"
                className="h-auto p-0 text-base text-[#061F3D] hover:bg-transparent"
              >
                See All
              </Button>
            </div>

            <div className="space-y-4">
              {nearby.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-[#E9E9E9] bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
                >
                  <div className="flex gap-4">
                    {/* Thumb */}
                    <div className="relative h-[80px] w-[80px] rounded-xl overflow-hidden flex-shrink-0 bg-[#F4F6F8]">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-semibold text-[#0B1C39]">
                            {p.title}
                          </h4>
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#8A8A8A]">
                            <MapPin className="h-3.5 w-3.5" />
                            {p.location}
                          </p>
                        </div>

                        <div className="text-right text-sm font-semibold text-[#D3920E] whitespace-nowrap">
                          {p.price}
                        </div>
                      </div>

                      {/* Pills */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 rounded-md border border-[#ECECEC] bg-[#F7F8F8] px-2.5 py-1 text-[11px] text-[#6F6F6F]">
                          <BedDouble className="h-3.5 w-3.5" />
                          {p.beds} Beds
                        </span>

                        <span className="inline-flex items-center gap-1 rounded-md border border-[#ECECEC] bg-[#F7F8F8] px-2.5 py-1 text-[11px] text-[#6F6F6F]">
                          <Bath className="h-3.5 w-3.5" />
                          {p.baths} Baths
                        </span>

                        <span className="inline-flex items-center gap-1 rounded-md border border-[#ECECEC] bg-[#F7F8F8] px-2.5 py-1 text-[11px] text-[#6F6F6F]">
                          <Square className="h-3.5 w-3.5" />
                          {p.area}m²
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* optional spacing like screenshot */}
            <div className="mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}