import { useState } from 'react'
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react'

const initialForm = { name: '', email: '', phone: '', message: '', website: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  const mailtoHref = `mailto:sales.labsolutiontechnologies@gmail.com?subject=${encodeURIComponent(
    'Inquiry from LabSolution website'
  )}&body=${encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
  )}`

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  return (
    <section id="contact" className="contact-cta-section relative overflow-hidden py-28 sm:py-36">
      <div className="contact-cta-bg" aria-hidden="true">
        <span className="contact-cta-glow contact-cta-glow-a" />
        <span className="contact-cta-glow contact-cta-glow-b" />
        <span className="contact-cta-wave" />
        <span className="contact-cta-particles" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <h2
              className="contact-cta-heading font-heading font-[800] text-white text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.02]"
              data-scoped-reveal
            >
              Ready to upgrade your lab?
            </h2>

            <p
              className="mt-6 text-white text-lg leading-relaxed"
              data-scoped-reveal
              style={{ '--scoped-reveal-delay': '100ms' }}
            >
              Tell us what you're testing for. We'll suggest the right analyzer
              or rapid-test kit, share specs, and get you a quote.
            </p>

            <dl
              className="mt-10 space-y-6 text-white"
              data-scoped-reveal
              style={{ '--scoped-reveal-delay': '160ms' }}
            >
              <div>
                <dt className="text-white text-xs uppercase tracking-[0.22em] font-semibold">
                  Cebu Headquarters
                </dt>
                <dd className="mt-1.5 text-base leading-relaxed">
                  3rd Floor, ALP Tower, 609 Tres de Abril St.
                  <br />
                  Cebu City, Cebu
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                <div>
                  <dt className="text-white text-xs uppercase tracking-[0.22em] font-semibold">
                    Phone
                  </dt>
                  <dd className="mt-1.5 text-base font-medium">
                    <a
                      href="tel:+63322613819"
                      className="text-white hover:text-white transition-colors duration-200"
                    >
                      (032) 261-3819
                    </a>
                    <span className="text-white"> / </span>
                    <a
                      href="tel:+63325203585"
                      className="text-white hover:text-white transition-colors duration-200"
                    >
                      520-3585
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-white text-xs uppercase tracking-[0.22em] font-semibold">
                    Email
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href="mailto:sales.labsolutiontechnologies@gmail.com"
                      className="text-white text-base font-medium hover:text-white transition-colors duration-200"
                    >
                      sales.labsolutiontechnologies@gmail.com
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div
            className="lg:col-span-7"
            data-scoped-reveal
            style={{ '--scoped-reveal-delay': '180ms' }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="contact-form-card rounded-3xl p-6 sm:p-8"
            >
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                }}
              >
                <label>
                  Website (leave blank)
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="contact-form-label block text-xs uppercase tracking-[0.2em] font-semibold mb-2"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    autoComplete="name"
                    className="contact-form-field w-full px-4 py-3.5 rounded-xl text-base focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent focus-visible:outline-none transition-colors duration-200 disabled:opacity-50"
                    placeholder="Dr. Juana dela Cruz"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="contact-form-label block text-xs uppercase tracking-[0.2em] font-semibold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    className="contact-form-field w-full px-4 py-3.5 rounded-xl text-base focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent focus-visible:outline-none transition-colors duration-200 disabled:opacity-50"
                    placeholder="lab@hospital.ph"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="phone"
                  className="contact-form-label block text-xs uppercase tracking-[0.2em] font-semibold mb-2"
                >
                  Phone{' '}
                  <span className="contact-form-label-note normal-case tracking-normal font-normal">
                    — for faster follow-up
                  </span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="tel"
                  className="contact-form-field w-full px-4 py-3.5 rounded-xl text-base focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent focus-visible:outline-none transition-colors duration-200 disabled:opacity-50"
                  placeholder="+63 XXX XXX XXXX"
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="contact-form-label block text-xs uppercase tracking-[0.2em] font-semibold mb-2"
                >
                  Your laboratory needs
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  disabled={isLoading}
                  className="contact-form-field w-full px-4 py-3.5 rounded-xl text-base resize-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent focus-visible:outline-none transition-colors duration-200 disabled:opacity-50"
                  placeholder="Looking for chemistry analyzers for a 200-bed hospital in Cebu..."
                />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="contact-form-submit group inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-full transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none text-base disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading && (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </>
                  )}
                  {isSuccess && (
                    <>
                      <Check className="w-4 h-4" />
                      Message received
                    </>
                  )}
                  {!isLoading && !isSuccess && (
                    <>
                      Send message
                      <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <a
                  href={mailtoHref}
                  className="contact-form-direct text-sm underline underline-offset-4 transition-colors duration-200 cursor-pointer"
                >
                  Or email us directly
                </a>
              </div>

              {isSuccess && (
                <p
                  role="status"
                  className="contact-form-status mt-5 text-sm flex items-start gap-2"
                >
                  <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  Thanks — we'll follow up within one business day.
                </p>
              )}
              {isError && (
                <p
                  role="alert"
                  className="contact-form-status mt-5 text-sm flex items-start gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  Something went wrong. Try again or email{' '}
                  <a
                    href="mailto:sales.labsolutiontechnologies@gmail.com"
                    className="underline underline-offset-2"
                  >
                    sales.labsolutiontechnologies@gmail.com
                  </a>
                  .
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

    </section>
  )
}
