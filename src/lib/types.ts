export interface ExpertiseTag {
  label: string
  tooltip?: string
}

// Uses `org` (not `organization`) to match existing codebase convention
export interface ExperienceEntry {
  period: string
  role: string
  org: string
  location: string
  description: string
  startYear: number
  endYear: number
}

export interface MapCountry {
  name: string
  ids: string[]
  opacity: number
  labelPosition: { x: number; y: number }
}

// `capabilities` field is a plan extension beyond the spec — needed for
// the "Approach" beat's capability list
export interface PraxisBeat {
  id: 'problem' | 'approach' | 'practice' | 'result'
  heading: string
  content: string
  capabilities?: string[]
  stat?: { value: number; suffix: string; label: string }
  chart?: PraxisChartData
}

export interface PraxisChartData {
  dimensions: string[]
  before: number[]
  after: number[]
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
  descriptor: string
  url: string
}

export interface ClosingStatement {
  line1: string
  line2: string
}
