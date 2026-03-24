'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  label: string
}

export function AnimatedCounter({ value, suffix = '', label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(value)
      return
    }

    const duration = 2000
    const steps = 50
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <div ref={ref} className="text-left">
      <span className="font-serif text-h1 font-bold text-terra-500">
        {count}{suffix}
      </span>
      <p className="text-overline uppercase tracking-[0.16em] text-ink-400 mt-1 light:text-ink-500">
        {label}
      </p>
    </div>
  )
}
