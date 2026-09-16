export const siteConfig = {
  name: 'Vinit Vaibhav Kumar',
  title: 'Vinit Vaibhav Kumar — AIML (Artificial Intelligence & Machine Learning)',
  description:
    'Portfolio of Vinit Vaibhav Kumar — Specialised in AIML (Artificial Intelligence & Machine Learning), Python, NLP, and IT Technical Operations.',
  url: 'https://vinitvaibhav.dev',
  ogImage: '/images/profile.jpg',
  links: {
    github: 'https://github.com/vinitvaibhav-5253',
    linkedin: 'https://linkedin.com/in/vinit-vaibhav-13b089344',
    twitter: 'https://x.com/vinitvaibhav_53',
    email: 'vinitvaibhav5253@gmail.com',
    phone: '+91-7763864835',
  },
} as const

export type SiteConfig = typeof siteConfig

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
] as const

export type NavLink = (typeof navLinks)[number]

export type { Project } from './types'
export { projects } from './projects'
