const features = [
  {
    title: 'Quantitative accuracy.',
    description:
      'Non-subjective, quantitative results from immunofluorescence analyzers eliminate operator interpretation variability.',
  },
  {
    title: 'Rapid results.',
    description:
      'CE-marked rapid test kits deliver visible results in as little as 3 minutes, with no cross-reactivity across 30+ pathogens.',
  },
  {
    title: 'Precision assurance.',
    description:
      'Less than 3% intra-run CV ensures consistent, reproducible results you can trust for clinical decision-making.',
  },
  {
    title: 'Service first.',
    description:
      'Ongoing technical support, training, and maintenance for every product we deliver — service above all.',
  },
  {
    title: 'Wide test menu.',
    description:
      'Over 100 diagnostic products across immunology, chemistry, hematology, and rapid testing — routine to specialized.',
  },
  {
    title: 'Nationwide presence.',
    description:
      'Offices in Cebu, Manila, and Davao — serving hospitals and laboratories across Luzon, Visayas, and Mindanao.',
  },
]

export default function Features() {
  return (
    <section className="features-ambient relative py-20 sm:py-28 overflow-hidden">
      <div className="features-ambient-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="features-breathe-blob features-breathe-blob-a" aria-hidden="true" />
      <div className="features-breathe-blob features-breathe-blob-b" aria-hidden="true" />
      <div className="features-ambient-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2
            className="font-heading font-[800] text-white text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.05]"
            data-scoped-reveal
          >
            Six reasons hospitals keep coming back.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10 sm:gap-y-14">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="feature-reason grid grid-cols-[auto_1fr] gap-5 sm:gap-6 pt-5"
              data-scoped-reveal
              style={{ '--scoped-reveal-delay': `${Math.min(i * 70, 350)}ms` }}
            >
              <div className="pt-1">
                <span className="feature-number font-heading text-white/70 text-sm font-[600] tabular-nums tracking-wider">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div>
                <h3 className="features-title font-heading font-[700] text-white text-xl sm:text-2xl tracking-tight leading-snug">
                  {feature.title}
                </h3>
                <p className="features-body mt-2 text-white/86 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
