'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { siteContent } from '@/lib/content'
import { Reveal } from '@/components/Reveal'

const { experience } = siteContent

// Calculate max duration for proportional bars
const maxDuration = Math.max(...experience.map(e => e.endYear - e.startYear))

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  })

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" className="py-28 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="hr mb-20" />

        {/* Header */}
        <div className="mb-24 md:mb-32">
          <Reveal>
            <p className="overline mb-6">Experience</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-serif text-[clamp(2.5rem,5.5vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-cream-50 max-w-3xl light:text-ink-900">
              A Decade at the{' '}
              <span className="italic text-terra-500">Frontlines</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-body text-ink-300 max-w-lg light:text-ink-600">
              Building evidence across fragile and conflict-affected settings, from pastoralist communities to multi-country evaluation programmes.
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line that draws on scroll */}
          <div className="hidden lg:block absolute left-[40px] top-0 bottom-0 w-px">
            <motion.div
              className="w-full h-full bg-ink-700 light:bg-cream-400"
              style={reduced ? {} : { scaleY: lineScale, transformOrigin: 'top' }}
            />
          </div>

          <div className="space-y-0">
            {experience.map((exp, i) => {
              const duration = exp.endYear - exp.startYear
              const barWidth = (duration / maxDuration) * 100

              return (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative"
                >
                  {/* Timeline dot — illuminates when in view */}
                  <motion.div
                    className="hidden lg:block absolute left-[40px] top-10 -translate-x-1/2 z-10"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="w-2.5 h-2.5 rounded-full ring-[3px] ring-ink-900 light:ring-cream-50"
                      initial={{ backgroundColor: '#3d3d4f' }}
                      whileInView={{ backgroundColor: '#c4653a' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>

                  {/* Card content */}
                  <div className="lg:ml-[80px] border-b border-ink-800/50 lg:border-b-0 max-lg:border-t-2 max-lg:border-t-terra-500/30 py-8 lg:py-10">
                    <div className="bg-ink-850/30 border-l-2 border-l-terra-500 p-6 lg:p-8 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink-950/20 transition-all duration-500 light:bg-cream-100/60 light:hover:shadow-cream-400/20">
                      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 lg:gap-12">
                        {/* Period + location */}
                        <div>
                          <p className="text-[0.75rem] uppercase tracking-[0.18em] font-semibold text-terra-500">
                            {exp.period}
                          </p>
                          {exp.location && (
                            <p className="text-caption text-ink-500 mt-1 light:text-ink-400">
                              {exp.location}
                            </p>
                          )}
                          {/* Duration bar */}
                          <div className="mt-3 h-[3px] bg-ink-800/30 light:bg-cream-300/50 relative">
                            <motion.div
                              className="absolute inset-y-0 left-0 bg-terra-500/40"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${barWidth}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            />
                          </div>
                        </div>

                        {/* Role + description */}
                        <div>
                          <h3 className="font-serif text-[clamp(1.3rem,2.2vw,1.75rem)] font-semibold leading-tight text-cream-100 mb-1.5 group-hover:text-terra-400 transition-colors duration-500 light:text-ink-800 light:group-hover:text-terra-600">
                            {exp.role}
                          </h3>
                          <p className="text-body-sm text-gold-400 mb-4 light:text-terra-600 font-medium">
                            {exp.org}
                          </p>
                          <p className="text-body-sm text-ink-300 max-w-xl leading-relaxed light:text-ink-600">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
