const links = [
  { href: '/#products', label: 'Products' },
  { href: '/#brochure', label: 'Brochure' },
  { href: '/#about', label: 'About' },
  { href: '/#locations', label: 'Locations' },
  { href: '/#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer
      className="site-footer relative overflow-hidden py-16 sm:py-20"
      role="contentinfo"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <img
              src="/assets/logo.png"
              alt="LabSolution Technologies"
              width="160"
              height="36"
              loading="lazy"
              decoding="async"
              className="site-footer-logo h-9 w-auto object-contain align-middle"
            />
            <p className="site-footer-heading mt-6 font-heading text-2xl sm:text-3xl font-[700] tracking-[-0.02em] leading-tight">
              Helping you{' '}
              <span className="italic font-[400] text-accent">help</span>{' '}
              people.
            </p>
            <p className="site-footer-body mt-5 text-sm leading-relaxed max-w-xs">
              Trusted provider of laboratory diagnostic solutions since 2006.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="site-footer-heading text-xs uppercase tracking-[0.22em] font-semibold">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="site-footer-body">
                <a
                  href="tel:+63322613819"
                  className="site-footer-link transition-colors duration-200"
                >
                  (032) 261-3819
                </a>
              </li>
              <li className="site-footer-body">
                <a
                  href="tel:+639173216228"
                  className="site-footer-link transition-colors duration-200"
                >
                  0917 321 6228
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales.labsolutiontechnologies@gmail.com"
                  className="site-footer-link transition-colors duration-200"
                >
                  sales.labsolutiontechnologies@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/labsolutiontechnologiesinc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer-link transition-colors duration-200"
                >
                  facebook.com/labsolutiontechnologiesinc
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="site-footer-heading text-xs uppercase tracking-[0.22em] font-semibold">
              Offices
            </p>
            <ul className="site-footer-body mt-5 space-y-3 text-sm">
              <li>
                <span className="site-footer-heading font-semibold">Cebu HQ</span> · 3rd
                Floor ALP Tower, 609 Tres de Abril St.
              </li>
              <li>
                <span className="site-footer-heading font-semibold">Manila</span> · #286
                El Grande Ave., BF Homes, Para&ntilde;aque City
              </li>
              <li>
                <span className="site-footer-heading font-semibold">Davao</span> · Gov.
                Generoso St., Osme&ntilde;a, Davao City
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer-divider mt-14 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-5 text-sm">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="site-footer-link transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="site-footer-copyright text-xs">
            &copy; {new Date().getFullYear()} LabSolution Technologies, Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}
