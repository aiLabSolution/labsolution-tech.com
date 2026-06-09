import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const [animateHero, setAnimateHero] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const frameId = requestAnimationFrame(() => setAnimateHero(true))
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <section className={`hero-sequence hero-image-section hero-cyan-surface relative isolate min-h-0 overflow-hidden pt-24 pb-8 min-[769px]:min-h-[720px] min-[769px]:pt-40 min-[769px]:pb-18 lg:min-h-[760px] ${animateHero ? 'is-running' : ''}`}>
      <picture aria-hidden="true">
        <source
          media="(max-width: 639px)"
          srcSet="/assets/hero-labsolution-mobile.jpg"
        />
        <img
          src="/assets/hero-labsolution-desktop.jpg"
          alt=""
          width="2400"
          height="1350"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="hero-image-bg"
        />
      </picture>
      <div className="absolute inset-0 -z-20 hidden bg-[linear-gradient(90deg,rgba(8,178,195,0.1)_0%,rgba(8,178,195,0.04)_38%,rgba(8,178,195,0.12)_100%)] min-[769px]:block" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 hidden bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(232,255,255,0.08)_58%,rgba(8,178,195,0.18)_100%)] min-[769px]:block" aria-hidden="true" />

      <div className="relative z-10 mt-4 min-[769px]:mt-0 min-[769px]:flex min-[769px]:min-h-[calc(720px-11.5rem)] min-[769px]:items-end lg:min-h-[calc(760px-12rem)]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#brochure"
              className="group inline-flex items-center gap-2 border border-white bg-white text-cta-hover font-semibold px-[22px] py-3.5 rounded-full shadow-[0_14px_34px_rgba(255,255,255,0.28)] hover:bg-white/92 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none min-[769px]:border-transparent min-[769px]:bg-accent min-[769px]:text-white min-[769px]:shadow-[0_14px_32px_rgba(0,0,0,0.18)] min-[769px]:hover:bg-accent-hover text-base"
            >
              Browse the catalog
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-[22px] py-3.5 text-primary font-semibold text-base shadow-[0_14px_34px_rgba(255,255,255,0.28)] backdrop-blur-sm hover:bg-white/92 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none min-[769px]:border-white/56 min-[769px]:bg-white/82 min-[769px]:shadow-[0_14px_32px_rgba(0,0,0,0.14)] min-[769px]:hover:border-white min-[769px]:hover:bg-white"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
