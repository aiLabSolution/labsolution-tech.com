import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const categories = [
  { key: 'all', label: 'All Products' },
  { key: 'chemistry', label: 'Chemistry' },
  { key: 'hematology', label: 'Hematology' },
  { key: 'immunology', label: 'Immunology' },
  { key: 'rapid', label: 'Rapid Tests' },
]

const products = [
  // Chemistry Analyzers
  {
    category: 'chemistry',
    name: 'DiaSys Respons 940',
    brand: 'DiaSys',
    image: '/assets/products/diasys-940.jpg',
    tagline: 'High-throughput automated chemistry analyzer',
    specs: [
      { label: 'Throughput', value: '400 tests/hour' },
      { label: 'Sample Disk', value: '80 positions' },
      { label: 'Reagent Capacity', value: '72 positions, refrigerated' },
      { label: 'Reaction Unit', value: '72 permanent hard glass cuvettes' },
      { label: 'Wavelengths', value: '12 (340–705 nm)' },
    ],
  },
  {
    category: 'chemistry',
    name: 'DiaSys Respons 920',
    brand: 'DiaSys',
    image: '/assets/products/diasys-920.jpg',
    tagline: 'Bench-top random access clinical chemistry analyzer',
    specs: [
      { label: 'Throughput', value: '200 tests/hour' },
      { label: 'Cycle Time', value: '18 seconds' },
      { label: 'Sample Tray', value: '30 positions + STAT' },
      { label: 'Reagent Capacity', value: '30 methods, bar coded, refrigerated' },
      { label: 'Wavelengths', value: '8 (340–700 nm)' },
    ],
  },
  {
    category: 'chemistry',
    name: 'GE100 Blood Glucose System',
    brand: 'GE',
    image: '/assets/products/ge100-glucose.jpg',
    tagline: 'Point-of-care glucose monitoring',
    specs: [
      { label: 'Technology', value: 'GOD/Electrochemical Sensor' },
      { label: 'Sample Volume', value: '1.0 \u00b5L' },
      { label: 'Test Time', value: '5 seconds' },
      { label: 'Range', value: '20–600 mg/dL' },
      { label: 'HCT Range', value: '30–60%' },
    ],
  },
  // Hematology
  {
    category: 'hematology',
    name: 'Hemaray 51',
    brand: 'Rayto',
    image: '/assets/products/hemaray-51.jpg',
    tagline: '5-part differential hematology analyzer',
    specs: [
      { label: 'Parameters', value: '30 including 4 research' },
      { label: 'Technology', value: 'Tri-angular laser scatter + Flow cytometry' },
      { label: 'Throughput', value: '60 samples/hour' },
      { label: 'Display', value: '4" TFT color LCD touch screen' },
      { label: 'Storage', value: '100,000 sample results' },
    ],
  },
  {
    category: 'hematology',
    name: 'Hemaray 86',
    brand: 'Rayto',
    image: '/assets/products/hemaray-86.jpg',
    tagline: '5-part diff with autoloader and 3D WBC maps',
    specs: [
      { label: 'Parameters', value: '28 + 2 histograms + 2 scattergrams' },
      { label: 'Technology', value: 'Laser scatter, cyanide-free reagent' },
      { label: 'Features', value: '3D topographic WBC maps, autoloader' },
      { label: 'Throughput', value: '60 samples/hour' },
      { label: 'Incubation', value: 'Integral titanium system' },
    ],
  },
  // Immunology
  {
    category: 'immunology',
    name: 'RaFIA Immunofluorescence Analyzer',
    brand: 'RaFIA',
    image: '/assets/products/rafia-analyzer.jpg',
    tagline: 'Portable quantitative immunoassay system',
    specs: [
      { label: 'Accuracy', value: '<3% intra-run CV' },
      { label: 'Weight', value: '2.9 kg — portable' },
      { label: 'Display', value: '4.3" LCD touch screen' },
      { label: 'Storage', value: '10,000 test results' },
      { label: 'Specimens', value: 'Whole blood, serum, plasma, urine' },
    ],
  },
  {
    category: 'immunology',
    name: 'AFP FIA Test',
    brand: 'FIA',
    image: '/assets/products/afp-fia.jpg',
    tagline: 'Quantitative alpha-fetoprotein immunoassay',
    specs: [
      { label: 'Working Range', value: '3.0–2,000.0 ng/mL' },
      { label: 'CV', value: '\u226415% (intra-lot)' },
      { label: 'Accuracy', value: '\u2264\u00b115%' },
      { label: 'Linearity', value: 'R \u2265 0.9900' },
      { label: 'Type', value: 'Quantitative, non-subjective' },
    ],
  },
  // Rapid Tests
  {
    category: 'rapid',
    name: 'COVID-19 + Influenza A/B Ag',
    brand: 'CTK Biotech',
    image: '/assets/products/covid19-combo.jpg',
    tagline: '3-in-1 rapid antigen detection',
    specs: [
      { label: 'Detects', value: 'SARS-CoV-2, Influenza A, Influenza B' },
      { label: 'Results', value: '15 minutes' },
      { label: 'Sample', value: 'Nasopharyngeal swab' },
      { label: 'Equipment', value: 'None required — point-of-care' },
      { label: 'Certification', value: 'CE marked' },
    ],
  },
  {
    category: 'rapid',
    name: 'Adenovirus Ag Rapid Test CE',
    brand: 'CTK Biotech',
    image: '/assets/products/adenovirus-rapid.jpg',
    tagline: 'Fast adenovirus antigen detection',
    specs: [
      { label: 'Results', value: 'As soon as 3 minutes' },
      { label: 'Specificity', value: 'No cross-reactivity with 30+ pathogens' },
      { label: 'Kit Size', value: '20/kit' },
      { label: 'Sample', value: 'Swab specimen' },
      { label: 'Certification', value: 'CE marked' },
    ],
  },
  {
    category: 'rapid',
    name: 'TORCH Panel Rapid Test',
    brand: 'CTK Biotech',
    image: '/assets/products/torch-panel.jpg',
    tagline: '5-in-1 TORCH infection screening',
    specs: [
      { label: 'Detects', value: 'Toxo, Rubella, CMV, HSV-1, HSV-2' },
      { label: 'Results', value: '15 minutes' },
      { label: 'Differentiates', value: 'IgG and IgM for all 5 infections' },
      { label: 'Specimens', value: 'Serum, plasma, whole blood' },
      { label: 'Accuracy vs ELISA', value: '85–98% across markers' },
    ],
  },
  {
    category: 'rapid',
    name: 'Chagas Ab Combo Rapid Test CE',
    brand: 'CTK Biotech',
    image: '/assets/products/chagas-rapid.jpg',
    tagline: 'First lateral flow rapid test for Chagas disease',
    specs: [
      { label: 'Sensitivity', value: '92.9% vs commercial EIA' },
      { label: 'Specificity', value: '100% vs commercial EIA' },
      { label: 'Detects', value: 'IgG antibodies to T. cruzi' },
      { label: 'Kit Size', value: '30/kit' },
      { label: 'Equipment', value: 'None required' },
    ],
  },
  {
    category: 'rapid',
    name: 'FOB Rapid Test CE',
    brand: 'CTK Biotech',
    image: '/assets/products/fob-rapid.jpg',
    tagline: 'Fecal occult blood screening',
    specs: [
      { label: 'Sensitivity', value: 'Detects hHB \u226550 ng/mL' },
      { label: 'Advantage', value: 'Higher accuracy than Guaiac test' },
      { label: 'Diet', value: 'No dietary restrictions required' },
      { label: 'Kit Size', value: '25/kit' },
      { label: 'Sample', value: 'Fecal specimen' },
    ],
  },
]

