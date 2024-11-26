export default function InfiniteMarquee() {
  const services = [
    "Recording",
    "Rehearsals",
    "Mixing",
    "Mastering",
    "Podcast",
    "Live streams",
    "Duplications",
  ]

  return (
    <div className="bg-transparent py-4 lg:py-6 overflow-hidden mb-6 border-y border-white/50 mt-auto w-full">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...services, ...services].map((service, i) => (
          <div key={i} className="flex items-center">
            <span className="text-white/80 font-mono md:text-lg xl:text-xl mx-8">{service}</span>
            <span className="text-white/40 mx-8">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}

