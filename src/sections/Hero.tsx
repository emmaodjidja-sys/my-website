'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { siteContent } from '@/lib/content'

const { hero } = siteContent

function AnimatedStat({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !triggered) setTriggered(true) },
      { threshold: 0.5 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [triggered])

  useEffect(() => {
    if (!triggered) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(value)
      return
    }
    let frame: number
    const start = performance.now()
    const duration = 2200
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * value))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [triggered, value])

  const fillProgress = triggered ? 1 : 0

  return (
    <div ref={ref} className="relative bg-ink-850/50 border border-ink-800/30 p-4 lg:p-5 light:bg-cream-100/60 light:border-cream-300/50">
      <span className="block font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none tracking-tight text-cream-50 light:text-ink-900">
        {count}<span className="text-terra-500">{suffix}</span>
      </span>
      <span className="block mt-2 text-[0.6rem] uppercase tracking-[0.22em] font-semibold text-ink-400 light:text-ink-500">
        {label}
      </span>
      {/* Bottom border fill */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-terra-500"
        initial={{ width: 0 }}
        animate={{ width: triggered ? '100%' : 0 }}
        transition={{ duration: 2.2, delay: 0.35 + index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      />
    </div>
  )
}

// Word-by-word blur animation
function WordReveal({ word, index, color }: { word: string; index: number; color?: string }) {
  return (
    <motion.span
      className={`block font-serif text-[clamp(3.2rem,8.5vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em] ${color || 'text-cream-50 light:text-ink-900'}`}
      initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.6 + index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {word}
    </motion.span>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const { scrollY } = useScroll()

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  // Scroll cue fades out over first 100px of scroll
  const scrollCueOpacity = useTransform(scrollY, [0, 100], [1, 0])

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Background — breathing gradient */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#1f1520,#0e0e14_70%)] light:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#f5efe5,#fefcf8_70%)]"
        animate={reduced ? {} : { scale: [1, 1.02, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto max-w-[90rem] min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_42%] xl:grid-cols-[1fr_45%]">
        {/* Text column */}
        <motion.div
          style={reduced ? {} : { opacity: textOpacity }}
          className="flex flex-col justify-end px-6 sm:px-10 lg:px-16 xl:px-20 pb-16 lg:pb-24 pt-28 lg:pt-0"
        >
          <div>
            {/* Overline */}
            <motion.p
              className="overline mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {hero.titles.join('  \u00B7  ')}
            </motion.p>

            {/* Name — word-by-word blur reveal */}
            <h1>
              <WordReveal word="Emmanuel" index={0} />
              <WordReveal word="Nene" index={1} />
              <WordReveal word="Odjidja" index={2} color="text-terra-500" />
              {/* Decorative stroke under Odjidja */}
              <motion.span
                className="block h-[3px] bg-gradient-to-r from-terra-500 to-terra-500/0 mt-1"
                initial={{ width: 0 }}
                animate={{ width: '70%' }}
                transition={{ delay: 2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </h1>

            {/* Tagline */}
            <motion.p
              className="mt-10 text-[clamp(1.1rem,1.8vw,1.35rem)] leading-relaxed text-ink-300 max-w-md font-light light:text-ink-600"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {hero.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="#publications"
                className="group inline-flex items-center gap-2.5 bg-terra-500 text-cream-50 px-7 py-4 text-[0.9rem] font-medium tracking-wide hover:bg-terra-600 transition-all duration-500"
              >
                View Research
                <svg className="transition-transform duration-300 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[0.9rem] text-ink-300 hover:text-terra-500 transition-colors duration-300 font-medium light:text-ink-600"
              >
                Get in Touch
                <span className="w-8 h-px bg-current" />
              </a>
            </motion.div>

            {/* Stats — cards with filling bottom border */}
            <motion.div
              className="mt-16 lg:mt-20 grid grid-cols-3 gap-3 md:gap-4 max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {hero.stats.map((stat, i) => (
                <AnimatedStat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} index={i} />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Portrait column */}
        <div className="relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={reduced ? {} : { y: portraitY }}
            className="absolute inset-0"
          >
            {/* SVG frame that draws on load */}
            <motion.svg
              className="absolute inset-[-4px] z-20 pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <motion.rect
                x="0.5" y="0.5" width="99" height="99"
                fill="none"
                stroke="#c4653a"
                strokeWidth="0.4"
                strokeOpacity={0.6}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.5, duration: 2, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.svg>

            <div className="portrait-frame duotone absolute inset-0">
              <Image
                src="/profile.jpg"
                alt="Emmanuel Nene Odjidja"
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

      {/* Scroll indicator — vertical line + "Scroll" text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={reduced ? {} : { opacity: scrollCueOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[0.55rem] uppercase tracking-[0.3em] text-ink-500 font-medium">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-ink-500 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 2.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}
