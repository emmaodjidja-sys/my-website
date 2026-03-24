'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'

interface ArticleLayoutProps {
  title: string
  publication: string
  year: number
  children: React.ReactNode
}

export function ArticleLayout({ title, publication, year, children }: ArticleLayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-ink-900/80 backdrop-blur-xl border-b border-ink-800/50 light:bg-cream-50/80 light:border-cream-300/50">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 xl:px-20 h-14 flex items-center justify-between">
          <Link href="/#writing" className="flex items-center gap-2 text-[0.85rem] font-medium text-ink-400 hover:text-terra-500 transition-colors light:text-ink-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <article className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 xl:px-20 py-16 md:py-24">
        <div className="max-w-prose mx-auto">
          <p className="overline mb-4">{publication} &middot; {year}</p>
          <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-cream-50 light:text-ink-900 mb-12">
            {title}
          </h1>
          <div className="prose-editorial space-y-6 text-[1.0625rem] leading-[1.85] text-ink-300 light:text-ink-600">
            {children}
          </div>
        </div>
      </article>
    </div>
  )
}
