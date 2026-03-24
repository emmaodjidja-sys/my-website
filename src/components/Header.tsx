'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Research', href: '#publications' },
  { label: 'PRAXIS', href: '#praxis' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = links.map(l => l.href.replace('#', ''))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  // Update indicator position when active section changes
  const updateIndicator = useCallback(() => {
    const activeHref = `#${activeSection}`
    const activeLink = linkRefs.current[activeHref]
    if (activeLink) {
      const parent = activeLink.parentElement
      if (parent) {
        const parentRect = parent.getBoundingClientRect()
        const linkRect = activeLink.getBoundingClientRect()
        setIndicatorStyle({
          left: linkRect.left - parentRect.left,
          width: linkRect.width,
        })
      }
    }
  }, [activeSection])

  useEffect(() => {
    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

  // Body overflow for mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-out-expo ${
          scrolled
            ? 'bg-ink-900/70 backdrop-blur-xl light:bg-cream-50/70'
            : 'bg-transparent'
        }`}
      >
        <nav className={`mx-auto flex max-w-[90rem] items-center justify-between px-6 sm:px-10 lg:px-16 xl:px-20 transition-all duration-500 ${
          scrolled ? 'h-14' : 'h-16'
        }`}>
          {/* Logo with pulsing dot */}
          <a
            href="#"
            className="font-serif text-[1.1rem] font-bold tracking-tight text-cream-50 hover:text-terra-500 transition-colors duration-400 light:text-ink-800"
            aria-label="Back to top"
          >
            ENO
            <motion.span
              className="text-terra-500"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ delay: 0.8, duration: 0.6, times: [0, 0.5, 1] }}
            >
              .
            </motion.span>
          </a>

          {/* Desktop nav with sliding indicator */}
          <div className="hidden lg:flex items-center gap-0.5 relative">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                ref={el => { linkRefs.current[link.href] = el }}
                className={`relative px-3.5 py-2 text-[0.78rem] font-medium tracking-wide transition-colors duration-400 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-cream-100 light:text-ink-800'
                    : 'text-ink-400 hover:text-cream-100 light:text-ink-500 light:hover:text-ink-800'
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Sliding active indicator */}
            {activeSection && (
              <motion.span
                className="absolute bottom-0 h-[2px] bg-terra-500"
                animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            )}

            <div className="ml-4 pl-4 border-l border-ink-700/40 light:border-cream-300">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-8 h-8 flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <div className="relative w-5 h-3">
                <span className={`absolute left-0 w-full h-[1.5px] bg-cream-200 light:bg-ink-700 transition-all duration-400 ease-out-expo ${mobileOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 w-full h-[1.5px] bg-cream-200 light:bg-ink-700 transition-all duration-400 ease-out-expo ${mobileOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay — slides from right */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink-900/98 light:bg-cream-50/98 backdrop-blur-2xl flex items-center"
          >
            <nav className="px-10 space-y-3 w-full">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-serif text-[clamp(2rem,6vw,3rem)] font-bold text-cream-50 hover:text-terra-500 transition-colors duration-300 light:text-ink-800"
                >
                  {link.label}
                </motion.a>
              ))}
              {/* Theme toggle inside mobile menu */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6"
              >
                <ThemeToggle />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
