'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { siteContent } from '@/lib/content'
import { Pagination } from '@/components/Pagination'

const { writing } = siteContent
const allPublications = Array.from(new Set(writing.map((w) => w.publication)))
const PER_PAGE = 10

export function WritingClient() {
  const [search, setSearch] = useState('')
  const [activeOutlet, setActiveOutlet] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return writing.filter((piece) => {
      const matchOutlet = activeOutlet === 'All' || piece.publication === activeOutlet
      const q = search.toLowerCase().trim()
      const matchSearch =
        !q ||
        piece.title.toLowerCase().includes(q) ||
        piece.description.toLowerCase().includes(q) ||
        piece.publication.toLowerCase().includes(q)
      return matchOutlet && matchSearch
    })
  }, [search, activeOutlet])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const clearFilters = () => {
    setSearch('')
    setActiveOutlet('All')
    setPage(1)
  }

  return (
    <div className="route-main">
      <header className="route-head">
        <h1>Writing</h1>
        <p className="desc">
          {filtered.length} of {writing.length} pieces. Commentary, reflection, and field notes on evaluation, global health, and the climate-conflict-food-insecurity nexus.
        </p>
      </header>

      <div className="route-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search writing"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          aria-label="Search writing"
        />
        <div className="filters" aria-label="Filter by outlet">
          {['All', ...allPublications].map((outlet) => (
            <button
              key={outlet}
              type="button"
              className={`chip${activeOutlet === outlet ? ' on' : ''}`}
              onClick={() => { setActiveOutlet(outlet); setPage(1) }}
              aria-pressed={activeOutlet === outlet}
            >
              {outlet}
            </button>
          ))}
        </div>
      </div>

      {paginated.length > 0 ? (
        <ul className="row-list">
          {paginated.map((post) => {
            const isInternal = post.url?.startsWith('/')
            return (
              <li key={post.title} className="write-row">
                <span className="y">{post.year}</span>
                <div>
                  {post.url ? (
                    isInternal ? (
                      <Link className="title" href={post.url}>{post.title}</Link>
                    ) : (
                      <a className="title" href={post.url} target="_blank" rel="noopener noreferrer">{post.title}</a>
                    )
                  ) : (
                    <span className="title">{post.title}</span>
                  )}
                  <span className="cite">{post.description}</span>
                </div>
                <span className="tag">{post.publication}</span>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="empty-state">
          <p>No writing pieces match your filters.</p>
          <button type="button" className="clear" onClick={clearFilters}>Clear filters</button>
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}
