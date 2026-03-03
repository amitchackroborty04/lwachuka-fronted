import Image from "next/image";

export function AboutUsSection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] items-start">
          {/* LEFT: Images */}
          <div className="space-y-4">
            {/* Top 2 images */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative overflow-hidden rounded-2xl bg-[#F4F6F8] h-[160px] sm:h-[190px] md:h-[250px]">
                <Image
                  src="/about1.png"
                  alt="About image 1"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-[#F4F6F8] h-[160px] sm:h-[190px] md:h-[250px]">
                <Image
                  src="/about2.png"
                  alt="About image 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Bottom wide image */}
            <div className="relative overflow-hidden rounded-2xl bg-[#F4F6F8] h-[170px] sm:h-[210px] md:h-[220px]">
              <Image
                src="/about3.png"
                alt="About image 3"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="lg:pl-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1C39]">
              About <span className="text-[#D3920E]">Us</span>
            </h2>

            <div className="mt-2 space-y-2 text-sm leading-6 text-[#838383]">
              <p>
                We are a modern property discovery and management platform created
                to transform the way people search, list, and manage real estate.
                Our vision is simple: to make property transactions transparent,
                reliable, and effortless for everyone. Whether you are a first-time
                buyer looking for a cozy apartment, a family searching for a forever
                home, or an investor exploring opportunities, we provide the tools
                and insights you need to make confident decisions.
              </p>

              <p>
                Our journey began with the belief that finding a home should be
                inspiring, not overwhelming. Too often, property seekers face
                scattered information, unreliable listings, and complicated
                processes. We set out to change that by building a platform that
                combines verified listings, advanced search filters, secure payments,
                and vendor analytics — all wrapped in a clean, user-friendly design.
              </p>

              <p>
                Behind the scenes, our team brings together expertise in design,
                technology, and real estate. We work tirelessly to ensure that every
                listing is authentic, every transaction is secure, and every user
                experience is seamless. From property owners and agents to buyers
                and renters, we empower all stakeholders with dashboards, analytics,
                and advertising tools that make property management smarter and more
                efficient.
              </p>

              <p>
                At the heart of our mission is trust. We believe that trust is built
                through transparency, reliability, and continuous improvement.
                That&apos;s why we focus not only on delivering features but also on
                creating meaningful experiences, helping people move closer to their
                dream homes while giving vendors the confidence to grow their business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}