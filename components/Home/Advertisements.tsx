import Image from "next/image";
import { Eye } from "lucide-react";

export function Advertisements() {
  const ads = [
    { id: 1, title: "Premium Moving Services", subtitle: "Banner", image: "/offer.png", views: 3421 },
    { id: 2, title: "Premium Moving Services", subtitle: "Banner", image: "/offer.png", views: 3421 },
    { id: 3, title: "Premium Moving Services", subtitle: "Banner", image: "/offer.png", views: 3421 },
    { id: 4, title: "Premium Moving Services", subtitle: "Banner", image: "/offer.png", views: 3421 },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        {/* Header (LEFT aligned like screenshot) */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C39]">
            Our <span className="text-[#D3920E]">Advertisements</span>
          </h2>
          <p className="mt-2 text-sm md:text-base text-[#8A8A8A] max-w-xl">
            Experience the easiest, safest, and most transparent way to find properties in Kenya
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ads.map((ad) => (
            <div key={ad.id}>
              {/* Blue frame container */}
              <div className="rounded-2xl ">
                {/* White inner border */}
                <div className="rounded-xl bg-white p-2">
                  {/* Ad Image (BG image like screenshot) */}
                  <div className="relative h-[430px] w-full overflow-hidden rounded-[4px] bg-[#F4F6F8]">
                    <Image
                      src={ad.image}
                      alt={ad.title}
                      width={1000}
                      height={1000}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Footer text under card (outside frame like screenshot) */}
              <div className="mt-4 space-y-4">
                <p className="text-2xl font-semibold text-[#05203D]">
                  {ad.title}
                </p>
                <p className="text-base text-[#ACACAC] mt-1">{ad.subtitle}</p>

                <div className="mt-3 flex items-center gap-2 text-base text-[#68706A]">
                  <Eye className="h-4 w-4" />
                  <span>{ad.views.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}