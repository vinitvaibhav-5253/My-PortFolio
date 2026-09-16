export interface Profile {
  name: string
  title: string
  tagline: string
  education: string
  location: string
  bio?: string
  email?: string
  phone?: string
  avatarUrl?: string
  links?: {
    github?: string
    linkedin?: string
    twitter?: string
    [key: string]: string | undefined
  }
}

export type SkillCategoryName =
  | 'IT Support & Operations'
  | 'AI & Machine Learning'
  | 'Programming & Web'
  | 'Tools & Platforms'
  | 'AI/ML'
  | 'Web Development'
  | 'Cloud & Tools'

export interface SkillCategory {
  category: SkillCategoryName | string
  skills: string[]
}

export interface Project {
  title: string
  description: string
  techStack: string[]
  role: string
  highlights: string[]
  imageUrl?: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

export interface Certification {
  title: string
  issuer: string
  date?: string
  credentialUrl?: string
  grade?: string
  description?: string
}

export interface Experience {
  company: string
  role: string
  startDate: string
  endDate?: string
  isCurrent?: boolean
  location?: string
  description?: string
  highlights?: string[]
}

export interface Education {
  degree: string
  institution: string
  year: string
  specialisation?: string
  details?: string
  highlights?: string[]
}

