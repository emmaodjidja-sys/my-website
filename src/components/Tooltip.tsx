'use client'

import { useState, useId, ReactNode } from 'react'

interface TooltipProps {
  content: string
  children: ReactNode
}

export function Tooltip({ content, children }: TooltipProps) {
  const [show, setShow] = useState(false)
  const id = useId()

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      tabIndex={0}
      aria-describedby={show ? id : undefined}
    >
      {children}
      {show && (
        <span
          id={id}
          role="tooltip"
          className="tooltip bg-ink-800 text-cream-200 border border-ink-700/60 light:bg-cream-100 light:text-ink-800 light:border-cream-300"
        >
          {content}
        </span>
      )}
    </span>
  )
}
