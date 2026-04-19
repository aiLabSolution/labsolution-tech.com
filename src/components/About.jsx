const milestones = [
  { year: '2006', text: 'Founded as ALP Diagnostix in Cebu City.' },
  { year: '2008', text: 'Incorporated as LabSolution Technologies, Inc.' },
  { year: 'Today', text: 'Serving hospitals nationwide from 3 offices.' },
]

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <p className="font-heading text-secondary text-sm uppercase tracking-[0.22em] font-semibold">
              Cebu · Est. 2006
            </p>

            <h2 className="mt-4 font-heading font-[800] text-primary text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.05]">
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

          <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-primary/10">
            <ol className="space-y-8">
              {milestones.map((m) => (
                <li
                  key={m.year}
                  className="grid grid-cols-[72px_1fr] gap-5 items-baseline"
                >
                  <span className="font-heading font-[700] text-primary text-2xl tabular-nums tracking-tight">
                    {m.year}
                  </span>
                  <p className="text-secondary text-base leading-relaxed">
                    {m.text}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-12 pt-10 border-t border-primary/10">
              <p className="font-heading font-[700] text-primary text-3xl sm:text-4xl tracking-[-0.02em] leading-tight">
                Service above all.
              </p>
              <p className="mt-3 text-secondary text-sm">
                The phrase repeats because every client already knows it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
