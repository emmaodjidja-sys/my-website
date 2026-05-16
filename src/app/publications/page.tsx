import type { Metadata } from 'next'
import { siteContent } from '@/lib/content'
import { Marquee } from '@/components/Marquee'
import { Nameplate } from '@/components/Nameplate'
import { Nav } from '@/components/Nav'
import { Colophon } from '@/components/Colophon'
import { PublicationsClient } from './PublicationsClient'

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Peer-reviewed research spanning infectious disease, nutrition, maternal health, health systems, and the climate-conflict nexus.',
}

export default function PublicationsPage() {
  return (
    <>
      <Marquee items={siteContent.marquee} />
      <Nameplate issue="No. 04 · May 2026" />
      <Nav current="Publications" />
      <main id="main">
        <PublicationsClient />
      </main>
      <Colophon />
    </>
  )
}
