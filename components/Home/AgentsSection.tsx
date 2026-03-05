import VendorCard from "../common/VendorCard";


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
            <VendorCard
              key={agent.id}
              name={agent.name}
              company={agent.company}
              image={agent.image}
              listings={agent.listings} id={0}            />
          ))}
        </div>
      </div>
    </section>
  );
}