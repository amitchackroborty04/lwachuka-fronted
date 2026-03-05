"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export function PropertyImageGallery() {
  // ✅ Dummy data (replace later)
  const images: GalleryImage[] = [
    { id: "1", src: "/g1.png", alt: "Kitchen view" },
    { id: "2", src: "/g2.jpg", alt: "Living room" },
    { id: "3", src: "/g3.jpg", alt: "Dining area" },
    { id: "4", src: "/g2.jpg", alt: "Bedroom" },
    { id: "5", src: "/g1.png", alt: "Bathroom" },
    { id: "6", src: "/g2.jpg", alt: "Balcony" },
    { id: "7", src: "/g3.jpg", alt: "Exterior" },
    { id: "8", src: "/g2.jpg", alt: "Lobby" },
  ];

  const [active, setActive] = React.useState(0);

  const total = images.length;
  const activeImg = images[active];

  const next = () => setActive((p) => (p + 1) % total);
  const prev = () => setActive((p) => (p - 1 + total) % total);

  // thumbs: show max 7 + last "more" tile like screenshot
  const thumbsToShow = 7;
  const visibleThumbs = images.slice(0, thumbsToShow);
  const remaining = Math.max(0, total - thumbsToShow);

  return (
    <section className="w-full ">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        {/* Main Image */}
        <div className="relative overflow-hidden rounded-2xl bg-[#F4F6F8] border border-[#EDEDED] shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
          {/* responsive height */}
          <div className="relative h-[220px] sm:h-[320px] md:h-[420px] lg:h-[520px]">
            <Image
              src={activeImg.src}
              alt={activeImg.alt}
              fill
              priority
              className="object-cover"
            />

            {/* arrows */}
            <div className="absolute inset-0 flex items-center justify-between px-3 sm:px-4">
              <Button
                type="button"
                onClick={prev}
                variant="secondary"
                className="h-9 w-9 rounded-full p-0 bg-white/90 hover:bg-white shadow"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 text-[#0B1C39]" />
              </Button>

              <Button
                type="button"
                onClick={next}
                variant="secondary"
                className="h-9 w-9 rounded-full p-0 bg-white/90 hover:bg-white shadow"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 text-[#0B1C39]" />
              </Button>
            </div>

            {/* dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActive(idx)}
                    aria-label={`Go to image ${idx + 1}`}
                    className={[
                      "h-2.5 w-2.5 rounded-full transition",
                      idx === active ? "bg-[#0B1C39]" : "bg-[#D7E6FF]",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnails row */}
        <div className="mt-4">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {visibleThumbs.map((img, idx) => {
              const isActive = idx === active;
              return (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={[
                    "relative flex-shrink-0 overflow-hidden rounded-xl border bg-[#F4F6F8]",
                    "h-[64px] w-[110px] sm:h-[72px] sm:w-[130px] md:h-[80px] md:w-[150px]",
                    isActive ? "border-[#0B1C39] ring-2 ring-[#0B1C39]/15" : "border-[#E5E5E5]",
                  ].join(" ")}
                  aria-label={`Select ${img.alt}`}
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition" />
                </button>
              );
            })}

            {/* More tile */}
            {remaining > 0 && (
              <button
                type="button"
                onClick={() => setActive(thumbsToShow)} // jump to next one
                className={[
                  "relative flex-shrink-0 overflow-hidden rounded-xl border border-[#E5E5E5]",
                  "h-[64px] w-[110px] sm:h-[72px] sm:w-[130px] md:h-[80px] md:w-[150px]",
                ].join(" ")}
                aria-label={`View ${remaining} more photos`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${images[thumbsToShow]?.src || images[0].src})` }}
                />
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-white">
                  <p className="text-xs font-semibold">{remaining}+ More</p>
                  <p className="text-xs text-white/90">Photos</p>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}