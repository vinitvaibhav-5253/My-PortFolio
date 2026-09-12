export const siteConfig = {
  name: 'Vinit Vaibhav',
  title: 'Vinit Vaibhav — Developer Portfolio',
  description:
    'Full-stack developer crafting performant, accessible web and mobile experiences. Explore my projects, skills, and professional journey.',
  url: 'https://vinitvaibhav.dev',
  ogImage: '/images/og-default.png',
  links: {
    github: 'https://github.com/vinitvaibhav',
    linkedin: 'https://linkedin.com/in/vinitvaibhav',
    twitter: 'https://twitter.com/vinitvaibhav',
    email: 'hello@vinitvaibhav.dev',
  },
} as const

export type SiteConfig = typeof siteConfig

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const

export type NavLink = (typeof navLinks)[number]

export interface Project {
  title: string
  description: string
  tags: string[]
  image?: string
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  // Add your projects here
]
