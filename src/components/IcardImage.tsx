interface IcardImageProps {
  href?: string
  image: string
  alt: string
  meta: string
  title: string
  year: number | string
  tag: string
  tall?: boolean
}

export function IcardImage({
  href,
  image,
  alt,
  meta,
  title,
  year,
  tag,
  tall,
}: IcardImageProps) {
  const className = `icard${tall ? ' tall' : ''}`
  const inner = (
    <>
      <div className="icard-img">
        <img src={image} alt={alt} loading="lazy" decoding="async" />
      </div>
      <div className="icard-body">
        <span className="icard-meta">{meta}</span>
        <span className="icard-title">{title}</span>
        <span className="icard-foot">
          <span className="icard-yr">{year}</span>
          <span className="icard-tag">{tag}</span>
        </span>
      </div>
    </>
  )

  if (href) {
    return (
      <a className={className} href={href}>
        {inner}
      </a>
    )
  }
  return <article className={className}>{inner}</article>
}
