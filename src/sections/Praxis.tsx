'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { siteContent } from '@/lib/content'
import { Reveal } from '@/components/Reveal'

const { praxis } = siteContent

export function Praxis() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section ref={ref} id="praxis" className="relative py-32 md:py-44 overflow-hidden">
      {/* Moving background */}
      <motion.div
        style={reduced ? {} : { y: bgY }}
        className="absolute inset-[-10%] bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,#1f1018,#0e0e14_80%)] light:bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,#f5ece0,#fefcf8_80%)]"
      />

      {/* Borders */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-terra-500/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-terra-500/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 xl:px-20">
        <Reveal>
          <p className="overline mb-6">AI for Good Lab</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-serif text-[clamp(3rem,7vw,7rem)] font-bold leading-[0.9] tracking-[-0.04em] text-terra-500 mb-6">
            {praxis.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-serif text-[clamp(1.2rem,2vw,1.6rem)] leading-snug text-cream-100 light:text-ink-800 max-w-2xl">
            {praxis.subtitle}
          </p>
        </Reveal>

        {/* Two tracks */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Evaluation track */}
          <Reveal>
            <div className="border-t-2 border-terra-500/40 pt-8">
              <p className="text-[0.65rem] uppercase tracking-[0.18em] font-semibold text-terra-500/70 mb-4">Evaluation</p>
              <h3 className="font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] font-semibold leading-tight text-cream-100 light:text-ink-800 mb-5">
                Programme evaluation infrastructure
              </h3>
              <p className="text-body text-ink-300 light:text-ink-600 mb-4">
                Twelve years of field evaluation experience encoded into free, open-source browser tools. Six live tools covering 298 indicators across 11 sectors. Sample size calculation, evaluation design advising, data exploration, and more. Everything runs on your machine with zero data transmission.
              </p>
              <a
                href={praxis.url + '/evaluation/'}
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-link mt-2 inline-flex"
              >
                Open the toolkit
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </a>
            </div>
          </Reveal>

          {/* EWS track */}
          <Reveal delay={0.1}>
            <div className="border-t-2 border-gold-500/40 pt-8">
              <p className="text-[0.65rem] uppercase tracking-[0.18em] font-semibold text-gold-500/70 mb-4">Early Warning</p>
              <h3 className="font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] font-semibold leading-tight text-cream-100 light:text-ink-800 mb-5">
                Conflict prediction
              </h3>
              <p className="text-body text-ink-300 light:text-ink-600 mb-4">
                Econometric research using ACLED geocoded conflict data to predict violent extremism escalation. A stacked event study design shows that kidnapping spikes predict subsequent VE surges in Burkina Faso, Mali, and Niger, with spatial spillover at 50km and 100km radii. The platform translates these signals into actionable alerts.
              </p>
              <a
                href={praxis.url + '/ews/'}
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-link mt-2 inline-flex"
              >
                PRAXIS EWS
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </a>
            </div>
          </Reveal>
        </div>

        {/* CTAs */}
        <Reveal className="mt-16 md:mt-20">
          <div className="flex flex-wrap gap-4">
            <a
              href={praxis.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-terra-500 text-cream-50 px-7 py-4 text-[0.9rem] font-medium tracking-wide hover:bg-terra-600 transition-all duration-500"
            >
              Explore PRAXIS
              <svg className="transition-transform duration-300 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a
              href={praxis.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-[0.9rem] text-ink-300 hover:text-terra-500 transition-colors duration-300 font-medium light:text-ink-600"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
              View Source
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
