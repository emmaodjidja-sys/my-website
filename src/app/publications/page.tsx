import type { Metadata } from 'next'
import { PublicationsClient } from './PublicationsClient'

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Peer-reviewed research spanning infectious disease, nutrition, maternal health, health systems, and the climate-conflict nexus.',
}

export default function PublicationsPage() {
  return <PublicationsClient />
}
