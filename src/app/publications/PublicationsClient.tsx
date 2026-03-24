'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { siteContent } from '@/lib/content'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Pagination } from '@/components/Pagination'
import { Toast } from '@/components/Toast'
import type { Publication } from '@/lib/types'

const { publications } = siteContent
const allThemes = Array.from(new Set(publications.map(p => p.theme)))
const allYears = Array.from(new Set(publications.map(p => p.year))).sort((a, b) => b - a)
const PER_PAGE = 15

function formatAPA(pub: Publication): string {
  return `${pub.authors} (${pub.year}). ${pub.title}. ${pub.journal}.`
}

export function PublicationsClient() {
  const [search, setSearch] = useState('')
  const [activeTheme, setActiveTheme] = useState('All')
  const [activeYear, setActiveYear] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [toastVisible, setToastVisible] = useState(false)

  const filtered = useMemo(() => {
    return publications.filter(pub => {
      const matchTheme = activeTheme === 'All' || pub.theme === activeTheme
      const matchYear = !activeYear || pub.year === activeYear
      const q = search.toLowerCase().trim()
      const matchSearch = !q ||
        pub.title.toLowerCase().includes(q) ||
        pub.authors.toLowerCase().includes(q) ||
        pub.journal.toLowerCase().includes(q)
      return matchTheme && matchYear && matchSearch
    })
  }, [search, activeTheme, activeYear])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const clearFilters = () => {
    setSearch('')
    setActiveTheme('All')
    setActiveYear(null)
    setPage(1)
  }

  const handleCopy = useCallback(async (pub: Publication) => {
    try {
      await navigator.clipboard.writeText(formatAPA(pub))
      setToastVisible(true)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = formatAPA(pub)
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setToastVisible(true)
    }
  }, [])

  const dismissToast = useCallback(() => setToastVisible(false), [])

  return (
    <div className="min-h-screen">
      {/* Minimal header */}
      <header className="sticky top-0 z-50 bg-ink-900/80 backdrop-blur-xl border-b border-ink-800/50 light:bg-cream-50/80 light:border-cream-300/50">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 xl:px-20 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[0.85rem] font-medium text-ink-400 hover:text-terra-500 transition-colors light:text-ink-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back
          </Link>
          <h1 className="font-serif text-[1rem] font-semibold text-cream-100 light:text-ink-800">Publications</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 xl:px-20 py-16 md:py-24">
        {/* Search + Filters */}
        <div className="mb-12 space-y-6">
          <div className="relative w-full max-w-sm">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input
              type="text"
              placeholder="Search publications..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              className="w-full bg-transparent border-b border-ink-700 pl-10 pr-4 py-3 text-body-sm text-cream-200 placeholder:text-ink-500 focus:border-terra-500 focus:outline-none transition-colors duration-500 light:border-cream-300 light:text-ink-800 light:focus:border-terra-500"
            />
          </div>

          {/* Theme pills */}
          <div className="flex flex-wrap gap-2">
            {['All', ...allThemes].map(theme => (
              <button
                key={theme}
                onClick={() => { setActiveTheme(theme); setPage(1) }}
                className={`px-3.5 py-2 text-[0.75rem] font-medium tracking-wide transition-all duration-400 ${
                  activeTheme === theme
                    ? 'bg-terra-500 text-cream-50'
                    : 'text-ink-400 hover:text-terra-400 light:text-ink-500'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>

          {/* Year tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setActiveYear(null); setPage(1) }}
              className={`px-3 py-1.5 text-[0.7rem] font-medium tracking-wide transition-all duration-300 ${
                !activeYear ? 'text-terra-500 border-b border-terra-500' : 'text-ink-500 hover:text-ink-300 light:hover:text-ink-700'
              }`}
            >
              All Years
            </button>
            {allYears.map(year => (
              <button
                key={year}
                onClick={() => { setActiveYear(year); setPage(1) }}
                className={`px-3 py-1.5 text-[0.7rem] font-mono font-medium tracking-wide transition-all duration-300 ${
                  activeYear === year ? 'text-terra-500 border-b border-terra-500' : 'text-ink-500 hover:text-ink-300 light:hover:text-ink-700'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-caption text-ink-500 mb-8 light:text-ink-400">
          Showing {filtered.length} of {publications.length} publications
        </p>

        {/* Publication list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTheme}-${activeYear}-${search}-${page}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {paginated.map((pub, i) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group border-b border-ink-800/50 py-6 md:py-8 light:border-cream-300/50"
              >
                <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_220px] gap-2 md:gap-8 items-start">
                  <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] font-semibold text-terra-500/70 md:pt-1.5">
                    {pub.year}
                  </span>
                  <div>
                    {pub.url ? (
                      <a href={pub.url} target="_blank" rel="noopener noreferrer" className="group/link">
                        <h3 className="font-serif text-[clamp(1.05rem,1.5vw,1.25rem)] font-semibold leading-snug text-cream-100 group-hover/link:text-terra-400 transition-colors duration-400 light:text-ink-800 light:group-hover/link:text-terra-600">
                          {pub.title}
                        </h3>
                      </a>
                    ) : (
                      <h3 className="font-serif text-[clamp(1.05rem,1.5vw,1.25rem)] font-semibold leading-snug text-cream-100 light:text-ink-800">
                        {pub.title}
                      </h3>
                    )}
                    <p className="mt-1.5 text-caption text-ink-500 light:text-ink-400">
                      <span className="italic">{pub.journal}</span> &middot; {pub.authors}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 md:justify-end md:pt-1.5">
                    <span className="text-[0.65rem] uppercase tracking-[0.14em] text-ink-500 light:text-ink-400 hidden md:inline px-2 py-0.5 border border-ink-800/30 light:border-cream-300/50">
                      {pub.theme}
                    </span>
                    <button
                      onClick={() => handleCopy(pub)}
                      className="text-[0.7rem] font-medium text-ink-500 hover:text-terra-500 transition-colors duration-300 light:text-ink-400"
                      title="Copy APA citation"
                    >
                      Cite
                    </button>
                    {pub.url && (
                      <a href={pub.url} target="_blank" rel="noopener noreferrer">
                        <svg
                          className="w-4 h-4 text-ink-600 hover:text-terra-500 transition-all duration-300 hover:translate-x-0.5 hover:-translate-y-0.5"
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        >
                          <path d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-ink-500 text-body light:text-ink-400">No publications match your search.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-caption text-terra-500 hover:text-terra-400 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </main>

      <Toast message="Citation copied to clipboard" visible={toastVisible} onDismiss={dismissToast} />
    </div>
  )
}
