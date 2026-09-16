'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, ChevronDown, ChevronUp, Sparkles, Layers, User } from 'lucide-react'

import { cn } from '@/lib/utils'
import { projects } from '@/data/projects'
import type { Project } from '@/data/types'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer, VIEWPORT_CONFIG } from '@/lib/animations'

/* ------------------------------------------------------------------ */
/*  Custom GitHub SVG Icon                                             */
/* ------------------------------------------------------------------ */

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const sectionVariants = staggerContainer(0.12, 0.1)

/* ------------------------------------------------------------------ */
/*  Placeholder blur data URL (tiny 1×1 rose-tinted pixel)             */
/* ------------------------------------------------------------------ */

const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+P9/PQAJhgN7eFKJHQAAAABJRU5ErkJggg=='

/* ------------------------------------------------------------------ */
/*  Featured Hero Card (Glimra)                                        */
/* ------------------------------------------------------------------ */

function FeaturedProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div variants={fadeInUp}>
      <Card className="group border-primary/20 bg-card/80 hover:border-primary/40 hover:shadow-glow-lg relative overflow-hidden backdrop-blur-sm transition-all duration-300 ease-out">
        {/* Top accent bar */}
        <div
          className="from-primary/0 via-primary/70 to-primary/0 absolute inset-x-0 top-0 h-1 bg-gradient-to-r"
          aria-hidden="true"
        />

        <div className="grid gap-0 lg:grid-cols-2">
          {/* Image / Mockup Area */}
          <div className="bg-secondary/30 relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[380px]">
            {project.imageUrl ? (
              <Image
                src={project.imageUrl}
                alt={`${project.title} preview`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <Sparkles className="text-primary/40 mx-auto size-12" />
                  <p className="text-muted-foreground/60 mt-3 text-sm">Preview coming soon</p>
                </div>
              </div>
            )}

            {/* Featured badge overlay */}
            <div className="absolute top-4 left-4">
              <Badge className="border-primary/30 bg-primary/20 text-primary backdrop-blur-sm">
                <Sparkles className="mr-1 size-3" />
                Featured Project
              </Badge>
            </div>

            {/* Hover overlay */}
            <div className="bg-background/60 absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <span className="border-primary/40 bg-card/80 font-display text-primary rounded-lg border px-4 py-2 text-sm font-semibold">
                View Details ↓
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between p-5 sm:p-8">
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {project.title}
              </h3>

              <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
                {project.description}
              </p>

              {/* Tech Stack badges */}
              {project.techStack.length > 0 && (
                <div className="mt-5">
                  <div className="text-muted-foreground/80 mb-2 flex items-center gap-1.5 text-xs font-medium">
                    <Layers className="size-3" />
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="border-border/60 bg-secondary/60 text-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary border px-3 py-1.5 text-xs font-medium transition-all duration-200"
                      >
                        <span className="bg-primary/70 mr-1.5 size-1.5 rounded-full" />
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Key highlights (always show first 3) */}
              {project.highlights.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {project.highlights.slice(0, 3).map((highlight) => (
                    <li
                      key={highlight}
                      className="text-muted-foreground flex items-start gap-2 text-sm"
                    >
                      <span className="bg-primary/70 mt-1.5 size-1.5 shrink-0 rounded-full" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 sm:justify-start">
              <div className="flex flex-wrap items-center gap-2.5">
                {project.liveUrl && (
                  <Button asChild size="sm">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="size-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button asChild variant="outline" size="sm">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <GithubIcon className="size-4" />
                      Source Code
                    </a>
                  </Button>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                className="text-muted-foreground hover:text-primary sm:ml-auto"
              >
                {expanded ? 'Show Less' : 'Show More'}
                {expanded ? (
                  <ChevronUp className="ml-1 size-4" />
                ) : (
                  <ChevronDown className="ml-1 size-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Expandable detail panel - CSS Grid (zero JS layout reflow) */}
        <div
          className={cn(
            'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
            expanded
              ? 'grid-rows-[1fr] opacity-100'
              : 'pointer-events-none grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden">
            <div className="border-border/40 bg-secondary/20 border-t p-5 sm:p-8">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Role */}
                <div>
                  <div className="text-primary mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
                    <User className="size-3" />
                    Role
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.role}</p>
                </div>

                {/* Full Tech Stack */}
                <div>
                  <div className="text-primary mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
                    <Layers className="size-3" />
                    Full Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="px-2 py-0.5 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* All highlights */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <div className="text-primary mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
                    <Sparkles className="size-3" />
                    All Highlights
                  </div>
                  <ul className="space-y-1.5">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-muted-foreground flex items-start gap-2 text-sm"
                      >
                        <span className="bg-primary/50 mt-1.5 size-1.5 shrink-0 rounded-full" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Standard Project Card (Grid)                                       */
/* ------------------------------------------------------------------ */

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div variants={fadeInUp} className="h-full">
      <Card className="group border-border/80 bg-card/80 hover:border-primary/40 hover:shadow-glow relative flex h-full flex-col overflow-hidden backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1.5">
        {/* Top accent gradient bar on hover */}
        <div
          className="from-primary/0 via-primary/50 to-primary/0 absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* Image area */}
        <div className="bg-secondary/30 relative aspect-video overflow-hidden">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={`${project.title} preview`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <Layers className="text-primary/30 mx-auto size-8" />
                <p className="text-muted-foreground/50 mt-2 text-xs">Preview coming soon</p>
              </div>
            </div>
          )}

          {/* Hover overlay */}
          <div className="bg-background/60 absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <span className="border-primary/40 bg-card/80 font-display text-primary rounded-lg border px-4 py-2 text-sm font-semibold">
              View Details
            </span>
          </div>
        </div>

        {/* Content */}
        <CardContent className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-bold tracking-tight">{project.title}</h3>

          <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          {project.techStack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="px-2 py-0.5 text-[11px] font-medium"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}

          {/* Highlights */}
          {project.highlights.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {project.highlights.slice(0, 2).map((highlight) => (
                <li
                  key={highlight}
                  className="text-muted-foreground flex items-start gap-2 text-xs"
                >
                  <span className="bg-primary/60 mt-1 size-1 shrink-0 rounded-full" />
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          {/* Action buttons — only render if URLs exist */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="border-border/40 mt-5 flex items-center gap-2 border-t pt-4">
              {project.liveUrl && (
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="size-3.5" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="size-3.5" />
                    Source
                  </a>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Projects Section                                                   */
/* ------------------------------------------------------------------ */

export function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, VIEWPORT_CONFIG)

  const featuredProject = projects.find((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section ref={ref} id="projects" className="relative scroll-mt-20 py-24 sm:py-32">
      <Container>
        <SectionHeading
          title="Projects"
          subtitle="A curated selection of projects showcasing full-stack development, AI integration, and cloud architecture."
        />

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-10"
        >
          {/* Featured Project — Hero Card */}
          {featuredProject && <FeaturedProjectCard project={featuredProject} />}

          {/* Remaining Projects — Responsive Grid */}
          {otherProjects.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
