'use client'

import { useState, useMemo, useCallback } from 'react'
import { siteContent } from '@/lib/content'
import { Pagination } from '@/components/Pagination'
import { Toast } from '@/components/Toast'
import type { Publication } from '@/lib/types'

const { publications } = siteContent
const allThemes = Array.from(new Set(publications.map((p) => p.theme)))
const allYears = Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a)
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
    return publications.filter((pub) => {
      const matchTheme = activeTheme === 'All' || pub.theme === activeTheme
      const matchYear = !activeYear || pub.year === activeYear
      const q = search.toLowerCase().trim()
      const matchSearch =
        !q ||
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
    <div className="route-main">
      <header className="route-head">
        <h1>Publications</h1>
        <p className="desc">
          {filtered.length} of {publications.length} peer-reviewed articles, 2017 to 2025. Cite as APA, or follow the link to the publisher.
        </p>
      </header>

      <div className="route-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search title, authors, journal"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          aria-label="Search publications"
        />
        <div className="filters" aria-label="Filter by theme">
          {['All', ...allThemes].map((theme) => (
            <button
              key={theme}
              type="button"
              className={`chip${activeTheme === theme ? ' on' : ''}`}
              onClick={() => { setActiveTheme(theme); setPage(1) }}
              aria-pressed={activeTheme === theme}
            >
              {theme}
            </button>
          ))}
        </div>
        <div className="filters" aria-label="Filter by year">
          <button
            type="button"
            className={`chip${activeYear === null ? ' on' : ''}`}
            onClick={() => { setActiveYear(null); setPage(1) }}
            aria-pressed={activeYear === null}
          >
            All years
          </button>
          {allYears.map((year) => (
            <button
              key={year}
              type="button"
              className={`chip${activeYear === year ? ' on' : ''}`}
              onClick={() => { setActiveYear(year); setPage(1) }}
              aria-pressed={activeYear === year}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {paginated.length > 0 ? (
        <ul className="row-list">
          {paginated.map((pub) => (
            <li key={pub.title} className="pub-row">
              <span className="y">{pub.year}</span>
              <div>
                {pub.url ? (
                  <a
                    className="title"
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pub.title}
                  </a>
                ) : (
                  <span className="title">{pub.title}</span>
                )}
                <span className="cite">
                  <em>{pub.journal}</em> &middot; {pub.authors}
                </span>
              </div>
              <span className="tag">{pub.theme}</span>
              <button
                type="button"
                className="action"
                onClick={() => handleCopy(pub)}
                title="Copy APA citation"
              >
                Cite
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <p>No publications match your filters.</p>
          <button type="button" className="clear" onClick={clearFilters}>Clear filters</button>
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <Toast message="Citation copied to clipboard" visible={toastVisible} onDismiss={dismissToast} />
    </div>
  )
}
