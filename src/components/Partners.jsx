const partners = [
  { name: 'CTK Biotech', logo: '/assets/partners-ctk.png' },
  { name: 'DiaSys', logo: '/assets/partners-diasys.svg' },
  { name: 'Rayto', logo: '/assets/partners-rayto.png' },
  { name: 'Snibe', logo: '/assets/partners-snibe.png' },
  { name: 'Edan', logo: '/assets/partners-edan.png' },
  { name: 'Seamaty', logo: '/assets/partners-seamaty.png' },
  { name: 'Medica', logo: '/assets/partners-medica.gif' },
]

function PartnerRow({ ariaHidden = false }) {
  return (
    <div
      className="partner-logo-row flex items-center gap-6 sm:gap-8 text-primary"
      aria-hidden={ariaHidden || undefined}
    >
      {partners.map((p) => (
        <span
          key={p.name}
          className="partner-logo-item"
        >
          <img
            src={p.logo}
            alt={p.name}
            className="partner-logo-image"
            loading="lazy"
            decoding="async"
          />
        </span>
      ))}
    </div>
  )
}

export default function Partners() {
  return (
    <section className="partners-section relative overflow-hidden pt-14 pb-12 sm:pt-16 sm:pb-14">
      <div className="partners-background" aria-hidden="true">
        <span className="partners-breathing-blob" />
        <span className="partners-particle-field" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-white font-[700] text-sm sm:text-[15px] tracking-[0.16em] uppercase">
            Trusted partners
          </p>
          <h2 className="mt-3 font-heading font-[800] text-white text-2xl sm:text-3xl lg:text-[34px] tracking-tight">
            Representing world-class manufacturers across the Philippines
          </h2>
        </div>

        <div className="partners-carousel">
          <div className="marquee partners-marquee">
            <PartnerRow />
            <PartnerRow ariaHidden />
          </div>
        </div>
      </div>
    </section>
  )
}
