import { siteContent } from '@/lib/content'
import { Strip } from '@/components/Strip'
import { IcardText } from '@/components/IcardText'

export function Praxis() {
  const { praxis } = siteContent
  return (
    <Strip
      id="praxis"
      label="PRAXIS"
      desc="Open-source programme-evaluation infrastructure. Launching at Glocal Evaluation Week, 3 June 2026."
      seeAll={{ label: 'Project', href: praxis.url }}
    >
      <IcardText
        href={praxis.url}
        meta="Toolkit · v1.0"
        title="Programme evaluation toolkit. Browser-based, open-source, runs on your machine with zero data transmission."
        year={2026}
        tag="Tool"
        wide
      />
      <IcardText
        href={praxis.url}
        meta="EWS · Research"
        title="Conflict early warning. Econometric research using ACLED data, stacked event-study design for VE prediction in the Sahel."
        year={2026}
        tag="Conflict"
        wide
      />
      <IcardText
        href={praxis.github}
        meta="Source · Code"
        title="Open-source repository for the PRAXIS toolkit and EWS research code. Apache-2.0."
        year={2026}
        tag="Code"
        wide
      />
    </Strip>
  )
}
