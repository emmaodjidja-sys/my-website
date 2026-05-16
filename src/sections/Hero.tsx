'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { siteContent } from '@/lib/content'

const { hero } = siteContent

function AnimatedStat({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(value)
  const [triggered, setTriggered] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) { setCount(value); setTriggered(true); return }
    setCount(0)
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !triggered) setTriggered(true) },
      { threshold: 0.5 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [reduced, triggered, value])

  useEffect(() => {
    if (!triggered || reduced) return
    let frame: number
    const start = performance.now()
    const duration = 1400
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * value))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [triggered, value, reduced])

  return (
    <div ref={ref} className="relative bg-ink-850/50 border border-ink-800/30 p-4 lg:p-5 light:bg-cream-100/60 light:border-cream-300/50">
      <span className="block font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none tracking-tight text-cream-50 tabular-nums light:text-ink-900">
        {count}<span className="text-terra-500">{suffix}</span>
      </span>
      <span className="block mt-2 text-[0.6rem] uppercase tracking-[0.22em] font-semibold text-ink-300 light:text-ink-500">
        {label}
      </span>
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-terra-500"
        initial={false}
        animate={{ width: triggered ? '100%' : 0 }}
        transition={{ duration: 1.4, delay: 0.2 + index * 0.08, ease: [0.25, 1, 0.5, 1] }}
      />
    </div>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={sectionRef} className="relative min-h-dvh overflow-hidden">
      {/* Static atmospheric background; no breathing */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#1f1520,#0e0e14_70%)] light:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#f5efe5,#fefcf8_70%)]" />

      <div className="relative z-10 mx-auto max-w-[90rem] min-h-dvh grid grid-cols-1 lg:grid-cols-[1fr_42%] xl:grid-cols-[1fr_45%]">
        {/* Text column, SSR-visible. Subtle opacity fade on scroll only. */}
        <motion.div
          style={reduced ? {} : { opacity: textOpacity }}
          className="flex flex-col justify-end px-6 sm:px-10 lg:px-16 xl:px-20 pb-16 lg:pb-24 pt-28 lg:pt-0"
        >
          <div>
            <p className="overline mb-8">
              {hero.titles.join('  ·  ')}
            </p>

            {/* Name renders immediately, no entrance animation */}
            <h1>
              <span className="block font-serif text-[clamp(3.2rem,8.5vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em] text-cream-50 text-balance light:text-ink-900">
                Emmanuel
              </span>
              <span className="block font-serif text-[clamp(3.2rem,8.5vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em] text-cream-50 text-balance light:text-ink-900">
                Nene
              </span>
              <span className="block font-serif text-[clamp(3.2rem,8.5vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em] text-terra-500 text-balance">
                Odjidja
              </span>
              {/* Underline grows in once: the only entrance flourish */}
              <motion.span
                aria-hidden="true"
                className="block h-[3px] bg-terra-500 mt-1 origin-left"
                initial={reduced ? { scaleX: 0.7 } : { scaleX: 0 }}
                animate={{ scaleX: 0.7 }}
                transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </h1>

            <p className="mt-10 text-[clamp(1.1rem,1.8vw,1.35rem)] leading-relaxed text-pretty text-cream-200/90 max-w-xl font-light light:text-ink-700">
              {hero.tagline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#publications"
                className="group inline-flex items-center gap-2.5 bg-terra-500 text-cream-50 px-7 py-4 text-[0.9rem] font-medium tracking-wide hover:bg-terra-600 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream-50/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 active:scale-[0.98]"
              >
                Read the Research
                <svg aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[0.9rem] text-cream-200 hover:text-terra-500 transition-colors duration-150 font-medium light:text-ink-700"
              >
                Write to Me
                <span aria-hidden="true" className="w-8 h-px bg-current" />
              </a>
            </div>

            <div className="mt-16 lg:mt-20 grid grid-cols-3 gap-3 md:gap-4 max-w-lg">
              {hero.stats.map((stat, i) => (
                <AnimatedStat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} index={i} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Portrait column, parallax only, no entrance animation */}
        <div className="relative hidden lg:block">
          <motion.div
            style={reduced ? {} : { y: portraitY }}
            className="absolute inset-0"
          >
            <div aria-hidden="true" className="absolute inset-[-5px] z-20 pointer-events-none border border-terra-500/50" />
            <div className="portrait-frame duotone absolute inset-0">
              <Image
                src="/profile.JPG"
                alt="Emmanuel Nene Odjidja, Geneva 2025"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 1024px) 0px, 45vw"
                quality={90}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
