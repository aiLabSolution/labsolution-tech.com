import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Search, Sparkles } from 'lucide-react'
import ProductIllustration from './ProductIllustration'

const categories = [
  { key: 'all', label: 'All Products', anchorId: 'brochure' },
  { key: 'chemistry', label: 'Chemistry', anchorId: 'chemistry-analyzers' },
  { key: 'immunology', label: 'Immunology', anchorId: 'clia-immunoassay' },
  { key: 'hematology', label: 'Hematology', anchorId: 'hematology-analyzers' },
  { key: 'clinical-microscopy', label: 'Clinical Microscopy', anchorId: 'clinical-microscopy' },
  { key: 'rapid', label: 'Rapid Tests', anchorId: 'rapid-diagnostic-tests' },
]

const categoryLabel = (key) => categories.find((c) => c.key === key)?.label ?? key
const categoryKeyForHash = (hash) =>
  categories.find((cat) => cat.anchorId === hash.replace('#', ''))?.key

const fullBrochureHref =
  'https://drive.google.com/file/d/1NPCteoa4Y0xKSil5FQX4W-J3CEzZ-Jiy/view?usp=sharing'

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
    image: '/assets/products/photos/snibe-maglumi-x3.png',
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
    image: '/assets/products/photos/snibe-maglumi-x6.png',
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
    image: '/assets/products/photos/diasys-respons-240c.png',
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
    image: '/assets/products/photos/diasys-respons-420c.png',
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
    image: '/assets/products/photos/diasys-respons-600c.png',
  },
  {
    id: 'edan-h60s',
    category: 'hematology',
    model: 'EDAN H60S',
    brand: 'EDAN',
    tagline: 'Five-part hematology analyzer with 60-sample autoloader',
    description:
      'Automated hematology analyzer for low-to-moderate volume laboratories. It combines semiconductor laser flow cytometry for WBC, DIFF, and BASO counting with impedance RBC/PLT counting, cyanide-free HGB measurement, STAT access, and continuous 60-sample loading.',
    specs: [
      { label: 'Throughput', value: '60 samples/h' },
      { label: 'Sample volume', value: '16 µL' },
      { label: 'Parameters', value: '25 + 8 RUO' },
      { label: 'Autoloader', value: '60 samples' },
    ],
    image: '/assets/products/photos/edan-h60s.png',
  },
  {
    id: 'mindray-eu-5600-pro',
    category: 'clinical-microscopy',
    model: 'Mindray EU-5600 Pro',
    brand: 'Mindray',
    tagline: 'Automated Urinalysis System',
    description:
      'Automated urinalysis system combining dry chemistry and formed element analysis with full-color digital imaging for enhanced urine sediment review.',
    specs: [
      { label: 'Dry chemistry', value: '≥160 tests/hour' },
      { label: 'Formed elements', value: '≥100 tests/hour' },
      { label: 'Hybrid mode', value: '≥100 tests/hour' },
      { label: 'Parameters', value: '31 formed element' },
      { label: 'Barcode', value: 'Built-in reader' },
      { label: 'Priority testing', value: 'STAT function' },
      { label: 'Connectivity', value: 'Bi-directional LIS' },
      { label: 'Sampling', value: 'Closed tube support' },
    ],
    image: '/assets/products/photos/mindray-eu-5600-pro.png',
  },
  {
    id: 'urit-us-1680',
    category: 'clinical-microscopy',
    model: 'URIT US-1680',
    brand: 'URIT',
    tagline: 'AI-powered automated urinalysis analyzer',
    description:
      'A compact all-in-one urinalysis platform combining dry chemistry, urine sediment imaging, and physical-property analysis. CNN-based deep learning automatically recognizes 38+ formed-element parameters while ACR testing supports early kidney disease screening.',
    specs: [
      { label: 'Chemistry', value: '300 tests/hour' },
      { label: 'Sediment', value: '120 tests/hour' },
      { label: 'Combined mode', value: '120 tests/hour' },
      { label: 'AI recognition', value: '38+ parameters' },
    ],
    overview:
      'Fully automated urine chemistry and sediment analysis in one space-efficient system for medium- and high-volume clinical laboratories.',
    keyFeatures: [
      'All-in-one chemistry and sediment analysis with a compact footprint',
      'CNN and deep-learning technology for formed-element recognition',
      'Real test-strip image display for result review',
      'Integrated ACR screening and physical urine measurements',
    ],
    technicalSpecifications: [
      'Chemistry throughput: 300 tests/hour',
      'Sediment throughput: 120 tests/hour',
      'Combined chemistry and sediment throughput: 120 tests/hour',
      'Formed-element recognition: 38+ parameters',
      'Physical measurements: conductivity, osmolality, specific gravity, turbidity, and color',
    ],
    clinicalApplications: [
      'Routine automated urinalysis',
      'Urine sediment formed-element analysis',
      'Early kidney disease screening with albumin-to-creatinine ratio (ACR)',
      'Physical, chemical, and morphological urine assessment',
    ],
    officialUrl: 'https://www.urit.com/en2/cpjjfa/info.aspx?itemid=440&lcid=18',
    image: '/assets/products/photos/urit-us-1680.png',
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
    image: '/assets/products/photos/medica-easylyte.png',
  },
  {
    id: 'seamaty-se1-draft',
    category: 'chemistry',
    model: 'Seamaty SE1',
    brand: 'Seamaty',
    tagline: 'Portable POC electrolyte analyzer',
    description:
      'Handheld ISE electrolyte testing for bedside, urgent care, clinic, and satellite laboratory use. SE1 supports rapid whole-blood electrolyte assessment with single-use test cards, internal calibration, LIS connectivity, and an integrated thermal printer for point-of-care documentation.',
    specs: [
      { label: 'Method', value: 'ISE' },
      { label: 'Result time', value: '4 min' },
      { label: 'Sample', value: '80–120 µL' },
      { label: 'Parameters', value: 'K, Na, Cl, Ca, pH' },
    ],
    overview:
      'Compact electrolyte analysis platform designed to reduce sample transport and turnaround time in patient-side workflows.',
    keyFeatures: [
      'Handheld, battery-powered design for point-of-care testing',
      'Three-step workflow: add sample, insert cartridge, read result',
      'Single-use multi-parameter test cards for flexible clinical needs',
      'Touchscreen interface with built-in thermal printer',
    ],
    technicalSpecifications: [
      'Sample type: whole blood',
      'Sample volume: 80–120 µL',
      'Display: 4.3-inch IPS touchscreen',
      'Connectivity: USB Type-C, Wi-Fi, bi-directional LIS',
      'Storage: up to 500,000 test results',
      'Weight: 600 g',
    ],
    clinicalApplications: [
      'Bedside electrolyte assessment',
      'Emergency and urgent care decision support',
      'Physician office and satellite laboratory testing',
      'Patient-side monitoring where rapid turnaround is required',
    ],
    referenceUrl: 'https://en.seamaty.com/index.php?s=/sys/593.html',
    draft: true,
    illustration: 'poc',
    image: '/assets/products/photos/seamaty-se1.png',
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
    image: '/assets/products/photos/bionime-ge100.png',
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
    image: '/assets/products/photos/lifotronic-h8.png',
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
    image: '/assets/products/photos/ctk-dengue-duo.png',
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
    image: '/assets/products/photos/ctk-typhoid.png',
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
    image: '/assets/products/photos/ctk-malaria.png',
  },
]

