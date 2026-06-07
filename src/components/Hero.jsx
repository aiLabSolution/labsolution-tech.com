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
    <section className={`hero-sequence hero-image-section relative isolate min-h-[650px] overflow-hidden bg-primary pt-28 pb-10 sm:min-h-[720px] sm:pt-40 sm:pb-18 lg:min-h-[760px] ${animateHero ? 'is-running' : ''}`}>
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
          className="hero-image-bg absolute inset-0 -z-30 h-full w-full object-cover"
        />
      </picture>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(8,178,195,0.1)_0%,rgba(8,178,195,0.04)_38%,rgba(8,178,195,0.12)_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(232,255,255,0.08)_58%,rgba(8,178,195,0.18)_100%)]" aria-hidden="true" />

      <div className="relative z-10 flex min-h-[calc(650px-8rem)] items-end sm:min-h-[calc(720px-11.5rem)] lg:min-h-[calc(760px-12rem)]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span
              className="hero-accent-line block h-1 w-16 rounded-full bg-cta"
              aria-hidden="true"
            />
            <h1 className="hero-headline mt-5 font-heading font-[800] text-white text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              <span className="hero-headline-part hero-helping inline-block">Helping</span>{' '}
              <span className="hero-headline-part hero-help inline-block">you help</span>{' '}
              <span className="hero-headline-part hero-people inline-block">people.</span>
            </h1>
            <p className="hero-headline-part hero-subhead mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              Since 2006, LabSolution has equipped Philippine hospitals and laboratories with diagnostic systems from leading global manufacturers.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#brochure"
              className="group inline-flex items-center gap-2 bg-accent text-white font-semibold px-[22px] py-3.5 rounded-full shadow-[0_14px_32px_rgba(0,0,0,0.18)] hover:bg-accent-hover transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none text-base"
            >
              Browse the catalog
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/56 bg-white/82 px-[22px] py-3.5 text-primary font-semibold text-base shadow-[0_14px_32px_rgba(0,0,0,0.14)] backdrop-blur-sm hover:border-white hover:bg-white transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
