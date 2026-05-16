import Link from 'next/link'
import { Marquee } from '@/components/Marquee'
import { Nameplate } from '@/components/Nameplate'
import { Nav } from '@/components/Nav'
import { Colophon } from '@/components/Colophon'
import { siteContent } from '@/lib/content'

interface ArticleLayoutProps {
  title: string
  publication: string
  year: number
  children: React.ReactNode
}

export function ArticleLayout({ title, publication, year, children }: ArticleLayoutProps) {
  return (
    <>
      <Marquee items={siteContent.marquee} />
      <Nameplate issue="No. 04 · May 2026" />
      <Nav current="Writing" />
      <main id="main">
        <article className="article-route">
          <p className="article-meta">{publication} &middot; {year}</p>
          <h1>{title}</h1>
          <div className="body">
            {children}
          </div>
          <Link className="back-link" href="/writing">Back to writing</Link>
        </article>
      </main>
      <Colophon />
    </>
  )
}
