import { siteContent } from '@/lib/content'
import { Strip } from '@/components/Strip'
import { IcardImage } from '@/components/IcardImage'

const THEME_TAG: Record<string, string> = {
  'Infectious Disease': 'Health',
  'Nutrition': 'Nutrition',
  'Maternal & Child Health': 'Maternal',
  'Health Financing': 'Financing',
  'Health Systems': 'Health',
}

export function Publications() {
  const withCovers = siteContent.publications.filter((p) => p.cover)
  return (
    <Strip
      id="publications"
      label="Publications"
      desc="Peer-reviewed work, 2017 to 2025. Swipe right."
      seeAll={{ label: 'All 29', href: '/publications' }}
    >
      {withCovers.map((p) => (
        <IcardImage
          key={p.title}
          href={p.url}
          image={p.cover as string}
          alt={`${p.journal}, ${p.year}`}
          meta={`${p.journal} · ${p.year}`}
          title={p.title}
          year={p.year}
          tag={THEME_TAG[p.theme] ?? 'Health'}
        />
      ))}
    </Strip>
  )
}
