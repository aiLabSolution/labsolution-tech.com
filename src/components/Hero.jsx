import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 relative">
            <div className="flex items-center gap-3 text-secondary text-xs font-semibold uppercase tracking-[0.2em]">
              <span className="h-px w-8 bg-primary/40" aria-hidden="true" />
              Est. Cebu, 2006
            </div>

            <h1 className="mt-6 font-heading font-[900] text-primary text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em]">
              Helping you{' '}
              <span className="italic font-[500] text-accent">help</span>{' '}
              people.
            </h1>

            <p className="mt-8 text-secondary text-lg sm:text-xl leading-relaxed max-w-xl">
              LabSolution Technologies delivers diagnostic equipment and rapid
              test kits to hospitals and laboratories across the Philippines —
              backed by world-class manufacturers and 18 years of service.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#brochure"
                className="group inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3.5 rounded-full hover:bg-primary/90 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none text-base"
              >
                Browse the catalog
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-primary font-semibold text-base underline underline-offset-[6px] decoration-2 decoration-accent/40 hover:decoration-accent transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                Request a quote
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative">
              <div
                className="absolute -top-3 -left-3 right-6 bottom-6 bg-accent-soft rounded-[2rem]"
                aria-hidden="true"
              />
              <div className="relative bg-white border border-border rounded-[2rem] p-6 sm:p-8 overflow-hidden">
                <img
                  src="/assets/products/diasys-940.jpg"
                  alt="DiaSys Respons 940 chemistry analyzer"
                  className="w-full aspect-[4/5] object-contain"
                  loading="eager"
                />
                <div className="mt-4 pt-4 border-t border-border flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs text-secondary uppercase tracking-[0.18em] font-semibold">
                      Flagship analyzer
                    </p>
                    <p className="mt-1 font-heading font-[700] text-primary text-lg leading-tight">
                      DiaSys Respons 940
                    </p>
                    <p className="text-secondary text-sm">
                      400 tests per hour · 12 wavelengths
                    </p>
                  </div>
                  <a
                    href="#brochure"
                    className="shrink-0 text-primary text-sm font-semibold hover:text-accent transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                    aria-label="View specifications for DiaSys Respons 940"
                  >
                    Specs →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 pt-8 border-t border-primary/10 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4">
          <p className="shrink-0 text-secondary text-xs uppercase tracking-[0.22em] font-semibold">
            In partnership with
          </p>
          <p className="font-heading text-primary text-sm sm:text-base font-[500] tracking-tight">
            CTK Biotech
            <span className="text-primary/25 mx-2.5">·</span>
            DiaSys
            <span className="text-primary/25 mx-2.5">·</span>
            Rayto
            <span className="text-primary/25 mx-2.5">·</span>
            Snibe
            <span className="text-primary/25 mx-2.5">·</span>
            Edan
            <span className="text-primary/25 mx-2.5">·</span>
            <span className="text-secondary">and more</span>
          </p>
        </div>
      </div>
    </section>
  )
}
