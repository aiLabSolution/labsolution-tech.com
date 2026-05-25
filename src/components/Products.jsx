import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const categories = [
  {
    title: 'Chemistry Analyzers',
    description:
      'Random-access clinical chemistry, direct-ISE electrolytes, HPLC HbA1c, and point-of-care glucose monitoring.',
    count: 6,
    span: 'DiaSys · Medica · Bionime · Lifotronic',
  },
  {
    title: 'CLIA Immunoassay',
    description:
      'Fully-automated chemiluminescence immunoassay analyzers — direct ABEI labeling, 200+ parameter menus, TLA-ready.',
    count: 2,
    span: 'SNIBE MAGLUMI · 200–450 T/h',
  },
  {
    title: 'Hematology Analyzers',
    description:
      'Five-part hematology systems with autoloading, laser flow cytometry, impedance counting, and low-volume whole-blood sampling.',
    count: 1,
    span: 'EDAN · 60 samples/h',
  },
  {
    title: 'Rapid Diagnostic Tests',
    description:
      'CE-IVD lateral-flow cassettes for tropical infectious disease screening — dengue, typhoid, malaria.',
    count: 3,
    span: 'CTK OnSite · 15–25 min',
  },
]

function CountUpNumber({ value }) {
  const [count, setCount] = useState(value)
  const countRef = useRef(null)

  useEffect(() => {
    const element = countRef.current
    if (!element) return undefined

    let frameId
    let fallbackId
    let hasAnimated = false
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !('IntersectionObserver' in window)) {
      frameId = requestAnimationFrame(() => setCount(value))
      return () => cancelAnimationFrame(frameId)
    }

    const duration = 1400

    const animate = () => {
      if (hasAnimated) return
      hasAnimated = true
      const start = performance.now()

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.max(1, Math.round(eased * value)))

        if (progress < 1) {
          frameId = requestAnimationFrame(tick)
        }
      }

      setCount(1)
      frameId = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        animate()
        observer.disconnect()
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.35 },
    )

    observer.observe(element)
    frameId = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        animate()
        observer.disconnect()
      }
    })
    fallbackId = window.setTimeout(() => setCount(value), 2200)

    return () => {
      observer.disconnect()
      if (frameId) cancelAnimationFrame(frameId)
      if (fallbackId) window.clearTimeout(fallbackId)
    }
  }, [value])

  return <span ref={countRef}>{count}</span>
}

export default function Products() {
  const totalCount = categories.reduce((sum, c) => sum + c.count, 0)

  return (
    <section id="products" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <h2 className="font-heading font-[800] text-primary text-4xl sm:text-5xl tracking-[-0.02em] leading-tight">
              A catalog built for Philippine laboratories.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <p className="font-heading text-primary text-6xl sm:text-7xl font-[200] leading-none tracking-tight">
              <CountUpNumber value={totalCount} />
              <span className="text-accent">+</span>
            </p>
            <p className="mt-2 text-secondary text-sm uppercase tracking-[0.2em] font-semibold">
              Documented analyzers and rapid tests · 4 categories
            </p>
            <p className="mt-3 text-secondary text-sm lg:text-right">
              Reagents, consumables, and extended brand portfolios available on request.
            </p>
          </div>
        </div>

        <div className="border-t border-primary/10">
          {categories.map((cat, i) => (
            <a
              key={cat.title}
              href="#brochure"
              className="group grid grid-cols-12 gap-4 sm:gap-6 items-baseline py-6 sm:py-8 border-b border-primary/10 hover:bg-surface-alt transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none -mx-4 px-4 sm:-mx-6 sm:px-6"
            >
              <div className="col-span-2 sm:col-span-1">
                <span className="font-heading text-secondary/60 text-xs font-[500] tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="col-span-10 sm:col-span-6 lg:col-span-5">
                <h3 className="font-heading font-[700] text-primary text-xl sm:text-2xl leading-snug tracking-tight">
                  {cat.title}
                </h3>
                <p className="mt-1 text-cta-hover text-xs uppercase tracking-[0.16em] font-semibold">
                  {cat.span}
                </p>
              </div>

              <p className="hidden sm:block sm:col-span-4 text-secondary text-sm leading-relaxed">
                {cat.description}
              </p>

              <div className="col-span-12 sm:col-span-1 lg:col-span-2 flex items-center justify-between sm:justify-end gap-3 mt-3 sm:mt-0">
                <span className="font-heading text-primary text-3xl sm:text-4xl font-[300] tabular-nums tracking-tight">
                  {cat.count}
                </span>
                <ArrowUpRight className="w-5 h-5 text-primary/40 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
