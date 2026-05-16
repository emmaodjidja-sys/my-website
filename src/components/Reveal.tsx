'use client'

import { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  // Kept for compatibility with existing call-sites but no longer animates.
  // Editorial decision: the page renders fully visible. Motion is reserved for
  // purposeful, scroll-linked moments (parallax portrait, stat counters).
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  distance?: number
}

export function Reveal({ children, className = '' }: RevealProps) {
  return <div className={className}>{children}</div>
}

export function StaggerContainer({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  return <div className={className}>{children}</div>
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={className}>{children}</div>
}
