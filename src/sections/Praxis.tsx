'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion'
import { siteContent } from '@/lib/content'
import { Reveal } from '@/components/Reveal'
import { PraxisChart } from '@/components/PraxisChart'

const { praxisBeats, praxis } = siteContent

function AnimatedResultStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
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
    const duration = 2000
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

  return (
    <div ref={ref}>
      <span className="block font-serif text-[clamp(3rem,8vw,7rem)] font-bold leading-none tracking-tight text-terra-500">
        {count}<span>{suffix}</span>
      </span>
      <p className="mt-4 text-body text-ink-300 light:text-ink-600">{label}</p>
    </div>
  )
}

export function Praxis() {
  const ref = useRef<HTMLElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInView = useInView(chartRef, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  const problemBeat = praxisBeats.find(b => b.id === 'problem')!
  const approachBeat = praxisBeats.find(b => b.id === 'approach')!
  const practiceBeat = praxisBeats.find(b => b.id === 'practice')!
  const resultBeat = praxisBeats.find(b => b.id === 'result')!

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

        {/* Beat 1: The Problem */}
        <Reveal delay={0.15} className="mt-24 md:mt-32">
          <h3 className="overline mb-6">{problemBeat.heading}</h3>
          <p className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.3] text-cream-100 max-w-3xl light:text-ink-800">
            {problemBeat.content}
          </p>
        </Reveal>

        {/* Beat 2: The Approach */}
        <Reveal className="mt-20 md:mt-28">
          <h3 className="overline mb-6">{approachBeat.heading}</h3>
          <p className="text-body text-ink-300 max-w-2xl mb-8 light:text-ink-600">
            {approachBeat.content}
          </p>
          {approachBeat.capabilities && (
            <div className="space-y-3 max-w-2xl">
              {approachBeat.capabilities.map((cap) => (
                <p key={cap} className="text-body-sm text-ink-300 pl-6 relative light:text-ink-600">
                  <span className="absolute left-0 text-terra-500 font-medium">&mdash;</span>
                  {cap}
                </p>
              ))}
            </div>
          )}
        </Reveal>

        {/* Beat 3: In Practice */}
        <Reveal className="mt-20 md:mt-28">
          <h3 className="overline mb-6">{practiceBeat.heading}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <p className="text-body text-ink-300 light:text-ink-600">
              {practiceBeat.content}
            </p>
            <div ref={chartRef}>
              {practiceBeat.chart && (
                <PraxisChart data={practiceBeat.chart} inView={chartInView} />
              )}
            </div>
          </div>
        </Reveal>

        {/* Beat 4: The Result */}
        <Reveal className="mt-20 md:mt-28">
          <h3 className="overline mb-8">{resultBeat.heading}</h3>
          {resultBeat.stat && (
            <AnimatedResultStat
              value={resultBeat.stat.value}
              suffix={resultBeat.stat.suffix}
              label={resultBeat.stat.label}
            />
          )}
          <p className="mt-6 text-body text-ink-300 max-w-xl light:text-ink-600">
            {resultBeat.content}
          </p>
        </Reveal>

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
