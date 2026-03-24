'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { siteContent } from '@/lib/content'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Pagination } from '@/components/Pagination'

const { writing } = siteContent
const allPublications = Array.from(new Set(writing.map(w => w.publication)))
const PER_PAGE = 10

export function WritingClient() {
  const [search, setSearch] = useState('')
  const [activeOutlet, setActiveOutlet] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return writing.filter(piece => {
      const matchOutlet = activeOutlet === 'All' || piece.publication === activeOutlet
      const q = search.toLowerCase().trim()
      const matchSearch = !q ||
        piece.title.toLowerCase().includes(q) ||
        piece.description.toLowerCase().includes(q) ||
        piece.publication.toLowerCase().includes(q)
      return matchOutlet && matchSearch
    })
  }, [search, activeOutlet])

  const featured = filtered.find(w => w.featured)
  const rest = filtered.filter(w => w !== featured)

  const totalPages = Math.ceil(rest.length / PER_PAGE)
  const paginated = rest.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const clearFilters = () => {
    setSearch('')
    setActiveOutlet('All')
    setPage(1)
  }

  return (
    <div className="min-h-screen">
      {/* Minimal header */}
      <header className="sticky top-0 z-50 bg-ink-900/80 backdrop-blur-xl border-b border-ink-800/50 light:bg-cream-50/80 light:border-cream-300/50">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 xl:px-20 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[0.85rem] font-medium text-ink-400 hover:text-terra-500 transition-colors light:text-ink-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back
          </Link>
          <h1 className="font-serif text-[1rem] font-semibold text-cream-100 light:text-ink-800">Writing</h1>
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
              placeholder="Search writing..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              className="w-full bg-transparent border-b border-ink-700 pl-10 pr-4 py-3 text-body-sm text-cream-200 placeholder:text-ink-500 focus:border-terra-500 focus:outline-none transition-colors duration-500 light:border-cream-300 light:text-ink-800 light:focus:border-terra-500"
            />
          </div>

          {/* Outlet pills */}
          <div className="flex flex-wrap gap-2">
            {['All', ...allPublications].map(outlet => (
              <button
                key={outlet}
                onClick={() => { setActiveOutlet(outlet); setPage(1) }}
                className={`px-3.5 py-2 text-[0.75rem] font-medium tracking-wide transition-all duration-400 ${
                  activeOutlet === outlet
                    ? 'bg-terra-500 text-cream-50'
                    : 'text-ink-400 hover:text-terra-400 light:text-ink-500'
                }`}
              >
                {outlet}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-caption text-ink-500 mb-8 light:text-ink-400">
          Showing {filtered.length} of {writing.length} pieces
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeOutlet}-${search}-${page}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Featured piece */}
            {featured && (
              <div className="border-t-2 border-terra-500 py-12 md:py-16 mb-4">
                <div className="max-w-3xl">
                  <p className="overline mb-4">{featured.publication}</p>
                  <h3 className="font-serif text-[clamp(1.6rem,3.5vw,2.8rem)] font-semibold leading-tight tracking-[-0.02em] text-cream-100 light:text-ink-800">
                    {featured.title}
                  </h3>
                  <p className="mt-4 text-body-sm text-ink-300 leading-relaxed max-w-xl light:text-ink-600">
                    {featured.description}
                  </p>
                  {featured.url && (
                    <a href={featured.url} target="_blank" rel="noopener noreferrer" className="arrow-link mt-5 inline-flex">
                      Read
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Compact rows */}
            {paginated.map((post, i) => {
              const Tag = post.url ? 'a' : 'div'
              const linkProps = post.url ? { href: post.url, target: '_blank' as const, rel: 'noopener noreferrer' } : {}

              return (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Tag
                    {...linkProps}
                    className="group block border-b border-ink-800/50 light:border-cream-300/50 py-8 md:py-10 hover:bg-terra-500/[0.03] transition-colors duration-300"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_60px] gap-3 md:gap-8 items-start">
                      <div className="flex items-center gap-3 md:block">
                        <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] font-semibold text-terra-500/70">
                          {post.year}
                        </span>
                        <span className="text-caption italic text-ink-600 md:mt-1 md:block light:text-ink-400">{post.publication}</span>
                      </div>
                      <div>
                        <h3 className="font-serif text-[clamp(1.15rem,1.8vw,1.4rem)] font-semibold leading-tight text-cream-100 group-hover:text-terra-400 transition-colors duration-400 light:text-ink-800 light:group-hover:text-terra-600">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-body-sm text-ink-300 leading-relaxed light:text-ink-600 line-clamp-2">
                          {post.description}
                        </p>
                      </div>
                      {post.url && (
                        <div className="hidden md:flex justify-end pt-1">
                          <svg
                            className="w-4 h-4 text-ink-600 group-hover:text-terra-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                          >
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </Tag>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-ink-500 text-body light:text-ink-400">No writing pieces match your search.</p>
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
    </div>
  )
}
