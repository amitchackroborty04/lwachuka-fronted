export function AboutusBanner() {
  return (
    <section className="w-full">
      {/* Background container */}
      <div
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/contactbg.jpg')" }} // static image
      >
        {/* Responsive height */}
        <div className="relative h-[220px] sm:h-[260px] md:h-[320px] lg:h-[390px]">
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />

          {/* Content */}
          <div className="relative z-10 flex h-full items-center">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="">
                <h1 className="text-[#F8F9FA] text-center font-bold leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  Building Trust, One Home at a Time
                </h1>

                <p className="pt-4 text-[#F8F9FA] text-xs sm:text-sm md:text-xl text-center leading-relaxed">
                 We connect people with verified properties and trusted agents, creating a seamless journey from discovery to decision. Our mission is to simplify property search, empower vendors, and help every buyer feel confident in finding their perfect place.

                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom white strip */}
      <div className="h-[6px] w-full bg-white" />
    </section>
  );
}