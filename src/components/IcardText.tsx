import type { ReactNode } from 'react'

interface IcardTextProps {
  href?: string
  meta: string
  title: string
  year?: number | string
  tag?: string
  wide?: boolean
  children?: ReactNode
}

export function IcardText({
  href,
  meta,
  title,
  year,
  tag,
  wide,
  children,
}: IcardTextProps) {
  const className = `card${wide ? ' wide' : ''}`
  const inner = (
    <>
      <div className="card-cover">
        <span className="card-meta">{meta}</span>
        <span className="card-title">{title}</span>
        {children}
      </div>
      {(year !== undefined || tag) && (
        <div className="card-foot">
          {year !== undefined ? <span className="card-yr">{year}</span> : <span />}
          {tag ? <span className="card-tag">{tag}</span> : <span />}
        </div>
      )}
    </>
  )

  if (href) {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        className={className}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {inner}
      </a>
    )
  }
  return <article className={className}>{inner}</article>
}
