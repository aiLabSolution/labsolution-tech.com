const partners = [
  { name: 'Snibe', italic: true },
  { name: 'DiaSys', italic: false },
  { name: 'Medica', italic: true },
  { name: 'Bionime', italic: false },
  { name: 'Lifotronic', italic: true },
  { name: 'Rayto', italic: false },
  { name: 'Edan', italic: true },
  { name: 'CTK Biotech', italic: false },
]

function PartnerRow({ ariaHidden = false }) {
  return (
    <div
      className="flex items-center gap-12 text-primary"
      aria-hidden={ariaHidden || undefined}
    >
      {partners.map((p) => (
        <span
          key={p.name}
          className={`font-heading font-[800] text-2xl tracking-tight opacity-60 hover:opacity-100 transition-opacity duration-200 ${
            p.italic ? 'italic' : ''
          }`}
        >
          {p.name}
        </span>
      ))}
    </div>
  )
}

export default function Partners() {
  return (
    <section className="py-20 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase">
            Trusted partners
          </p>
          <h2 className="mt-3 font-heading font-[800] text-primary text-3xl sm:text-4xl tracking-tight">
            Representing world-class manufacturers across the Philippines
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-surface to-transparent z-10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-surface to-transparent z-10"
            aria-hidden="true"
          />
          <div className="marquee">
            <PartnerRow />
            <PartnerRow ariaHidden />
          </div>
        </div>
      </div>
    </section>
  )
}
