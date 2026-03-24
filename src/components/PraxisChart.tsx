'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { PraxisChartData } from '@/lib/types'

interface PraxisChartProps {
  data: PraxisChartData
  inView: boolean
}

export function PraxisChart({ data, inView }: PraxisChartProps) {
  const reduced = useReducedMotion()
  const maxValue = 5

  return (
    <div className="space-y-6">
      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-ink-500 light:text-ink-400">
        Illustrative data
      </p>
      <div className="space-y-5">
        {data.dimensions.map((dim, i) => (
          <div key={dim} className="space-y-2">
            <div className="flex justify-between text-caption text-ink-400 light:text-ink-500">
              <span>{dim}</span>
              <span>{data.before[i].toFixed(1)} &rarr; {data.after[i].toFixed(1)}</span>
            </div>
            <div className="relative h-3 bg-ink-800/50 light:bg-cream-200">
              {/* After bar (behind, wider, darker) */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-terra-500"
                initial={{ width: 0 }}
                animate={inView ? { width: `${(data.after[i] / maxValue) * 100}%` } : {}}
                transition={reduced ? { duration: 0 } : { duration: 1, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Before bar (on top, shorter, lighter) */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-terra-500/30"
                initial={{ width: 0 }}
                animate={inView ? { width: `${(data.before[i] / maxValue) * 100}%` } : {}}
                transition={reduced ? { duration: 0 } : { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-6 text-[0.7rem] text-ink-500 light:text-ink-400">
        <span className="flex items-center gap-2">
          <span className="w-3 h-2 bg-terra-500/30 inline-block" /> Before PRAXIS
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-2 bg-terra-500 inline-block" /> After PRAXIS
        </span>
      </div>
    </div>
  )
}
