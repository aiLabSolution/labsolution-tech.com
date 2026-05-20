import { useMemo, useState } from 'react'
import { ArrowUpRight, Search, Sparkles } from 'lucide-react'
import ProductIllustration from './ProductIllustration'

const categories = [
  { key: 'all', label: 'All Products' },
  { key: 'chemistry', label: 'Chemistry' },
  { key: 'immunology', label: 'Immunology' },
  { key: 'rapid', label: 'Rapid Tests' },
]

const categoryLabel = (key) => categories.find((c) => c.key === key)?.label ?? key

const products = [
  {
    id: 'snibe-maglumi-x3',
    category: 'immunology',
    model: 'SNIBE MAGLUMI X3',
    brand: 'Snibe Diagnostic',
    tagline: 'Mid-throughput CLIA immunoanalyzer',
    description:
      'Direct chemiluminescence (ABEI label) with single-cuvette reaction and 5-side heating at 37 ± 0.3 °C. Best-in-class footprint efficiency across a 181+ parameter menu spanning thyroid, fertility, infectious disease, tumor markers, and cardiac panels.',
    specs: [
      { label: 'Throughput', value: '200 T/h' },
      { label: 'Sample positions', value: '72' },
      { label: 'Reagents', value: '20 refrigerated' },
      { label: 'Footprint', value: '< 0.68 m²' },
    ],
  },
  {
    id: 'snibe-maglumi-x6',
    category: 'immunology',
    model: 'SNIBE MAGLUMI X6',
    brand: 'Snibe Diagnostic',
    tagline: 'High-throughput floor-standing CLIA immunoanalyzer',
    description:
      'Direct chemiluminescence with 243 simultaneous incubation cuvettes and 5-side heating at 37 ± 0.3 °C. Up to 2,000 walk-away tests across a 260-parameter menu, TLA-ready for total lab automation.',
    specs: [
      { label: 'Throughput', value: '450 T/h' },
      { label: 'Sample positions', value: '112 → 412' },
      { label: 'Test menu', value: '260 parameters' },
      { label: 'Walk-away', value: '2,000 tests' },
    ],
    highlight: true,
  },
  {
    id: 'diasys-respons-240c',
    category: 'chemistry',
    model: 'DiaSys respons 240c',
    brand: 'DiaSys',
    tagline: 'Compact bench-top random-access chemistry analyzer',
    description:
      'Random-access clinical chemistry for small-to-medium labs. Holographic concave grating photometer with 12 wavelengths (340–800 nm), 73-cycle reaction tray, and an ISE upgrade lifts throughput to 400 T/h.',
    specs: [
      { label: 'Throughput', value: '240 T/h' },
      { label: 'Photometer', value: '12 wavelengths' },
      { label: 'Sample volume', value: '2–35 µL' },
      { label: 'Reagents', value: '36 + 3 ISE' },
    ],
  },
  {
    id: 'diasys-respons-420c',
    category: 'chemistry',
    model: 'DiaSys respons 420c',
    brand: 'DiaSys',
    tagline: 'Mid-throughput chemistry with onboard HbA1c hemolysis',
    description:
      'Random-access chemistry with onboard hemolysis for whole-blood HbA1c. Three-ring sample tray (102 positions), 42-position peltier-cooled reagent tray at 2–8 °C, integrated Na/K/Cl ISE.',
    specs: [
      { label: 'Throughput', value: '420 T/h' },
      { label: 'HbA1c', value: 'Onboard hemolysis' },
      { label: 'Sample tray', value: '102 positions' },
      { label: 'Reagent tray', value: '42 @ 2–8 °C' },
    ],
  },
  {
    id: 'diasys-respons-600c',
    category: 'chemistry',
    model: 'DiaSys respons 600c',
    brand: 'DiaSys',
    tagline: 'Floor-standing random-access chemistry for medium labs',
    description:
      'Random-access analyzer with continuous rack loading and integrated Na/K/Cl ISE. 16-wavelength grating photometer, 124-cuvette reaction unit with 8-step auto-washing, and refrigerated reagent storage.',
    specs: [
      { label: 'Throughput', value: '600 T/h' },
      { label: 'ISE', value: 'Na, K, Cl integrated' },
      { label: 'Sample positions', value: '120' },
      { label: 'Reagents', value: '37 @ 2–8 °C' },
    ],
  },
  {
    id: 'medica-easylyte',
    category: 'chemistry',
    model: 'Medica EasyLyte',
    brand: 'Medica',
    tagline: 'Direct-measurement electrolyte analyzer',
    description:
      'Bench-top ISE analyzer for Na, K, Cl, Li, Ca, and pH from whole blood, serum, plasma, or urine. ~60-second blood cycle from a 100 µL sample, automatic recalibration every 4 hours, modular solutions pack good for ≈1,200 samples.',
    specs: [
      { label: 'Cycle', value: '~60 s blood' },
      { label: 'Sample volume', value: '~100 µL' },
      { label: 'Pack life', value: '≈1,200 samples' },
      { label: 'Configurations', value: '4 ISE sets' },
    ],
  },
  {
    id: 'bionime-ge100',
    category: 'chemistry',
    model: 'Bionime GE100',
    brand: 'Bionime',
    tagline: 'Handheld blood glucose monitoring system',
    description:
      'Point-of-care glucose meter for bedside, ER, and diabetes self-monitoring. Electrochemical glucose oxidase strip with 5-second readout from a 0.75 µL fingerstick, plasma-calibrated with auto-coding (no chip), and hematocrit compensation across 30–60 %.',
    specs: [
      { label: 'Test time', value: '5 seconds' },
      { label: 'Sample volume', value: '0.75 µL' },
      { label: 'Range', value: '20–600 mg/dL' },
      { label: 'Memory', value: '500 results' },
    ],
    illustration: 'poc',
  },
  {
    id: 'lifotronic-h8',
    category: 'chemistry',
    model: 'Lifotronic H8',
    brand: 'Lifotronic',
    tagline: 'Fully-automated HbA1c analyzer (HPLC)',
    description:
      'High-performance liquid chromatography for HbA1c, NGSP and IFCC traceable — built for diabetes diagnosis and monitoring. First result in 1.5 min with CV ≤ 1.3 %, cap-piercing primary tubes, 10.1″ touchscreen, and an 8,000-test rated column.',
    specs: [
      { label: 'First result', value: '1.5 min' },
      { label: 'Precision', value: 'CV ≤ 1.3 %' },
      { label: 'Range', value: '3 – 18 % HbA1c' },
      { label: 'Column life', value: '≥ 8,000 tests' },
    ],
  },
  {
    id: 'ctk-dengue-duo',
    category: 'rapid',
    model: 'CTK OnSite Duo Dengue',
    brand: 'CTK Biotech',
    tagline: 'NS1 + IgG/IgM lateral-flow rapid test',
    description:
      'Lateral-flow cassette simultaneously detecting dengue NS1 antigen plus IgG and IgM antibodies across all four serotypes (DEN-1, 2, 3, 4). 20–25 minute result from serum, plasma, or whole blood with built-in procedural control.',
    specs: [
      { label: 'Detects', value: 'NS1 + IgG + IgM' },
      { label: 'Result', value: '20–25 min' },
      { label: 'Pack', value: '30 tests' },
      { label: 'Certification', value: 'CE-IVD' },
    ],
  },
  {
    id: 'ctk-typhoid',
    category: 'rapid',
    model: 'CTK OnSite Typhoid IgG/IgM',
    brand: 'CTK Biotech',
    tagline: 'Differential IgG/IgM lateral-flow rapid test',
    description:
      'Lateral-flow combo cassette differentiating IgG and IgM anti-Salmonella Typhi and Paratyphi antibodies, using both O and H antigens. 15-minute result from serum, plasma, or whole blood.',
    specs: [
      { label: 'Detects', value: 'IgG + IgM' },
      { label: 'Result', value: '15 min' },
      { label: 'Pack', value: '30 tests' },
      { label: 'Certification', value: 'CE-IVD' },
    ],
  },
  {
    id: 'ctk-malaria',
    category: 'rapid',
    model: 'CTK OnSite Malaria Pf/Pv',
    brand: 'CTK Biotech',
    tagline: 'Simultaneous Pf + Pv antigen lateral-flow test',
    description:
      'Lateral-flow cassette for simultaneous detection of Plasmodium falciparum (HRP-II) and Plasmodium vivax (pLDH) antigens. 15–20 minute result from a 5 µL whole-blood sample (EDTA, heparin, citrate, or fingerstick).',
    specs: [
      { label: 'Detects', value: 'Pf (HRP-II) + Pv (pLDH)' },
      { label: 'Sample volume', value: '5 µL' },
      { label: 'Result', value: '15–20 min' },
      { label: 'Certification', value: 'CE-IVD' },
    ],
  },
]

