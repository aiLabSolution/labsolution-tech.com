import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { href: '#products', label: 'Products' },
  { href: '#brochure', label: 'Brochure' },
  { href: '#about', label: 'About' },
  { href: '#locations', label: 'Locations' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-4 left-4 right-4 z-50" role="banner">
      <nav
        className="max-w-7xl mx-auto bg-white/90 backdrop-blur-md border border-border rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm"
        aria-label="Primary navigation"
      >
        <a
          href="#"
          className="flex items-center gap-2 cursor-pointer group"
          aria-label="LabSolution Technologies home"
        >
          <img
            src="/assets/logo.png"
            alt="LabSolution Technologies"
            className="h-8 sm:h-9"
          />
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-secondary rounded-lg hover:bg-surface-alt hover:text-primary transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+6332XXXXXXX"
            className="hidden lg:inline-flex items-center gap-2 text-secondary hover:text-primary text-sm font-semibold transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            <Phone className="w-4 h-4" />
            +63 32 XXX XXXX
          </a>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Request a quote
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-alt transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? (
              <X className="w-5 h-5 text-primary" />
            ) : (
              <Menu className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 bg-white/95 backdrop-blur-md border border-border rounded-2xl px-4 py-4 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-secondary rounded-lg hover:bg-surface-alt hover:text-primary transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 pt-2 border-t border-border space-y-2">
            <a
              href="tel:+6332XXXXXXX"
              className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-secondary hover:text-primary transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              +63 32 XXX XXXX
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block text-center bg-primary text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-primary/90 transition-colors duration-200 cursor-pointer"
            >
              Request a quote
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
