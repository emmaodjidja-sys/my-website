import { siteContent } from '@/lib/content'
import { Strip } from '@/components/Strip'
import { IcardText } from '@/components/IcardText'

const PUB_TAG: Record<string, string> = {
  'Commentary': 'Feature',
  'Reflection': 'Essay',
  'Analysis': 'Essay',
  'Field Note': 'Note',
  'GCERF': 'Report',
  'Open Source': 'Code',
  'Editorial': 'Essay',
  'Think Global Health (CFR)': 'Analysis',
}

export function Writing() {
  return (
    <Strip
      id="writing"
      label="Writing"
      desc="Long-form commentary, reflection, and field notes."
      seeAll={{ label: 'All writing', href: '/writing' }}
    >
      {siteContent.writing.map((w) => (
        <IcardText
          key={w.title}
          href={w.url ?? undefined}
          meta={`${w.publication} · ${w.year}`}
          title={w.title}
          year={w.year}
          tag={PUB_TAG[w.publication] ?? 'Essay'}
          wide
        />
      ))}
    </Strip>
  )
}
