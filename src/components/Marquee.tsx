import { Fragment } from 'react'
import type { MarqueeItem } from '@/lib/types'

interface MarqueeProps {
  items: MarqueeItem[]
  label?: string
}

export function Marquee({ items, label = 'Currently working on' }: MarqueeProps) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee" aria-label={label}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <Fragment key={i}>
            <span>
              <strong>{item.label}</strong> &middot;{' '}
              {item.href ? <a href={item.href}>{item.text}</a> : item.text}
            </span>
            <span className="dot" aria-hidden="true">&middot;</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
