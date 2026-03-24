import { Header } from '@/components/Header'
import { ReadingProgress } from '@/components/ReadingProgress'
import { Footer } from '@/components/Footer'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Experience } from '@/sections/Experience'
import { Publications } from '@/sections/Publications'
import { Praxis } from '@/sections/Praxis'
import { Writing } from '@/sections/Writing'
import { Contact } from '@/sections/Contact'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Emmanuel Nene Odjidja',
  url: 'https://www.emmanuelneneodjidja.org',
  jobTitle: 'M&E Specialist, Researcher, Epidemiologist',
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Queen Margaret University, Edinburgh',
  },
  knowsAbout: [
    'Impact Evaluation', 'Epidemiology', 'Global Health',
    'Programme Evaluation', 'Mixed Methods Research',
  ],
  sameAs: [
    'https://www.linkedin.com/in/emmanuel-odjidja/',
    'https://scholar.google.co.uk/citations?user=jIiNtLYAAAAJ&hl=en',
    'https://github.com/emmaodjidja-sys',
    'https://www.researchgate.net/profile/Emmanuel_Odjidja',
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Publications />
        <Praxis />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
