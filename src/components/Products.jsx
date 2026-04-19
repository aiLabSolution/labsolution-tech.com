import { ArrowUpRight } from 'lucide-react'

const categories = [
  {
    title: 'Blood Gas & Electrolytes',
    description:
      'Advanced analyzers and electrolyte systems for critical care diagnostics.',
    count: 3,
    span: 'Respiratory · Critical care',
  },
  {
    title: 'Hematology',
    description:
      'Complete blood count analyzers and reagents for cellular analysis and blood profiling.',
    count: 4,
    span: 'Cellular · Blood profiling',
  },
  {
    title: 'Chemistry Reagents',
    description:
      'Clinical chemistry reagents for routine and specialized biochemistry testing.',
    count: 17,
    span: 'Biochemistry · Routine assays',
  },
  {
    title: 'Chemistry Analyzers',
    description:
      'High-throughput chemistry machines including the DiaSys Respons 920 and 940 series.',
    count: 9,
    span: 'Benchtop · High-throughput',
  },
  {
    title: 'Immunology',
    description:
      'Quantitative immunoassay solutions including immunofluorescence analyzers with <3% CV.',
    count: 32,
    span: 'Quantitative · IFA',
  },
  {
    title: 'CTK Biotech Rapid Tests',
    description:
      'CE-marked rapid tests for Dengue, COVID-19, Adenovirus, Rubella, Strep A, Chagas, and more.',
    count: 41,
    span: 'Point-of-care · CE marked',
  },
]

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
              {totalCount}
              <span className="text-accent">+</span>
            </p>
            <p className="mt-2 text-secondary text-sm uppercase tracking-[0.2em] font-semibold">
              Diagnostic products · 6 categories
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
                <p className="mt-1 text-secondary/80 text-xs uppercase tracking-[0.16em] font-semibold">
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
