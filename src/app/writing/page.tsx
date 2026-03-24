import type { Metadata } from 'next'
import { WritingClient } from './WritingClient'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Commentary, analysis, and thought leadership on global health, evaluation, and international development.',
}

export default function WritingPage() {
  return <WritingClient />
}
