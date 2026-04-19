import { useState } from 'react'
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react'

const initialForm = { name: '', email: '', phone: '', message: '' }

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
      // Placeholder submission — wire to Formspree/Resend/API when ready.
      // For now, simulate a real round-trip so the UX is testable end-to-end.
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  const mailtoHref = `mailto:info@labsolution.ph?subject=${encodeURIComponent(
    'Inquiry from LabSolution website'
  )}&body=${encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
  )}`

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  return (
    <section id="contact" className="py-24 sm:py-32 bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <h2 className="font-heading font-[800] text-white text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.02]">
              Ready to upgrade your lab?
            </h2>

            <p className="mt-6 text-white/70 text-lg leading-relaxed">
              Tell us what you're testing for. We'll suggest the right analyzer
              or rapid-test kit, share specs, and get you a quote.
            </p>

            <dl className="mt-10 space-y-6 text-white/80">
              <div>
                <dt className="text-white/50 text-xs uppercase tracking-[0.22em] font-semibold">
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
                  <dt className="text-white/50 text-xs uppercase tracking-[0.22em] font-semibold">
                    Phone
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href="tel:+6332XXXXXXX"
                      className="text-base font-medium hover:text-accent transition-colors duration-200"
                    >
                      +63 32 XXX XXXX
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-[0.22em] font-semibold">
                    Email
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href="mailto:info@labsolution.ph"
                      className="text-base font-medium hover:text-accent transition-colors duration-200"
                    >
                      info@labsolution.ph
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white/70 text-xs uppercase tracking-[0.2em] font-semibold mb-2"
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
                    className="w-full px-4 py-3.5 bg-white/5 text-white placeholder-white/30 border border-white/10 rounded-xl text-base focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent focus-visible:outline-none transition-colors duration-200 disabled:opacity-50"
                    placeholder="Dr. Juana dela Cruz"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white/70 text-xs uppercase tracking-[0.2em] font-semibold mb-2"
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
                    className="w-full px-4 py-3.5 bg-white/5 text-white placeholder-white/30 border border-white/10 rounded-xl text-base focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent focus-visible:outline-none transition-colors duration-200 disabled:opacity-50"
                    placeholder="lab@hospital.ph"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="phone"
                  className="block text-white/70 text-xs uppercase tracking-[0.2em] font-semibold mb-2"
                >
                  Phone{' '}
                  <span className="normal-case tracking-normal text-white/40 font-normal">
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
                  className="w-full px-4 py-3.5 bg-white/5 text-white placeholder-white/30 border border-white/10 rounded-xl text-base focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent focus-visible:outline-none transition-colors duration-200 disabled:opacity-50"
                  placeholder="+63 XXX XXX XXXX"
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="block text-white/70 text-xs uppercase tracking-[0.2em] font-semibold mb-2"
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
                  className="w-full px-4 py-3.5 bg-white/5 text-white placeholder-white/30 border border-white/10 rounded-xl text-base resize-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent focus-visible:outline-none transition-colors duration-200 disabled:opacity-50"
                  placeholder="Looking for chemistry analyzers for a 200-bed hospital in Cebu..."
                />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="group inline-flex items-center justify-center gap-2 bg-accent text-white font-semibold px-7 py-3.5 rounded-full hover:bg-accent-hover transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none text-base disabled:opacity-70 disabled:cursor-not-allowed"
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
                  className="text-white/60 text-sm underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white transition-colors duration-200 cursor-pointer"
                >
                  Or email us directly
                </a>
              </div>

              {isSuccess && (
                <p
                  role="status"
                  className="mt-5 text-sm text-white/80 flex items-start gap-2"
                >
                  <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  Thanks — we'll follow up within one business day.
                </p>
              )}
              {isError && (
                <p
                  role="alert"
                  className="mt-5 text-sm text-white/80 flex items-start gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  Something went wrong. Try again or email{' '}
                  <a
                    href="mailto:info@labsolution.ph"
                    className="underline underline-offset-2"
                  >
                    info@labsolution.ph
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