const featured = products.find((p) => p.highlight) ?? products[0]

function FeaturedSpotlight({ product }) {
  return (
    <div className="mt-12 sm:mt-16 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-2 bg-white border border-border text-secondary text-xs font-semibold px-3 py-1.5 rounded-full mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            New · In stock · Manila warehouse
          </div>

          <p className="text-cta font-semibold text-xs tracking-[0.2em] uppercase">Featured</p>
          <h3 className="mt-2 font-heading font-[800] text-primary text-4xl sm:text-5xl tracking-[-0.01em]">
            {product.model}
          </h3>
          <p className="mt-2 font-heading text-secondary text-lg sm:text-xl italic">
            {product.tagline}
          </p>
          <p className="mt-5 text-secondary leading-relaxed">{product.description}</p>

          <div className="mt-7 bg-white border border-border rounded-xl p-5 grid grid-cols-2 gap-y-4 gap-x-5 sm:grid-cols-4 sm:gap-x-4">
            {product.specs.map((spec) => (
              <div key={spec.label}>
                <p className="font-heading font-[700] text-primary text-lg sm:text-xl tracking-tight leading-tight">
                  {spec.value}
                </p>
                <p className="text-secondary text-[10px] mt-1.5 uppercase tracking-[0.14em] font-semibold">
                  {spec.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-semibold text-sm px-5 py-3 rounded-md transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-cta focus-visible:outline-none"
            >
              Book a demo
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white border border-border text-primary hover:border-primary/40 font-semibold text-sm px-5 py-3 rounded-md transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-cta focus-visible:outline-none"
            >
              Request datasheet
            </a>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="relative bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 bg-accent text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-[0.12em] shadow">
            <Sparkles className="w-3 h-3" />
            Flagship
          </div>
          <span className="absolute top-4 right-4 z-10 text-[10px] font-semibold text-secondary tracking-[0.14em] uppercase bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-border">
            {categoryLabel(product.category)}
          </span>
          <div className="aspect-[5/3] bg-surface-alt">
            <ProductIllustration category={product.illustration ?? product.category} model={product.model} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-border divide-x divide-border">
            {product.specs.map((spec) => (
              <div key={spec.label} className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary">
                  {spec.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-primary">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <article
      className={`group relative bg-white border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col ${
        product.highlight
          ? 'border-accent/40 ring-1 ring-accent/20'
          : 'border-border hover:border-primary/20'
      }`}
    >
      <div className="relative aspect-[5/3] bg-surface-alt border-b border-border">
        <ProductIllustration category={product.illustration ?? product.category} model={product.model} />
        {product.highlight && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 bg-accent text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-[0.12em] shadow">
            <Sparkles className="w-3 h-3" />
            Flagship
          </div>
        )}
        <span className="absolute top-3 right-3 text-[10px] font-semibold text-secondary tracking-[0.14em] uppercase bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-border">
          {categoryLabel(product.category)}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-xs font-semibold text-secondary uppercase tracking-[0.14em]">
          {product.brand}
        </p>
        <h3 className="mt-1 font-heading font-[700] text-primary text-xl leading-tight">
          {product.model}
        </h3>
        <p className="mt-1 font-heading text-secondary text-sm italic">{product.tagline}</p>
        <p className="mt-4 text-sm text-secondary leading-relaxed">{product.description}</p>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 pt-5 border-t border-border">
          {product.specs.map((spec) => (
            <div key={spec.label}>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary">
                {spec.label}
              </dt>
              <dd className="mt-0.5 text-sm font-semibold text-primary">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 pt-1 flex items-center justify-between">
          <a
            href="#contact"
            className="text-sm font-semibold text-cta inline-flex items-center gap-1 hover:gap-2 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-cta focus-visible:outline-none"
          >
            Request datasheet
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  )
}

export default function ProductBrochure() {
  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((p) => {
      if (active !== 'all' && p.category !== active) return false
      if (!q) return true
      return (
        p.model.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      )
    })
  }, [active, query])

  const countFor = (key) =>
    key === 'all' ? products.length : products.filter((p) => p.category === key).length

  return (
    <section id="brochure" className="py-20 sm:py-28 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-cta font-semibold text-xs tracking-[0.2em] uppercase">
              Product catalog
            </p>
            <h2 className="mt-3 font-heading font-[800] text-primary text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.05]">
              Diagnostic systems built for{' '}
              <span className="italic text-cta">Philippine labs.</span>
            </h2>
            <p className="mt-5 text-secondary text-base sm:text-lg leading-relaxed">
              Detailed specifications for the analyzers and rapid tests we actively represent.
              Reagents, consumables, and extended brand portfolios available on request.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start lg:self-end bg-accent-soft border border-accent/20 text-accent text-xs font-semibold px-4 py-2 rounded-full">
            {products.length} products · CE-IVD
          </div>
        </div>

        <FeaturedSpotlight product={featured} />

        <div className="mt-16 sm:mt-20 flex flex-col lg:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by model, brand, or keyword…"
              className="w-full bg-white border border-border rounded-lg pl-11 pr-4 py-3 text-sm text-primary placeholder-secondary/70 focus:border-cta focus:bg-white focus:outline-none focus:ring-1 focus:ring-cta transition"
              aria-label="Search products"
            />
          </div>
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter by product category"
          >
            {categories.map((cat) => {
              const count = countFor(cat.key)
              const isActive = active === cat.key
              return (
                <button
                  key={cat.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(cat.key)}
                  className={`inline-flex items-baseline gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-cta focus-visible:outline-none ${
                    isActive
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-secondary border-border hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {cat.label}
                  <span
                    className={`text-xs tabular-nums ${
                      isActive ? 'text-white/60' : 'text-primary/40'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white border border-border rounded-2xl p-14 text-center">
            <p className="font-heading font-[700] text-primary text-xl">No matching products</p>
            <p className="mt-2 text-secondary text-sm">
              Try a different category or clear your search.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-14 bg-primary text-white rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 overflow-hidden relative">
          <div className="relative max-w-xl">
            <h3 className="font-heading font-[700] text-2xl sm:text-3xl">
              Can't see what you need?
            </h3>
            <p className="mt-3 text-white/70 leading-relaxed">
              We carry extended ranges in reagents, consumables, and custom configurations. Talk to
              our application scientists for a tailored proposal.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white font-semibold px-6 py-3.5 rounded-md transition-colors duration-200 text-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            Contact Us
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
