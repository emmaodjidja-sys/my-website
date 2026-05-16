import type { Metadata } from 'next'
import { siteContent } from '@/lib/content'
import { Marquee } from '@/components/Marquee'
import { Nameplate } from '@/components/Nameplate'
import { Nav } from '@/components/Nav'
import { Colophon } from '@/components/Colophon'
import { WritingClient } from './WritingClient'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Commentary, reflection, and field notes on global health, evaluation, and international development.',
}

export default function WritingPage() {
  return (
    <>
      <Marquee items={siteContent.marquee} />
      <Nameplate issue="No. 04 · May 2026" />
      <Nav current="Writing" />
      <main id="main">
        <WritingClient />
      </main>
      <Colophon />
    </>
  )
}
