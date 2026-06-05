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
    <section className={`hero-sequence hero-image-section relative isolate min-h-[680px] overflow-hidden bg-primary pt-32 pb-14 sm:min-h-[720px] sm:pt-40 sm:pb-18 lg:min-h-[760px] ${animateHero ? 'is-running' : ''}`}>
      <img
        src="/assets/hero-labsolution-newpic.jpg"
        alt=""
        className="hero-image-bg absolute inset-0 -z-30 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(8,178,195,0.1)_0%,rgba(8,178,195,0.04)_38%,rgba(8,178,195,0.12)_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(232,255,255,0.08)_58%,rgba(8,178,195,0.18)_100%)]" aria-hidden="true" />

      <div className="relative z-10 flex min-h-[calc(680px-9.5rem)] items-end sm:min-h-[calc(720px-11.5rem)] lg:min-h-[calc(760px-12rem)]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#brochure"
              className="group inline-flex items-center gap-2 bg-accent text-white font-semibold px-6 py-3.5 rounded-full shadow-[0_14px_32px_rgba(0,0,0,0.18)] hover:bg-accent-hover transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none text-base"
            >
              Browse the catalog
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/56 bg-white/82 px-6 py-3.5 text-primary font-semibold text-base shadow-[0_14px_32px_rgba(0,0,0,0.14)] backdrop-blur-sm hover:border-white hover:bg-white transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
