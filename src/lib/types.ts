export interface ExperienceEntry {
  period: string
  role: string
  org: string
  location: string
  description: string
  startYear: number
  endYear: number
}

export interface Publication {
  year: number
  title: string
  journal: string
  authors: string
  theme: string
  url?: string
  cover?: string
}

export interface ResearchItem {
  slug: string
  image: string
  source: string
  region: string
  title: string
  year: number
  tag: string
  alt: string
  href?: string
  tall?: boolean
}

export interface EditorsNoteParagraph {
  text: string
  italic?: boolean
}

export interface EditorsNoteCurrent {
  html: string
}

export interface EditorsNote {
  date: string
  body: EditorsNoteParagraph[]
  currently: EditorsNoteCurrent[]
  signature: string
}

export interface MarqueeItem {
  label: string
  text: string
  href?: string
}

export interface WritingPiece {
  year: number
  publication: string
  title: string
  description: string
  url?: string | null
  featured?: boolean
}

export interface SocialLink {
  platform: string
  url: string
  descriptor?: string
}
