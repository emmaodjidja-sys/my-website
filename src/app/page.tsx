import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Experience } from '@/sections/Experience'
import { Publications } from '@/sections/Publications'
import { Praxis } from '@/sections/Praxis'
import { Writing } from '@/sections/Writing'
import { Contact } from '@/sections/Contact'

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
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
