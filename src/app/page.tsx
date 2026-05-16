import { siteContent } from '@/lib/content'
import { Marquee } from '@/components/Marquee'
import { Nameplate } from '@/components/Nameplate'
import { Nav } from '@/components/Nav'
import { Colophon } from '@/components/Colophon'
import { Leader } from '@/sections/Leader'
import { EditorsNote } from '@/sections/EditorsNote'
import { Research } from '@/sections/Research'
import { Publications } from '@/sections/Publications'
import { Writing } from '@/sections/Writing'
import { Praxis } from '@/sections/Praxis'
import { Experience } from '@/sections/Experience'
import { Contact } from '@/sections/Contact'

export default function Home() {
  return (
    <>
      <Marquee items={siteContent.marquee} />
      <Nameplate issue="No. 04 · May 2026" />
      <Nav current="Index" />
      <main id="main">
        <Leader />
        <EditorsNote />
        <Research />
        <Publications />
        <Writing />
        <Praxis />
        <Experience />
        <Contact />
      </main>
      <Colophon />
    </>
  )
}
