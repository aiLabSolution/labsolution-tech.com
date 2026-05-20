import { ArrowRight, Sparkles } from 'lucide-react'
import ProductIllustration from './ProductIllustration'

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
                className="group inline-flex items-center gap-2 bg-accent text-white font-semibold px-6 py-3.5 rounded-full hover:bg-accent-hover transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none text-base"
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
              <div className="relative bg-white border border-border rounded-[2rem] overflow-hidden">
                <div className="relative aspect-[5/3] bg-surface-alt">
                  <ProductIllustration category="chemistry" model="DiaSys Respons 940" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-accent text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-[0.12em] shadow">
                    <Sparkles className="w-3 h-3" />
                    Flagship
                  </div>
                  <span className="absolute top-4 right-4 text-[10px] font-semibold text-secondary tracking-[0.14em] uppercase bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-border">
                    Chemistry
                  </span>
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-xs text-secondary uppercase tracking-[0.18em] font-semibold">
                    Flagship analyzer
                  </p>
                  <p className="mt-1 font-heading font-[700] text-primary text-xl leading-tight">
                    DiaSys Respons 940
                  </p>
                  <p className="mt-1 font-heading text-secondary text-sm italic">
                    High-throughput automated chemistry analyzer
                  </p>
                  <dl className="mt-5 grid grid-cols-3 gap-x-3 pt-5 border-t border-border">
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary">
                        Throughput
                      </dt>
                      <dd className="mt-0.5 text-sm font-semibold text-primary">400 T/H</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary">
                        Wavelengths
                      </dt>
                      <dd className="mt-0.5 text-sm font-semibold text-primary">12</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary">
                        Sample disk
                      </dt>
                      <dd className="mt-0.5 text-sm font-semibold text-primary">80</dd>
                    </div>
                  </dl>
                  <a
                    href="#brochure"
                    className="mt-5 inline-flex items-center gap-1 text-cta font-semibold text-sm hover:gap-2 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-cta focus-visible:outline-none"
                  >
                    View specifications
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
