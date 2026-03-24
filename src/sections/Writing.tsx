'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { siteContent } from '@/lib/content'
import { Reveal } from '@/components/Reveal'

const { writing } = siteContent
const featured = writing.find(w => w.featured) || writing[0]
const rest = writing.filter(w => w !== featured).slice(0, 3)

function SmartLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const isInternal = href.startsWith('/')
  if (isInternal) {
    return <Link href={href} className={className}>{children}</Link>
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
}

export function Writing() {
  return (
    <section id="writing" className="py-28 md:py-40">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="hr mb-20" />

        {/* Header */}
        <div className="mb-20 md:mb-28">
          <Reveal>
            <p className="overline mb-6">Commentary</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-serif text-[clamp(2.5rem,5.5vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-cream-50 light:text-ink-900">
              Writing &{' '}
              <span className="italic text-terra-500">Ideas</span>
            </h2>
          </Reveal>
        </div>

        {/* Featured card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="border-t-2 border-terra-500 py-12 md:py-16"
        >
          <div className="max-w-3xl">
            <p className="overline mb-4">{featured.publication}</p>
            <h3 className="font-serif text-[clamp(1.6rem,3.5vw,2.8rem)] font-semibold leading-tight tracking-[-0.02em] text-cream-100 light:text-ink-800">
              {featured.title}
            </h3>
            <p className="mt-4 text-body-sm text-ink-300 leading-relaxed max-w-xl light:text-ink-600 line-clamp-2">
              {featured.description}
            </p>
            {featured.url && (
              <SmartLink href={featured.url} className="arrow-link mt-5 inline-flex">
                Read
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </SmartLink>
            )}
          </div>
        </motion.div>

        {/* Pull quote */}
        <Reveal className="py-10 md:py-14">
          <p className="editorial-quote text-[clamp(1.2rem,2.5vw,1.8rem)] text-cream-200/60 max-w-2xl light:text-ink-500/60">
            &ldquo;The most valuable evaluations are not necessarily the most methodologically sophisticated ones. They are the ones designed with enough pragmatism to survive first contact with the field.&rdquo;
          </p>
        </Reveal>

        {/* Compact rows */}
        <div className="space-y-0">
          {rest.map((post) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {post.url ? (
                <SmartLink
                  href={post.url}
                  className="group block border-b border-ink-800/50 light:border-cream-300/50 py-8 md:py-10 hover:bg-terra-500/[0.03] transition-colors duration-300"
                >
                  <WritingRow post={post} />
                </SmartLink>
              ) : (
                <div className="border-b border-ink-800/50 light:border-cream-300/50 py-8 md:py-10">
                  <WritingRow post={post} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <Reveal className="mt-12">
          <Link href="/writing" className="arrow-link">
            View all writing
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function WritingRow({ post }: { post: typeof writing[number] }) {
  return (
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
  )
}
