import type { ReactNode } from 'react'

interface SeeAll {
  label: string
  href: string
}

interface StripProps {
  id?: string
  label: string
  desc?: string
  seeAll?: SeeAll
  children: ReactNode
  ariaLabel?: string
}

export function Strip({ id, label, desc, seeAll, children, ariaLabel }: StripProps) {
  return (
    <section
      id={id}
      className="strip"
      aria-label={ariaLabel ?? label}
    >
      <div className="strip-head">
        <h2>{label}</h2>
        {desc ? <div className="desc">{desc}</div> : <div />}
        {seeAll ? (
          <a className="see-all" href={seeAll.href}>{seeAll.label}</a>
        ) : <div />}
      </div>
      <div className="carousel" tabIndex={0}>
        {children}
      </div>
    </section>
  )
}