const featured = products.find((p) => p.highlight) ?? products[0]

function ProductVisual({ product, loading = 'lazy', featured = false, revealEffect = false }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const productImage = product.productImage ?? product.image
  const outlineImage = product.outlineImage ?? productImage

  if (!productImage || failed) {
    return <ProductIllustration category={product.illustration ?? product.category} model={product.model} />
  }

  const imageSizeClass = featured
    ? 'h-[17rem] w-[17rem] translate-y-6 sm:h-[30rem] sm:w-[30rem] sm:translate-y-12'
    : 'h-[13rem] w-[13rem] sm:h-[14rem] sm:w-[14rem]'
  const loadedClass = loaded ? 'opacity-100' : 'opacity-0'

  if (revealEffect) {
    return (
      <div className="product-visual flex h-full w-full items-center justify-center p-6 sm:p-8">
        <img
          src={outlineImage}
          alt=""
          width="700"
          height="700"
          loading={loading}
          decoding="async"
          aria-hidden="true"
          className={`product-photo product-outline object-contain ${imageSizeClass}`}
        />
        <img
          src={productImage}
          alt={`${product.model} product photo`}
          width="700"
          height="700"
          loading={loading}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`product-photo product-full object-contain ${imageSizeClass}`}
        />
      </div>
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-6 sm:p-8">
      <img
        src={productImage}
        alt={`${product.model} product photo`}
        width="700"
        height="700"
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`product-photo object-contain transition-opacity duration-500 ${imageSizeClass} ${loadedClass}`}
      />
    </div>
  )
}