function ProductCard({ product }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <div className="aspect-square bg-surface-alt flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="inline-block text-xs font-semibold text-secondary bg-surface-alt px-2 py-0.5 rounded-md mb-2">
              {product.brand}
            </span>
            <h3 className="font-heading font-[700] text-primary text-base leading-snug">
              {product.name}
            </h3>
          </div>
        </div>

        <p className="mt-1.5 text-secondary text-sm">{product.tagline}</p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1.5 text-primary text-sm font-semibold cursor-pointer hover:text-accent transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none self-start"
          aria-expanded={expanded}
        >
          {expanded ? 'Hide' : 'View'} Specifications
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-border space-y-2">
            {product.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between gap-3">
                <span className="text-secondary text-xs font-medium shrink-0">
                  {spec.label}
                </span>
                <span className="text-primary text-xs font-semibold text-right">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProductBrochure() {
  const [active, setActive] = useState('all')

  const filtered =
    active === 'all'
      ? products
      : products.filter((p) => p.category === active)

  const countFor = (key) =>
    key === 'all' ? products.length : products.filter((p) => p.category === key).length

  return (
    <section id="brochure" className="py-20 sm:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-heading font-[800] text-primary text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.05]">
              Featured specifications.
            </h2>
          </div>
          <p className="lg:col-span-4 text-secondary text-base leading-relaxed lg:text-right">
            Detailed specs for the most-requested analyzers and test kits — the
            full 106-product catalog is available on request.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className="mt-10 flex flex-wrap gap-2"
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
                className={`inline-flex items-baseline gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'bg-white text-secondary border border-border hover:bg-surface-alt hover:text-primary'
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

        {/* Product Grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>

        {/* Summary */}
        <div className="mt-14 pt-10 border-t border-primary/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <p className="text-secondary text-base">
            Showing {filtered.length} of {products.length} featured specs.
            The full 106-product catalog is available on request.
          </p>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 text-primary font-semibold text-sm underline underline-offset-[6px] decoration-2 decoration-accent/40 hover:decoration-accent transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            Request the full catalog →
          </a>
        </div>
      </div>
    </section>
  )
}
