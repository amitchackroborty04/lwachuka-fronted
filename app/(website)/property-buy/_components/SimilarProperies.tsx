"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PropertyCard } from "@/components/common/PropertyCard";

/* ---------------- DUMMY DATA ---------------- */
const similarProperties = [
  {
    id: 1,
    image: '/cardimage.jpg',
    title: "Portofino, DAMAC Lagoons, Dubai",
    location: "Portofino, DAMAC Lagoons, Dubai",
    price: "KSh 45.0M",
    beds: 5,
    baths: 6,
    builtUpSqft: "1,976 sqft",
    plotSqft: "2,268 sqft",
    tagline: "Genuine Resale | End Unit | Luxurious",
    status: "For Sale" as const,
    availability: "Available",
  },
  {
    id: 2,
     image: '/cardimage.jpg',
    title: "Portofino, DAMAC Lagoons, Dubai",
    location: "Portofino, DAMAC Lagoons, Dubai",
    price: "KSh 45.0M",
    beds: 5,
    baths: 6,
    builtUpSqft: "1,976 sqft",
    plotSqft: "2,268 sqft",
    tagline: "Genuine Resale | End Unit | Luxurious",
    status: "For Sale" as const,
    availability: "Available",
  },
  {
    id: 3,
     image: '/cardimage.jpg',
    title: "Portofino, DAMAC Lagoons, Dubai",
    location: "Portofino, DAMAC Lagoons, Dubai",
    price: "KSh 45.0M",
    beds: 5,
    baths: 6,
    builtUpSqft: "1,976 sqft",
    plotSqft: "2,268 sqft",
    tagline: "Genuine Resale | End Unit | Luxurious",
    status: "For Sale" as const,
    availability: "Available",
  },
  {
    id: 4,
     image: '/cardimage.jpg',
    title: "Portofino, DAMAC Lagoons, Dubai",
    location: "Portofino, DAMAC Lagoons, Dubai",
    price: "KSh 45.0M",
    beds: 5,
    baths: 6,
    builtUpSqft: "1,976 sqft",
    plotSqft: "2,268 sqft",
    tagline: "Genuine Resale | End Unit | Luxurious",
    status: "For Sale" as const,
    availability: "Available",
  },
];

export default function SimilarProperies() {
  return (
    <section className="py-16 md:py-16 bg-white">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        {/* Heading (same style like screenshot) */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C39]">
            Similar <span className="text-[#D3920E]">Properties</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#8A8A8A]">
            Explore other carefully selected properties that match your preferences and lifestyle.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            {/* arrows position like screenshot */}
            <CarouselPrevious className="hidden md:flex -left-6 lg:-left-10 top-1/2 -translate-y-1/2" />
            <CarouselNext className="hidden md:flex -right-6 lg:-right-10 top-1/2 -translate-y-1/2" />

            <CarouselContent className="-ml-6">
              {similarProperties.map((p) => (
                <CarouselItem
                  key={p.id}
                  className="
                    pl-6
                    basis-[90%]
                    sm:basis-[70%]
                    md:basis-1/2
                    lg:basis-1/3
                    xl:basis-[28%]
                  "
                >
                  <PropertyCard
                    image={p.image}
                    title={p.title}
                    location={p.location}
                    price={p.price}
                    beds={p.beds}
                    baths={p.baths}
                    builtUpSqft={p.builtUpSqft}
                    plotSqft={p.plotSqft}
                    tagline={p.tagline}
                    status={p.status}
                    availability={p.availability}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}