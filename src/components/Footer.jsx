const links = [
  { href: '#products', label: 'Products' },
  { href: '#brochure', label: 'Brochure' },
  { href: '#about', label: 'About' },
  { href: '#locations', label: 'Locations' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer
      className="bg-primary border-t border-white/10 py-14 sm:py-16"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5">
            <img
              src="/assets/logo.png"
              alt="LabSolution Technologies"
              className="h-8 brightness-0 invert"
            />
            <p className="mt-5 font-heading text-white text-2xl sm:text-3xl font-[700] tracking-[-0.02em] leading-tight">
              Helping you{' '}
              <span className="italic font-[400] text-accent">help</span>{' '}
              people.
            </p>
            <p className="mt-5 text-white/60 text-sm leading-relaxed max-w-xs">
              Diagnostic equipment and rapid tests for Philippine hospitals
              since 2006.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-white/50 text-xs uppercase tracking-[0.22em] font-semibold">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href="tel:+6332XXXXXXX"
                  className="text-white/80 hover:text-white transition-colors duration-200"
                >
                  +63 32 XXX XXXX
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@labsolution.ph"
                  className="text-white/80 hover:text-white transition-colors duration-200"
                >
                  info@labsolution.ph
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/labsolutiontech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors duration-200"
                >
                  facebook.com/labsolutiontech
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-white/50 text-xs uppercase tracking-[0.22em] font-semibold">
              Offices
            </p>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>
                <span className="text-white font-semibold">Cebu HQ</span> · 3rd
                Floor ALP Tower, 609 Tres de Abril St.
              </li>
              <li>
                <span className="text-white font-semibold">Manila</span> · #286
                El Grande Ave., BF Homes, Para&ntilde;aque City
              </li>
              <li>
                <span className="text-white font-semibold">Davao</span> · Gov.
                Generoso St., Osme&ntilde;a, Davao City
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-5 text-sm">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/50 hover:text-white transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} LabSolution Technologies, Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}
