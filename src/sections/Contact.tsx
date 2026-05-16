'use client'

import { useRef, useState, FormEvent } from 'react'
import { siteContent } from '@/lib/content'
import { Reveal } from '@/components/Reveal'

const { contact } = siteContent

const inputClass =
  'w-full bg-transparent border-b border-ink-700 py-3 text-body-sm text-cream-100 placeholder:text-ink-400 ' +
  'transition-colors duration-150 focus:border-terra-500 ' +
  'focus-visible:outline-none focus-visible:border-terra-500 ' +
  'light:border-cream-300 light:text-ink-800 light:placeholder:text-ink-500 light:focus:border-terra-500'

const labelClass =
  'block text-[0.7rem] uppercase tracking-[0.18em] font-semibold text-cream-200 mb-2 light:text-ink-600'

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const statusRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://formspree.io/f/xpwzgkqj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-28 md:py-44">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="hr mb-20" />

        <Reveal>
          <p className="overline mb-8">Contact</p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-cream-50 max-w-4xl text-balance light:text-ink-900">
            Let&rsquo;s <span className="italic text-terra-500">talk</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-body-lg text-pretty text-cream-200 max-w-xl light:text-ink-700">
            {contact.closingStatement.line2}
          </p>
        </Reveal>

        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 lg:gap-24">
          <Reveal delay={0.15}>
            {status === 'sent' ? (
              <div
                ref={statusRef}
                role="status"
                aria-live="polite"
                className="py-16 text-center lg:text-left"
              >
                <p className="font-serif text-h3 text-cream-100 light:text-ink-800 mb-3">
                  Message sent.
                </p>
                <p className="text-body text-cream-200 light:text-ink-600">
                  Thank you for reaching out. I will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-caption text-terra-500 hover:text-terra-400 transition-colors duration-150 focus-visible:outline-none focus-visible:underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={labelClass}>Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      autoComplete="name"
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      autoComplete="email"
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className={inputClass}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className={labelClass}>Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    aria-required="true"
                    value={formData.subject}
                    onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className={inputClass}
                    placeholder="Research collaboration, evaluation design, etc."
                  />
                </div>
                <div>
                  <label htmlFor="message" className={labelClass}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    aria-required="true"
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                <div ref={statusRef} role="status" aria-live="polite" className="min-h-[1.5rem]">
                  {status === 'error' && (
                    <p className="text-caption text-red-400">
                      Something went wrong. Please try again or reach out via LinkedIn.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  aria-disabled={status === 'sending'}
                  className="group inline-flex items-center gap-2.5 bg-terra-500 text-cream-50 px-7 py-4 text-[0.9rem] font-medium tracking-wide hover:bg-terra-600 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream-50/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending…' : 'Send'}
                  <svg aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.2} className="lg:pt-8">
            <p className="overline mb-6">Or find me on</p>
            <ul className="list-none">
              {contact.socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-4 border-b border-ink-800/30 light:border-cream-300/30 transition-colors duration-150 hover:bg-terra-500/[0.04] focus-visible:outline-none focus-visible:bg-terra-500/[0.08]"
                  >
                    <div>
                      <span className="block text-body-sm font-medium text-cream-100 group-hover:text-terra-500 transition-colors duration-150 light:text-ink-800">
                        {social.platform}
                      </span>
                      <span className="block text-[0.7rem] text-cream-200/80 mt-0.5 light:text-ink-600">
                        {social.descriptor}
                      </span>
                    </div>
                    <svg
                      aria-hidden="true"
                      className="w-3.5 h-3.5 text-cream-200/70 group-hover:text-terra-500 transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
