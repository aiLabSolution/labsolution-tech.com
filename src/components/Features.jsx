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

const constellationLines = [
  { delay: 1.1, d: 'M412 74L516 112L568 208L506 316L576 448' },
  { delay: 1.45, d: 'M332 154L440 238L506 316' },
  { delay: 1.8, d: 'M388 390L506 316L602 330' },
  { delay: 2.15, d: 'M278 466L388 390L474 518' },
]

const constellationDots = [
  [412, 74, 2.4],
  [516, 112, 1.8],
  [568, 208, 2.2],
  [506, 316, 2.8],
  [576, 448, 1.8],
  [332, 154, 1.9],
  [440, 238, 1.6],
  [388, 390, 2.2],
  [602, 330, 1.5],
  [278, 466, 1.8],
  [474, 518, 2],
]

const constellationDust = [
  [536, 58, 1.2],
  [604, 144, 1.4],
  [366, 248, 1.2],
  [584, 276, 1.1],
  [430, 468, 1.3],
  [620, 524, 1.1],
]

function Constellation({ className, delayOffset = 0 }) {
  return (
    <svg className={className} viewBox="0 0 640 620" fill="none" aria-hidden="true">
      <g className="features-constellation-lines">
        {constellationLines.map((line) => (
          <path
            key={line.d}
            style={{ '--line-delay': `${line.delay + delayOffset}s` }}
            pathLength="1"
            d={line.d}
          />
        ))}
      </g>
      <g className="features-constellation-dots">
        {constellationDots.map(([cx, cy, r], i) => (
          <circle
            key={`${cx}-${cy}`}
            className="features-constellation-dot"
            cx={cx}
            cy={cy}
            r={r}
            style={{ '--dot-delay': `${delayOffset + i * 0.12}s` }}
          />
        ))}
      </g>
      <g className="features-constellation-dust">
        {constellationDust.map(([cx, cy, r], i) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={r}
            style={{ '--dot-delay': `${delayOffset + 0.35 + i * 0.16}s` }}
          />
        ))}
      </g>
    </svg>
  )
}

export default function Features() {
  return (
    <section className="features-ambient relative py-20 sm:py-28 overflow-hidden">
      <div className="features-ambient-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="features-ambient-glow features-ambient-glow-heading" aria-hidden="true" />
      <div className="features-ambient-glow features-ambient-glow-side" aria-hidden="true" />
      <Constellation className="features-ambient-constellation features-ambient-constellation-left" delayOffset={0.45} />
      <div className="features-breathe-blob features-breathe-blob-b" aria-hidden="true" />
      <div className="features-breathe-blob features-breathe-blob-c" aria-hidden="true" />
      <div className="features-breathe-blob features-breathe-blob-d" aria-hidden="true" />
      <div className="features-ambient-mesh" aria-hidden="true" />
      <Constellation className="features-ambient-constellation features-ambient-constellation-right" />
      <Constellation className="features-ambient-constellation features-ambient-constellation-lower-left" delayOffset={1.1} />
      <div className="features-ambient-noise absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
