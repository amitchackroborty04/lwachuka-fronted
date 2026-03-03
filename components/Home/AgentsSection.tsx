import Image from "next/image";
import { Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AgentsSection() {
  const agents = [
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
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C39]">
            Meet <span className="text-[#D3920E]">Our Top</span> Agents & Vendors
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#8A8A8A]">
            Work with verified, professional real estate agents to find your perfect property
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-[#F1F1F1]"
            >
              {/* Image as background */}
              <div className="relative h-[400px] w-full bg-[#F4F6F8]">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                  {agent.name}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-xs text-[#7D7D7D]">
                  <Building2 className="h-4 w-4" />
                  <span>{agent.company}</span>
                </div>

                {/* Divider */}
                <div className="my-4 h-px w-full bg-[#EAEAEA]" />

                {/* Listing + Profile */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-[#7D7D7D]">
                    Listing: <span className="text-[#1E1E1E] font-medium">{agent.listings}</span>
                  </div>

                  <button className="text-xs font-medium text-[#051E3C] hover:opacity-80 inline-flex items-center gap-2">
                    View Profile <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* WhatsApp Button (Dark Navy like screenshot) */}
                <Button className="mt-8 w-full h-11 rounded-lg bg-[#061F3D] hover:bg-[#061F3D]/90 text-white">
                  <span className="inline-flex items-center gap-2">
                   <Image src="/WhatsApp.png" alt="WhatsApp" width={1000} height={1000} className="w-5 h-5" />
                    WhatsApp
                  </span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}