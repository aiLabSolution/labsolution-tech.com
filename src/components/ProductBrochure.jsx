import { useMemo, useState } from 'react'
import { ArrowUpRight, Search, Sparkles } from 'lucide-react'
import ProductIllustration from './ProductIllustration'

const categories = [
  { key: 'all', label: 'All Products' },
  { key: 'chemistry', label: 'Chemistry' },
  { key: 'hematology', label: 'Hematology' },
  { key: 'immunology', label: 'Immunology' },
  { key: 'rapid', label: 'Rapid Tests' },
]

const categoryLabel = (key) => categories.find((c) => c.key === key)?.label ?? key

const products = [
  {
    id: 'diasys-940',
    category: 'chemistry',
    model: 'DiaSys Respons 940',
    brand: 'DiaSys',
    tagline: 'High-throughput automated chemistry analyzer',
    description:
      'Random-access clinical chemistry for high-volume labs. Refrigerated reagent storage, permanent hard-glass cuvettes, and a 12-wavelength photometer deliver lab-grade accuracy at 400 tests/hour.',
    specs: [
      { label: 'Throughput', value: '400 T/H' },
      { label: 'Sample disk', value: '80 positions' },
      { label: 'Reagents', value: '72 refrigerated' },
      { label: 'Wavelengths', value: '12 · 340–705 nm' },
    ],
    highlight: true,
  },
  {
    id: 'diasys-920',
    category: 'chemistry',
    model: 'DiaSys Respons 920',
    brand: 'DiaSys',
    tagline: 'Bench-top random access chemistry analyzer',
    description:
      'Compact random-access biochemistry analyzer with bar-coded refrigerated reagents and an 18-second cycle time — built for mid-volume hospital and reference labs.',
    specs: [
      { label: 'Throughput', value: '200 T/H' },
      { label: 'Cycle time', value: '18 seconds' },
      { label: 'Sample tray', value: '30 + STAT' },
      { label: 'Wavelengths', value: '8 · 340–700 nm' },
    ],
  },
  {
    id: 'ge100',
    category: 'chemistry',
    model: 'GE100 Blood Glucose',
    brand: 'GE',
    tagline: 'Point-of-care glucose monitoring',
    description:
      'Electrochemical GOD-based glucose meter for bedside, ER, and clinic use. 5-second readout from a 1 µL fingerstick, with built-in hematocrit compensation across a wide HCT window.',
    specs: [
      { label: 'Sample volume', value: '1.0 µL' },
      { label: 'Test time', value: '5 seconds' },
      { label: 'Range', value: '20–600 mg/dL' },
      { label: 'HCT window', value: '30–60%' },
    ],
  },
  {
    id: 'hemaray-51',
    category: 'hematology',
    model: 'Hemaray 51',
    brand: 'Rayto',
    tagline: '5-part differential hematology analyzer',
    description:
      'Tri-angular laser scatter and flow cytometry deliver 30 parameters with research-grade resolution. Touch-screen LCD, 100,000-result storage, and a streamlined CBC + diff workflow.',
    specs: [
      { label: 'Throughput', value: '60 samples/h' },
      { label: 'Parameters', value: '30 incl. 4 research' },
      { label: 'Technology', value: 'Laser + flow cytometry' },
      { label: 'Storage', value: '100,000 results' },
    ],
  },
  {
    id: 'hemaray-86',
    category: 'hematology',
    model: 'Hemaray 86',
    brand: 'Rayto',
    tagline: '5-part diff with autoloader & 3D WBC maps',
    description:
      'Walkaway hematology with autoloader, cyanide-free reagents, and 3D topographic WBC scattergrams. Built for higher-volume labs that need true 5-part precision.',
    specs: [
      { label: 'Throughput', value: '60 samples/h' },
      { label: 'Parameters', value: '28 + scattergrams' },
      { label: 'Features', value: '3D WBC, autoloader' },
      { label: 'Incubation', value: 'Integral titanium' },
    ],
  },
  {
    id: 'rafia',
    category: 'immunology',
    model: 'RaFIA Analyzer',
    brand: 'Rayto',
    tagline: 'Portable quantitative immunofluorescence',
    description:
      'Bench-portable immunofluorescence analyzer at 2.9 kg with <3% intra-run CV. Reads whole blood, serum, plasma, and urine across a growing menu of cardiac, inflammation, and infectious panels.',
    specs: [
      { label: 'Accuracy', value: '<3% intra-run CV' },
      { label: 'Weight', value: '2.9 kg portable' },
      { label: 'Display', value: '4.3" touch LCD' },
      { label: 'Storage', value: '10,000 results' },
    ],
  },
  {
    id: 'afp-fia',
    category: 'immunology',
    model: 'AFP FIA Test',
    brand: 'FIA',
    tagline: 'Quantitative alpha-fetoprotein assay',
    description:
      'Fluorescence immunoassay reagent for the RaFIA platform — a fast, quantitative AFP result with linearity to R ≥ 0.99 and a wide 3.0–2,000 ng/mL working range.',
    specs: [
      { label: 'Range', value: '3.0–2,000 ng/mL' },
      { label: 'CV', value: '≤ 15% intra-lot' },
      { label: 'Accuracy', value: '≤ ±15%' },
      { label: 'Linearity', value: 'R ≥ 0.9900' },
    ],
  },
  {
    id: 'covid-flu-combo',
    category: 'rapid',
    model: 'COVID-19 + Influenza A/B Ag',
    brand: 'CTK Biotech',
    tagline: '3-in-1 rapid antigen detection',
    description:
      'Single nasopharyngeal swab differentiates SARS-CoV-2, Influenza A, and Influenza B in 15 minutes — no instrumentation required and CE marked for point-of-care use.',
    specs: [
      { label: 'Detects', value: 'SARS-CoV-2, Flu A/B' },
      { label: 'Result', value: '15 minutes' },
      { label: 'Sample', value: 'NP swab' },
      { label: 'Certification', value: 'CE marked' },
    ],
  },
  {
    id: 'adenovirus',
    category: 'rapid',
    model: 'Adenovirus Ag Rapid Test',
    brand: 'CTK Biotech',
    tagline: 'Fast adenovirus antigen detection',
    description:
      'Lateral-flow adenovirus antigen test reading in as little as 3 minutes, with no cross-reactivity against 30+ common respiratory and enteric pathogens.',
    specs: [
      { label: 'Result', value: 'From 3 minutes' },
      { label: 'Specificity', value: '30+ pathogens' },
      { label: 'Kit size', value: '20 per kit' },
      { label: 'Certification', value: 'CE marked' },
    ],
  },
  {
    id: 'torch',
    category: 'rapid',
    model: 'TORCH Panel Rapid Test',
    brand: 'CTK Biotech',
    tagline: '5-in-1 TORCH infection screening',
    description:
      'Single device differentiates IgG and IgM for Toxoplasma, Rubella, CMV, HSV-1, and HSV-2 in 15 minutes — 85–98% accuracy vs ELISA across all five markers.',
    specs: [
      { label: 'Detects', value: 'Toxo, Rubella, CMV, HSV' },
      { label: 'Differentiates', value: 'IgG + IgM' },
      { label: 'Result', value: '15 minutes' },
      { label: 'Sample', value: 'Serum, plasma, blood' },
    ],
  },
  {
    id: 'chagas',
    category: 'rapid',
    model: 'Chagas Ab Combo Test',
    brand: 'CTK Biotech',
    tagline: 'First lateral-flow rapid for Chagas disease',
    description:
      'The original CE-marked lateral-flow test for Chagas — detects IgG antibodies to T. cruzi at 92.9% sensitivity and 100% specificity vs commercial EIA.',
    specs: [
      { label: 'Sensitivity', value: '92.9% vs EIA' },
      { label: 'Specificity', value: '100% vs EIA' },
      { label: 'Detects', value: 'IgG to T. cruzi' },
      { label: 'Kit size', value: '30 per kit' },
    ],
  },
  {
    id: 'fob',
    category: 'rapid',
    model: 'FOB Rapid Test',
    brand: 'CTK Biotech',
    tagline: 'Fecal occult blood screening',
    description:
      'Immunochromatographic FOB test with no dietary restrictions — higher accuracy than Guaiac and a 50 ng/mL sensitivity threshold for early colorectal screening.',
    specs: [
      { label: 'Sensitivity', value: 'hHb ≥ 50 ng/mL' },
      { label: 'Advantage', value: 'Beats Guaiac' },
      { label: 'Diet', value: 'No restrictions' },
      { label: 'Kit size', value: '25 per kit' },
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
            <ProductIllustration category={product.category} model={product.model} />
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
        <ProductIllustration category={product.category} model={product.model} />
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
              Featured specifications across our most-requested analyzers and test kits. The full
              106-product catalog is available on request.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start lg:self-end bg-accent-soft border border-accent/20 text-accent text-xs font-semibold px-4 py-2 rounded-full">
            {products.length} featured · CE marked
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
            Request a quote
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
