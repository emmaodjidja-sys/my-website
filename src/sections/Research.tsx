import { siteContent } from '@/lib/content'
import { Strip } from '@/components/Strip'
import { IcardImage } from '@/components/IcardImage'

export function Research() {
  return (
    <Strip
      id="research"
      label="Selected research"
      desc="Working analyses and field briefs across the Sahel and Mopti regions. Swipe right."
      seeAll={{ label: 'All research', href: '#publications' }}
    >
      {siteContent.research.map((item) => (
        <IcardImage
          key={item.slug}
          href={item.href}
          image={item.image}
          alt={item.alt}
          meta={`${item.source} · ${item.region}`}
          title={item.title}
          year={item.year}
          tag={item.tag}
          tall={item.tall}
        />
      ))}
    </Strip>
  )
}
