'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { siteContent } from '@/lib/content'
import { Reveal, StaggerContainer, StaggerItem } from '@/components/Reveal'
import { Tooltip } from '@/components/Tooltip'

const { about } = siteContent

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Bio reading progress (local)
  const { scrollYProgress: bioProgress } = useScroll({
    target: bioRef,
    offset: ['start center', 'end center'],
  })

  const quoteOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1])
  const quoteY = useTransform(scrollYProgress, [0.05, 0.25], [40, 0])
  const quoteScale = useTransform(scrollYProgress, [0.05, 0.25], [0.97, 1])
  const bioProgressScale = useTransform(bioProgress, [0, 1], [0, 1])

  return (
    <section ref={sectionRef} id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 xl:px-20">

        {/* Pull quote with terra vertical rule */}
        <motion.div
          style={reduced ? {} : { opacity: quoteOpacity, y: quoteY, scale: quoteScale }}
          className="mb-24 md:mb-36 max-w-5xl"
        >
          <p className="overline mb-8">About</p>
          <blockquote className="pull-quote-rule">
            <p className="editorial-quote text-[clamp(1.8rem,4vw,3.5rem)] text-cream-100 light:text-ink-800">
              &ldquo;{about.pullQuote}&rdquo;
            </p>
          </blockquote>
        </motion.div>

        {/* Split layout: portrait left, bio right */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[440px_1fr] gap-16 lg:gap-24">

          {/* Portrait with editorial frame */}
          <Reveal direction="left" className="relative">
            <div className="lg:sticky lg:top-28 max-lg:mb-8">
              <div className="portrait-editorial portrait-frame relative aspect-[3/4] w-full max-w-sm mx-auto lg:mx-0">
                <Image
                  src="/profile.jpg"
                  alt="Emmanuel Nene Odjidja"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 340px, 440px"
                  quality={85}
                />
              </div>
              {/* Caption like a journal contributor */}
              <p className="mt-4 text-[0.7rem] uppercase tracking-[0.18em] font-semibold text-ink-500 text-center lg:text-left light:text-ink-400">
                Emmanuel Nene Odjidja
              </p>
              <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-ink-600 text-center lg:text-left light:text-ink-400">
                M&E Specialist &middot; Researcher &middot; Epidemiologist
              </p>
            </div>
          </Reveal>

          {/* Bio with reading progress */}
          <div className="lg:pt-4 relative" ref={bioRef}>
            {/* Local reading progress line */}
            <motion.div
              className="hidden lg:block absolute left-[-2rem] top-0 w-[2px] bg-terra-500/60"
              style={reduced ? { height: '100%' } : { scaleY: bioProgressScale, transformOrigin: 'top' }}
            />

            <StaggerContainer className="space-y-6">
              {about.bio.map((para, i) => (
                <StaggerItem key={i}>
                  <p className="text-[1.0625rem] leading-[1.85] text-ink-300 light:text-ink-600">
                    {para}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Credentials grid — 3 columns */}
            <Reveal delay={0.1} className="mt-16">
              <div className="hr mb-10" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                <div>
                  <p className="overline mb-3">Education</p>
                  <p className="text-body-sm text-cream-200 font-medium light:text-ink-700">
                    {about.education}
                  </p>
                  <div className="mt-4 h-px bg-ink-800/40 light:bg-cream-300/40" />
                </div>
                <div>
                  <p className="overline mb-3">Languages</p>
                  <p className="text-body-sm text-cream-200 font-medium light:text-ink-700">
                    {about.languages.join('  \u00B7  ')}
                  </p>
                  <div className="mt-4 h-px bg-ink-800/40 light:bg-cream-300/40" />
                </div>
                <div>
                  <p className="overline mb-3">Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {about.expertise.map((tag) => (
                      tag.tooltip ? (
                        <Tooltip key={tag.label} content={tag.tooltip}>
                          <span className="border border-ink-700/60 text-ink-300 px-3 py-1.5 text-[0.8rem] tracking-wide hover:border-terra-500/50 hover:text-terra-400 transition-all duration-400 cursor-default light:border-cream-300 light:text-ink-600 light:hover:text-terra-600">
                            {tag.label}
                          </span>
                        </Tooltip>
                      ) : (
                        <span
                          key={tag.label}
                          className="border border-ink-700/60 text-ink-300 px-3 py-1.5 text-[0.8rem] tracking-wide hover:border-terra-500/50 hover:text-terra-400 transition-all duration-400 cursor-default light:border-cream-300 light:text-ink-600 light:hover:text-terra-600"
                        >
                          {tag.label}
                        </span>
                      )
                    ))}
                  </div>
                  <div className="mt-4 h-px bg-ink-800/40 light:bg-cream-300/40" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  )
}
