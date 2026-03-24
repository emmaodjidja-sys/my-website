'use client'

import { useState, FormEvent } from 'react'
import { siteContent } from '@/lib/content'
import { Reveal } from '@/components/Reveal'

const { contact } = siteContent

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // Using Formspree or similar service — replace with your endpoint
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

        {/* Closing statement */}
        <Reveal delay={0.05}>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-cream-50 max-w-4xl light:text-ink-900">
            The best <span className="italic text-terra-500">evidence</span> is built in partnership.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-body-lg text-ink-300 max-w-lg light:text-ink-600">
            {contact.closingStatement.line2}
          </p>
        </Reveal>

        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 lg:gap-24">
          {/* Contact form */}
          <Reveal delay={0.15}>
            {status === 'sent' ? (
              <div className="py-16 text-center lg:text-left">
                <p className="font-serif text-h3 text-cream-100 light:text-ink-800 mb-3">
                  Message sent.
                </p>
                <p className="text-body text-ink-400 light:text-ink-500">
                  Thank you for reaching out. I will get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-caption text-terra-500 hover:text-terra-400 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[0.7rem] uppercase tracking-[0.18em] font-semibold text-ink-500 mb-2 light:text-ink-400">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-transparent border-b border-ink-700 py-3 text-body-sm text-cream-200 placeholder:text-ink-600 focus:border-terra-500 focus:outline-none transition-colors duration-500 light:border-cream-300 light:text-ink-800 light:focus:border-terra-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[0.7rem] uppercase tracking-[0.18em] font-semibold text-ink-500 mb-2 light:text-ink-400">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-transparent border-b border-ink-700 py-3 text-body-sm text-cream-200 placeholder:text-ink-600 focus:border-terra-500 focus:outline-none transition-colors duration-500 light:border-cream-300 light:text-ink-800 light:focus:border-terra-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-[0.7rem] uppercase tracking-[0.18em] font-semibold text-ink-500 mb-2 light:text-ink-400">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full bg-transparent border-b border-ink-700 py-3 text-body-sm text-cream-200 placeholder:text-ink-600 focus:border-terra-500 focus:outline-none transition-colors duration-500 light:border-cream-300 light:text-ink-800 light:focus:border-terra-500"
                    placeholder="Research collaboration, evaluation design, etc."
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[0.7rem] uppercase tracking-[0.18em] font-semibold text-ink-500 mb-2 light:text-ink-400">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-transparent border-b border-ink-700 py-3 text-body-sm text-cream-200 placeholder:text-ink-600 focus:border-terra-500 focus:outline-none transition-colors duration-500 resize-none light:border-cream-300 light:text-ink-800 light:focus:border-terra-500"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                {status === 'error' && (
                  <p className="text-caption text-red-400">
                    Something went wrong. Please try again or reach out via LinkedIn.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex items-center gap-2.5 bg-terra-500 text-cream-50 px-7 py-4 text-[0.9rem] font-medium tracking-wide hover:bg-terra-600 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                  <svg className="transition-transform duration-300 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </form>
            )}
          </Reveal>

          {/* Social links sidebar */}
          <Reveal delay={0.2} className="lg:pt-8">
            <p className="overline mb-6">Or find me on</p>
            <div>
              {contact.socials.map((social, i) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 border-b border-ink-800/30 light:border-cream-300/30 transition-colors duration-300 hover:bg-terra-500/[0.03]"
                >
                  <div>
                    <span className="block text-body-sm font-medium text-cream-200 group-hover:text-terra-500 transition-colors light:text-ink-700">
                      {social.platform}
                    </span>
                    <span className="block text-[0.7rem] text-ink-500 mt-0.5 light:text-ink-400">
                      {social.descriptor}
                    </span>
                  </div>
                  <svg
                    className="w-3.5 h-3.5 text-ink-600 group-hover:text-terra-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
