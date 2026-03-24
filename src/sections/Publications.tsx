'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { siteContent } from '@/lib/content'
import { Reveal } from '@/components/Reveal'

const { publications } = siteContent
// Show first 8 curated highlights on homepage
const highlights = publications.slice(0, 8)

export function Publications() {
  return (
    <section id="publications" className="py-28 md:py-40">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="hr mb-20" />

        {/* Header */}
        <div className="mb-16">
          <Reveal>
            <p className="overline mb-6">Research</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-serif text-[clamp(2.5rem,5.5vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-cream-50 light:text-ink-900">
              Publications
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-body text-ink-300 max-w-lg light:text-ink-600">
              Peer-reviewed research spanning infectious disease, nutrition, maternal health, health systems, and the climate-conflict nexus.
            </p>
          </Reveal>
        </div>

        {/* Curated publication list */}
        <div>
          {highlights.map((pub, i) => (
            <motion.a
              key={pub.title}
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group block border-b border-ink-800/50 py-6 md:py-8 light:border-cream-300/50 hover:bg-terra-500/[0.03] transition-colors duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_200px] gap-2 md:gap-8 items-start">
                <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] font-semibold text-terra-500/70 md:pt-1.5">
                  {pub.year}
                </span>
                <div>
                  <h3 className="font-serif text-[clamp(1.05rem,1.5vw,1.25rem)] font-semibold leading-snug text-cream-100 group-hover:text-terra-400 transition-colors duration-400 light:text-ink-800 light:group-hover:text-terra-600">
                    {pub.title}
                  </h3>
                  <p className="mt-1.5 text-caption text-ink-500 light:text-ink-400">
                    <span className="italic">{pub.journal}</span> &middot; {pub.authors}
                  </p>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-4 md:pt-1.5">
                  <span className="text-[0.65rem] uppercase tracking-[0.14em] text-ink-500 light:text-ink-400 hidden md:inline px-2 py-0.5 border border-ink-800/30 light:border-cream-300/50">
                    {pub.theme}
                  </span>
                  <svg
                    className="w-4 h-4 text-ink-600 group-hover:text-terra-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View all CTA */}
        <Reveal className="mt-12">
          <Link href="/publications" className="arrow-link">
            View all 29+ publications
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
