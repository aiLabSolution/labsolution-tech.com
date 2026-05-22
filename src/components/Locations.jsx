const offices = [
  {
    city: 'Cebu',
    tag: 'Headquarters',
    region: 'Visayas',
    address: '3rd Floor, ALP Tower, 609 Tres de Abril St., Cebu City, Cebu',
    featured: true,
  },
  {
    city: 'Manila',
    tag: 'Luzon Office',
    region: 'Luzon',
    address:
      // eslint-disable-next-line no-restricted-syntax -- "#286" is a street address number, not a color.
      'Unit A, #286 El Grande Avenue, Phase 3, BF Homes, Para\u00f1aque City',
  },
  {
    city: 'Davao',
    tag: 'Mindanao Office',
    region: 'Mindanao',
    address: 'Gov. Generoso St., Osme\u00f1a, Davao City',
  },
]

export default function Locations() {
  return (
    <section id="locations" className="relative py-24 sm:py-32 bg-surface overflow-hidden">
      <img
        className="locations-map-watermark"
        src="/assets/ph-map.png"
        alt=""
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-14 sm:mb-20">
          <div className="lg:col-span-6">
            <h2 className="reveal-accent-heading font-heading font-[800] text-primary text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.05]">
              <span className="location-heading-line" data-scoped-reveal>
                Three offices,
              </span>
              <span
                className="location-heading-line text-cta-hover"
                data-scoped-reveal
                style={{ '--scoped-reveal-delay': '180ms' }}
              >
                one archipelago.
              </span>
            </h2>
          </div>
          <p className="lg:col-span-5 lg:col-start-8 text-secondary text-base sm:text-lg leading-relaxed self-end">
            Luzon, Visayas, and Mindanao — local service in every region we
            deliver to.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {offices.map((office, index) => (
            <article
              key={office.city}
              className={`office-card relative bg-white border border-primary/10 rounded-3xl p-7 sm:p-8 lg:p-10 flex flex-col ${
                office.featured
                  ? 'lg:col-span-6 lg:min-h-[280px]'
                  : 'lg:col-span-3 lg:min-h-[200px]'
              }`}
              data-scoped-reveal
              style={{ '--scoped-reveal-delay': `${index * 120}ms` }}
            >
              <div className="flex items-center gap-2 text-secondary text-xs font-semibold uppercase tracking-[0.18em]">
                <span
                  className={`office-dot h-1.5 w-1.5 rounded-full ${
                    office.featured ? 'bg-accent' : 'bg-primary/30'
                  }`}
                  aria-hidden="true"
                />
                {office.tag}
              </div>

              <h3
                className={`mt-4 font-heading font-[800] text-primary tracking-[-0.02em] leading-none ${
                  office.featured
                    ? 'text-5xl lg:text-7xl'
                    : 'text-4xl lg:text-5xl'
                }`}
              >
                {office.city}
              </h3>

              <p className="mt-2 inline-flex w-fit rounded-full border border-cta-hover/20 bg-cta-hover/10 px-2.5 py-1 text-cta-hover text-[10px] uppercase tracking-[0.16em] font-[800]">
                {office.region}
              </p>

              <p
                className={`mt-auto pt-6 text-secondary text-sm leading-relaxed ${
                  !office.featured && 'lg:text-xs'
                }`}
              >
                {office.address}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