function FeaturedSpotlight({ product }) {
  return (
    <div className="mt-12 sm:mt-16 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-2 bg-white border border-border text-secondary text-xs font-semibold px-3 py-1.5 rounded-full mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            New · In stock
          </div>

          <p className="text-cta font-semibold text-xs tracking-[0.2em] uppercase">Featured</p>
          <h3 className="mt-2 font-heading font-[800] text-primary text-4xl sm:text-5xl tracking-[-0.01em]">
            {product.model}
          </h3>
          <p className="mt-2 font-heading text-secondary text-lg sm:text-xl italic">
            {product.tagline}
          </p>
          <p className="mt-5 text-justify leading-relaxed text-secondary">{product.description}</p>

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
            Featured
          </div>
          <span className="absolute top-4 right-4 z-10 text-[10px] font-semibold text-secondary tracking-[0.14em] uppercase bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-border">
            {categoryLabel(product.category)}
          </span>
          <div className="aspect-[5/3] bg-transparent">
            <ProductVisual product={product} loading="eager" featured />
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

function ProductCard({ product, index }) {
  const cardRef = useRef(null)
  const [revealed, setRevealed] = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    )
  })

  useEffect(() => {
    const element = cardRef.current
    if (!element || revealed) return undefined

    let timeoutId
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const delay = Math.min((index % 6) * 120, 600)
        timeoutId = window.setTimeout(() => setRevealed(true), delay)
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.22 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [index, revealed])

  return (
    <article
      ref={cardRef}
      className={`product-card group relative bg-white border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col ${
        revealed ? 'is-revealed' : ''
      } ${
        product.highlight
          ? 'border-accent/40 ring-1 ring-accent/20'
          : 'border-border hover:border-primary/20'
      }`}
    >
      <div className="relative aspect-[5/3] bg-transparent border-b border-border">
        <ProductVisual product={product} revealEffect />
        {product.highlight && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 bg-accent text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-[0.12em] shadow">
            <Sparkles className="w-3 h-3" />
            Featured
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
        <p className="mt-4 text-justify text-sm leading-relaxed text-secondary">
          {product.description}
        </p>

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

        <div className="mt-auto pt-6 flex items-center justify-between">
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

  useEffect(() => {
    const syncCategoryFromHash = () => {
      const nextCategory = categoryKeyForHash(window.location.hash)
      if (nextCategory) {
        setActive(nextCategory)
        setQuery('')
      }
    }

    syncCategoryFromHash()
    window.addEventListener('hashchange', syncCategoryFromHash)
    return () => window.removeEventListener('hashchange', syncCategoryFromHash)
  }, [])

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
              Detailed specifications for the analyzers and rapid tests we actively represent. This
              catalog highlights selected products. Additional brands, reagents, and consumables are
              available upon request.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
            <a
              href={fullBrochureHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              View Full Brochure
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <div className="inline-flex items-center gap-2 bg-accent-soft border border-accent/20 text-accent text-xs font-semibold px-4 py-2 rounded-full">
              {products.length} products · CE-IVD
            </div>
          </div>
        </div>

        <FeaturedSpotlight product={featured} />

        <div className="relative h-0" aria-hidden="true">
          {categories
            .filter((cat) => cat.key !== 'all')
            .map((cat) => (
              <span key={cat.anchorId} id={cat.anchorId} className="absolute -top-28 scroll-mt-32" />
            ))}
        </div>

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
                      ? 'bg-cta-hover text-white border-cta-hover'
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
            {filtered.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        <div className="brochure-cta-card mt-14 text-white p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 overflow-hidden relative">
          <div className="relative z-10 max-w-xl">
            <h3 className="font-heading font-[700] text-2xl sm:text-3xl">
              Can't see what you need?
            </h3>
            <p className="mt-3 text-justify text-white leading-relaxed">
              Our website features selected analyzers, rapid tests, and diagnostic solutions. We
              also carry additional brands, reagents, consumables, and customized laboratory
              requirements. View our brochure to explore our extended product selection, or contact
              us for a tailored recommendation.
            </p>
          </div>
          <div className="brochure-cta-actions relative z-10 flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="#contact"
              className="brochure-cta-brochure-button inline-flex items-center justify-center gap-2 rounded-md border border-white/70 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              Contact Us
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={fullBrochureHref}
              target="_blank"
              rel="noopener noreferrer"
              className="brochure-cta-brochure-button inline-flex items-center justify-center gap-2 rounded-md border border-white/70 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              View Full Brochure
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
