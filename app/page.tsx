import dynamic from 'next/dynamic'

import { Hero } from '@/components/sections/hero'
import { PageTransition } from '@/components/layout/page-transition'

/* ---------- Lazy-load below-the-fold sections ---------- */

const About = dynamic(() => import('@/components/sections/about').then((m) => m.About))
const Skills = dynamic(() => import('@/components/sections/skills').then((m) => m.Skills))
const Projects = dynamic(() => import('@/components/sections/projects').then((m) => m.Projects))
const Experience = dynamic(() =>
  import('@/components/sections/experience').then((m) => m.Experience),
)
const Resume = dynamic(() => import('@/components/sections/resume').then((m) => m.Resume))
const Contact = dynamic(() => import('@/components/sections/contact').then((m) => m.Contact))

export default function Home() {
  return (
    <main id="main-content">
      <PageTransition>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Resume />
        <Contact />
      </PageTransition>
    </main>
  )
}
