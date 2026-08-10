import { Download } from 'lucide-react'

const brochurePdfHref =
  '/brochures/labsolution-product-brochure-with-photos.pdf'

export default function BrochurePage() {
  return (
    <section className="brochure-viewer-page min-h-screen bg-surface pt-32 pb-16 sm:pt-36 sm:pb-20">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <nav
          className="text-sm font-medium text-secondary"
          aria-label="Breadcrumb"
          data-scoped-reveal
        >
          <a
            href="/"
            className="hover:text-primary transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            Home
          </a>
          <span className="mx-2 text-slate-400" aria-hidden="true">
            &rarr;
          </span>
          <span className="text-primary">Brochure</span>
        </nav>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl" data-scoped-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              Brochure
            </p>
            <h1 className="mt-3 font-heading text-4xl font-[800] leading-tight tracking-[-0.02em] text-primary sm:text-5xl lg:text-6xl">
              Product Catalog
            </h1>
            <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
              Browse our latest product catalog featuring selected diagnostic
              instruments, laboratory equipment, and rapid diagnostic solutions.
            </p>
          </div>

          <a
            href={brochurePdfHref}
            download
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
            data-scoped-reveal
            style={{ '--scoped-reveal-delay': '100ms' }}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download Product Catalog
          </a>
        </div>

        <div
          className="brochure-viewer-frame mt-10 overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
          data-scoped-reveal
          style={{ '--scoped-reveal-delay': '160ms' }}
        >
          <iframe
            src={`${brochurePdfHref}#toolbar=1&navpanes=0&view=FitH`}
            title="LabSolution Product Catalog PDF viewer"
            className="h-full w-full"
          />
        </div>
      </div>
    </section>
  )
}
