import { useEffect, useRef } from 'react'
import { Check, ChevronDown } from 'lucide-react'

const milestones = [
  { year: '2006', text: 'Founded as ALP Diagnostix in Cebu City.' },
  { year: '2008', text: 'Incorporated as LabSolution Technologies, Inc.' },
  { year: 'Today', text: 'Serving hospitals nationwide from 3 offices.' },
]

const commitments = [
  {
    label: 'Vision',
    text: 'We are one of the most trusted and reliable choices in healthcare solutions.',
  },
  {
    label: 'Mission',
    text: 'Through our commitment to customer care, innovation, and excellence, we offer healthcare providers the finest, most reliable, and competitively priced products.',
  },
]

const coreValues = [
  'INTEGRITY',
  'ACCOUNTABILITY',
  'ADAPTABILITY',
  'TEAMWORK',
  'EXCELLENCE',
  'CUSTOMER-FOCUSED',
]

export default function About() {
  const storyRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    const story = storyRef.current
    const timeline = timelineRef.current
    if (!timeline) return undefined

    const steps = Array.from(timeline.querySelectorAll('[data-timeline-step]'))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const setProgress = (progress) => {
      const boundedProgress = Math.max(0, Math.min(progress, 1))
      timeline.style.setProperty('--timeline-progress', boundedProgress)
      steps.forEach((step, index) => {
        const threshold = steps.length === 1 ? 0 : index / (steps.length - 1)
        step.classList.toggle('is-active', boundedProgress >= threshold)
      })
    }

    if (reduceMotion) {
      story?.classList.add('is-visible')
      setProgress(1)
      return undefined
    }

    let frameId
    let fallbackId
    let storyObserver
    const updateProgress = () => {
      const rect = timeline.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const start = viewportHeight * 0.78
      const end = viewportHeight * 0.28
      const progress = (start - rect.top) / (start - end)
      setProgress(progress)
    }

    const scheduleUpdate = () => {
      if (frameId) return
      frameId = requestAnimationFrame(() => {
        frameId = undefined
        updateProgress()
      })
    }

    if ('IntersectionObserver' in window && story) {
      storyObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          story.classList.add('is-visible')
          storyObserver.disconnect()
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.18 },
      )
      storyObserver.observe(story)
    } else {
      story?.classList.add('is-visible')
    }

    updateProgress()
    window.setTimeout(updateProgress, 150)
    fallbackId = window.setTimeout(() => {
      story?.classList.add('is-visible')
      updateProgress()
    }, 700)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      storyObserver?.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frameId) cancelAnimationFrame(frameId)
      if (fallbackId) window.clearTimeout(fallbackId)
    }
  }, [])

  return (
    <section id="about" className="pt-24 pb-0 sm:pt-32 sm:pb-0 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          <div ref={storyRef} className="about-story-motion lg:col-span-6">
            <p className="font-heading text-secondary text-sm uppercase tracking-[0.22em] font-semibold">
              Cebu · Est. 2006
            </p>

            <h2
              className="reveal-accent-heading mt-4 font-heading font-[800] text-primary text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.05]"
              data-scoped-reveal
            >
              Eighteen years of quiet work.
            </h2>

            <div className="mt-8 space-y-5 text-secondary text-lg leading-relaxed max-w-xl">
              <p>
                LabSolution Technologies, Inc. began in March 2006 as ALP
                Diagnostix — a small operation in Cebu City. We incorporated as
                LabSolution in June 2008 and grew alongside the laboratories we
                serve.
              </p>
              <p>
                Today we bring diagnostic equipment from leading global
                manufacturers to hospitals, clinics, and diagnostic centers
                across the Philippines. Service above all — that's been the
                rule from day one.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pt-10 lg:pl-10 lg:border-l lg:border-primary/10">
            <ol
              ref={timelineRef}
              className="timeline-roadmap relative space-y-7 sm:space-y-8"
            >
              <span className="absolute left-[17px] top-4 bottom-4 block w-px bg-cta-hover/20" aria-hidden="true" />
              <span className="timeline-progress-line absolute left-[17px] top-4 bottom-4 block w-px bg-cta-hover" aria-hidden="true" />
              {milestones.map((m, index) => (
                <li
                  key={m.year}
                  className="relative grid grid-cols-[36px_1fr] gap-5 sm:gap-6"
                  data-timeline-step
                >
                  <div className="relative flex flex-col items-center pt-1">
                    <span
                      className={`timeline-marker relative z-10 flex items-center justify-center rounded-full text-white shadow-sm ${
                        m.year === 'Today'
                          ? 'h-11 w-11 ring-4 ring-cta-hover/15'
                          : 'h-9 w-9'
                      }`}
                      aria-hidden="true"
                    >
                      {m.year === 'Today' ? (
                        <span className="h-2.5 w-2.5 rounded-full bg-white" />
                      ) : (
                        <Check className="h-4 w-4 stroke-[3]" />
                      )}
                    </span>
                    {index < milestones.length - 1 && (
                      <ChevronDown
                        className="relative z-10 mt-8 h-4 w-4 text-cta-hover"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="pb-3 sm:pb-4">
                    <p className="font-heading font-[800] text-primary text-[1.7rem] sm:text-3xl tabular-nums tracking-tight leading-none">
                      {m.year}
                    </p>
                    <p className="mt-3 text-secondary text-base sm:text-lg leading-relaxed max-w-md">
                      {m.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <div className="service-motto mx-auto max-w-3xl border-y border-primary/10 py-8 sm:py-10">
            <div
              className="service-motto-line mx-auto mb-5 h-px w-20 bg-cta-hover"
              aria-hidden="true"
              data-scoped-reveal
            />
            <p
              className="service-motto-title font-heading font-[800] text-primary text-[30px] sm:text-[36px] lg:text-[40px] tracking-[-0.02em] leading-[1.05]"
            >
              <span
                className="service-motto-word"
                data-scoped-reveal
                style={{ '--scoped-reveal-delay': '110ms' }}
              >
                Service
              </span>
              <span
                className="service-motto-word"
                data-scoped-reveal
                style={{ '--scoped-reveal-delay': '220ms' }}
              >
                above
              </span>
              <span
                className="service-motto-word"
                data-scoped-reveal
                style={{ '--scoped-reveal-delay': '330ms' }}
              >
                all.
              </span>
            </p>
            <p
              className="service-motto-copy mt-3 text-secondary text-sm sm:text-base"
              data-scoped-reveal
              style={{ '--scoped-reveal-delay': '440ms' }}
            >
              The phrase repeats because every client already knows it.
            </p>
          </div>
        </div>

        <div className="mt-12 sm:mt-14 pt-8 sm:pt-10 border-t border-primary/10 text-center">
          <div className="grid lg:grid-cols-2 gap-4">
            {commitments.map((item, index) => (
              <article
                key={item.label}
                className="blue-card-depth min-h-[150px] sm:min-h-[165px] bg-gradient-to-br from-cta-hover to-accent-hover text-white rounded-2xl px-5 py-6 sm:px-8 sm:py-7 lg:px-10 lg:py-8 grid grid-rows-[auto_auto_1fr] place-items-center text-center"
                data-scoped-reveal
                style={{ '--scoped-reveal-delay': `${index * 120}ms` }}
              >
                <h3 className="font-heading font-[800] text-[20px] sm:text-[21px] lg:text-[22px] leading-none tracking-tight uppercase">
                  {item.label}
                </h3>
                <div className="mt-3 h-px w-16 bg-white/80" aria-hidden="true" />
                <p className="mt-4 max-w-lg mx-auto text-white text-base sm:text-lg leading-relaxed self-start">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <div
            className="blue-card-depth mt-4 bg-gradient-to-br from-cta-hover to-accent-hover text-white rounded-2xl px-5 py-5 sm:px-8 sm:py-6 lg:px-12 lg:py-7"
            data-scoped-reveal
            style={{ '--scoped-reveal-delay': '240ms' }}
          >
            <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
              <h3 className="font-heading font-[800] text-[20px] sm:text-[21px] lg:text-[22px] leading-none tracking-tight uppercase">
                CORE VALUES
              </h3>
              <div className="mt-3 h-px w-16 bg-white/80" aria-hidden="true" />
              <p className="mt-3 max-w-xl text-white text-sm sm:text-base leading-relaxed">
                The standards that guide every product, partnership, and service
                commitment.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-w-4xl mx-auto">
              {coreValues.map((value) => (
                <div
                  key={value}
                  className="border border-white/30 bg-white/10 px-2.5 py-2 rounded-lg font-heading font-[800] text-white text-[11px] sm:text-xs tracking-[0.14em]"
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
