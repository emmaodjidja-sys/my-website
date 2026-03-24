'use client'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav className="flex items-center justify-center gap-2 mt-16" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-caption font-medium text-ink-400 hover:text-terra-500 disabled:opacity-30 disabled:hover:text-ink-400 transition-colors duration-300 px-3 py-2 light:text-ink-500"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`text-caption font-medium px-3 py-2 transition-colors duration-300 ${
            page === currentPage
              ? 'text-terra-500'
              : 'text-ink-500 hover:text-cream-200 light:hover:text-ink-800'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-caption font-medium text-ink-400 hover:text-terra-500 disabled:opacity-30 disabled:hover:text-ink-400 transition-colors duration-300 px-3 py-2 light:text-ink-500"
      >
        Next
      </button>
    </nav>
  )
}
