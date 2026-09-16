'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  AlertCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Cpu,
  LayoutList,
  Columns3,
  Building2,
  ExternalLink,
} from 'lucide-react'

import { experiences } from '@/data/experience'
import { certifications } from '@/data/certifications'
import { educationList } from '@/data/education'
import type { Experience, Certification, Education } from '@/data/types'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer, VIEWPORT_CONFIG } from '@/lib/animations'

/* ------------------------------------------------------------------ */
/*  Types & Unified Timeline Model                                    */
/* ------------------------------------------------------------------ */

export type TimelineFilter = 'all' | 'experience' | 'education' | 'certifications'
export type TimelineLayout = 'vertical' | 'horizontal'

interface BaseTimelineEntry {
  id: string
  category: 'experience' | 'education' | 'certification'
  title: string
  organization: string
  date: string
  location?: string
  description?: string
  highlights?: string[]
  icon: React.ElementType
  isTodoRole?: boolean
  isTodoDate?: boolean
  isTodoDesc?: boolean
  isTodoLocation?: boolean
  grade?: string
  badgeLabel: string
}

/* ------------------------------------------------------------------ */
/*  Helper: Check if string represents an incomplete TODO placeholder  */
/* ------------------------------------------------------------------ */

function isTodoText(text?: string): boolean {
  if (!text) return false
  return text.trim().startsWith('TODO') || text.includes('TODO:')
}

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = staggerContainer(0.12, 0.1)
const nodeVariants = fadeInUp
const badgeGridVariants = staggerContainer(0.08, 0.05)
const badgeCardVariants = fadeInUp

/* ------------------------------------------------------------------ */
/*  Build Unified Timeline Data                                        */
/* ------------------------------------------------------------------ */

function useTimelineEntries(): {
  timelineEntries: BaseTimelineEntry[]
  certList: Certification[]
} {
  // 1. Education entries from educationList
  const educationEntries: BaseTimelineEntry[] = educationList.map(
    (edu: Education, idx: number) => ({
      id: `edu-${idx}`,
      category: 'education' as const,
      title: edu.degree,
      organization: edu.institution,
      date: edu.year,
      description:
        edu.details ||
        (edu.specialisation ? `Specialisation: ${edu.specialisation}` : undefined),
      highlights: edu.highlights,
      icon: GraduationCap,
      badgeLabel: 'Education',
    }),
  )

  // 2. Experience entries from experience.ts
  const expEntries: BaseTimelineEntry[] = experiences.map((exp: Experience, idx: number) => {
    const isTodoRole = isTodoText(exp.role)
    const isTodoStartDate = isTodoText(exp.startDate)
    const isTodoEndDate = isTodoText(exp.endDate)
    const isTodoLocation = isTodoText(exp.location)
    const isTodoDesc = isTodoText(exp.description)

    let dateDisplay = ''
    if (isTodoStartDate || isTodoEndDate) {
      dateDisplay = [exp.startDate, exp.endDate].filter(Boolean).join(' — ')
    } else {
      dateDisplay = exp.startDate
        ? `${exp.startDate} — ${exp.isCurrent ? 'Present' : exp.endDate || 'Present'}`
        : 'Dates TBA'
    }

    return {
      id: `exp-${idx}-${exp.company.toLowerCase().replace(/\s+/g, '-')}`,
      category: 'experience' as const,
      title: exp.role,
      organization: exp.company,
      date: dateDisplay,
      location: exp.location,
      description: exp.description,
      highlights: exp.highlights && exp.highlights.length > 0 ? exp.highlights : undefined,
      icon: Briefcase,
      isTodoRole,
      isTodoDate: isTodoStartDate || isTodoEndDate,
      isTodoDesc,
      isTodoLocation,
      badgeLabel: 'Work Experience',
    }
  })

  // Timeline list (Experience + Education)
  const timelineEntries: BaseTimelineEntry[] = [...expEntries, ...educationEntries]

  return { timelineEntries, certList: certifications }
}

/* ------------------------------------------------------------------ */
/*  Subcomponents: Visibly Incomplete Indicators                      */
/* ------------------------------------------------------------------ */

function TodoNotice({
  text,
  label = 'Incomplete Field',
  inline = false,
}: {
  text: string
  label?: string
  inline?: boolean
}) {
  if (inline) {
    return (
      <span className="inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-md border border-dashed border-amber-500/50 bg-amber-500/10 px-2.5 py-0.5 font-mono text-xs break-words text-amber-300">
        <AlertCircle className="size-3 shrink-0 text-amber-400" />
        <span className="shrink-0 font-semibold">{label}:</span>
        <span className="break-all opacity-90 sm:break-words">{text}</span>
      </span>
    )
  }

  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-dashed border-amber-500/40 bg-amber-500/10 p-3 font-mono text-xs text-amber-200">
      <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-400" />
      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="text-[10px] font-bold tracking-wider text-amber-400 uppercase">
          {label} (Pending Verification in data file)
        </div>
        <div className="text-xs break-words text-amber-200/90">{text}</div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Subcomponent: Certifications Compact Badge Grid                    */
/* ------------------------------------------------------------------ */

function CertificationsBadgeGrid({
  certificationsList,
  isInView,
}: {
  certificationsList: Certification[]
  isInView: boolean
}) {
  return (
    <div className="mt-12">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Award className="text-primary size-5" />
            <h3 className="font-display text-foreground text-xl font-bold tracking-tight sm:text-2xl">
              Certifications & Accreditations
            </h3>
          </div>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
            Industry & academic credentials certified by AWS Academy and AICTE-EduSkills.
          </p>
        </div>

        <Badge variant="outline" className="w-fit font-mono text-xs">
          {certificationsList.length} Verified Credentials
        </Badge>
      </div>

      <motion.div
        variants={badgeGridVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {certificationsList.map((cert) => {
          const isAws = cert.issuer.toLowerCase().includes('aws')

          return (
            <motion.div key={cert.title} variants={badgeCardVariants}>
              <Card className="group border-border/80 bg-card/70 hover:border-primary/40 hover:shadow-glow relative flex h-full flex-col justify-between overflow-hidden p-5 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1">
                {/* Accent top gradient line */}
                <div
                  className="from-primary/0 via-primary/50 to-primary/0 absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <div>
                  {/* Issuer & Status Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="border-primary/20 bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-105">
                      {isAws ? <Cpu className="size-4" /> : <Award className="size-4" />}
                    </div>

                    <Badge
                      variant="secondary"
                      className="border-border/50 max-w-[140px] min-w-0 shrink truncate border text-[10px] font-medium"
                    >
                      {cert.issuer}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-foreground group-hover:text-primary mt-3.5 text-sm leading-snug font-bold tracking-tight transition-colors duration-200">
                    {cert.title}
                  </h4>
                </div>

                {/* Grade / Verification Footer */}
                <div className="border-border/40 mt-4 flex items-center justify-between border-t pt-3">
                  {cert.grade ? (
                    <div className="text-primary flex items-center gap-1.5 text-xs font-medium">
                      <Sparkles className="size-3.5" />
                      <span>{cert.grade}</span>
                    </div>
                  ) : (
                    <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                      <CheckCircle2 className="text-primary/70 size-3" />
                      <span>Curriculum Verified</span>
                    </div>
                  )}

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1 text-[11px] font-medium transition-colors"
                      title="Verify Credential on Credly"
                    >
                      Verify
                      <ExternalLink className="size-3" />
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Subcomponent: Single Timeline Node Card (Vertical or Horizontal)  */
/* ------------------------------------------------------------------ */

function TimelineCard({ entry }: { entry: BaseTimelineEntry; layout?: TimelineLayout }) {
  return (
    <Card className="group border-border/80 bg-card/80 hover:border-primary/40 hover:shadow-glow relative overflow-hidden p-4 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 sm:p-6">
      {/* Top subtle highlight */}
      <div
        className="from-primary/0 via-primary/40 to-primary/0 absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-4">
        {/* Meta Bar: Badge + Date + Location */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={entry.category === 'experience' ? 'default' : 'secondary'}
              className="text-xs font-medium"
            >
              {entry.badgeLabel}
            </Badge>

            {entry.location && (
              <>
                {entry.isTodoLocation ? (
                  <TodoNotice text={entry.location} label="Location" inline />
                ) : (
                  <span className="text-muted-foreground flex items-center gap-1 text-xs">
                    <MapPin className="text-primary/70 size-3 shrink-0" />
                    {entry.location}
                  </span>
                )}
              </>
            )}
          </div>

          {/* Date Badge */}
          <div>
            {entry.isTodoDate ? (
              <TodoNotice text={entry.date} label="Dates" inline />
            ) : (
              <span className="border-border/50 bg-secondary/50 text-foreground inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs font-medium">
                <Calendar className="text-primary size-3 shrink-0" />
                {entry.date}
              </span>
            )}
          </div>
        </div>

        {/* Title & Organization Header */}
        <div>
          {entry.isTodoRole ? (
            <div className="space-y-1">
              <TodoNotice text={entry.title} label="Job Title / Role" inline />
              <div className="text-foreground mt-1 flex items-center gap-1.5 text-base font-semibold sm:text-lg">
                <Building2 className="text-primary size-4 shrink-0" />
                <span>{entry.organization}</span>
              </div>
            </div>
          ) : (
            <>
              <h3 className="font-display text-foreground text-lg font-bold tracking-tight sm:text-xl">
                {entry.title}
              </h3>
              <div className="text-primary mt-1 flex items-center gap-1.5 text-sm font-semibold">
                <Building2 className="size-4 shrink-0" />
                <span>{entry.organization}</span>
              </div>
            </>
          )}
        </div>

        {/* Description */}
        {entry.description && (
          <div>
            {entry.isTodoDesc ? (
              <TodoNotice text={entry.description} label="Role Responsibilities" />
            ) : (
              <p className="text-muted-foreground text-sm leading-relaxed">{entry.description}</p>
            )}
          </div>
        )}

        {/* Highlights */}
        {entry.highlights && entry.highlights.length > 0 && (
          <div className="border-border/40 mt-1 space-y-2 border-t pt-3">
            <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Key Highlights & Contributions:
            </span>
            <ul className="space-y-1.5">
              {entry.highlights.map((highlight, hIdx) => (
                <li
                  key={hIdx}
                  className="text-muted-foreground flex items-start gap-2 text-xs leading-relaxed"
                >
                  <span className="bg-primary mt-1 size-1.5 shrink-0 rounded-full" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/*  Vertical Layout Implementation                                     */
/* ------------------------------------------------------------------ */

function VerticalTimeline({
  entries,
  isInView,
}: {
  entries: BaseTimelineEntry[]
  isInView: boolean
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="before:from-primary before:via-primary/40 relative space-y-10 pl-8 before:absolute before:top-3 before:bottom-3 before:left-4 before:w-0.5 before:bg-gradient-to-b before:to-transparent sm:pl-10 sm:before:left-5"
    >
      {entries.map((entry) => {
        const IconComponent = entry.icon

        return (
          <motion.div
            key={entry.id}
            variants={nodeVariants}
            className="group relative flex items-start gap-4 sm:gap-6"
          >
            {/* Timeline Node Ring */}
            <div className="border-primary bg-background text-primary shadow-glow absolute top-1.5 -left-8 flex size-8 items-center justify-center rounded-full border-2 transition-transform duration-300 group-hover:scale-110 sm:-left-10 sm:size-10">
              <IconComponent className="size-4 sm:size-5" />
            </div>

            {/* Card Content */}
            <div className="min-w-0 flex-1">
              <TimelineCard entry={entry} layout="vertical" />
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Horizontal Scroll Track Implementation (Desktop)                   */
/* ------------------------------------------------------------------ */

function HorizontalTimeline({
  entries,
  isInView,
}: {
  entries: BaseTimelineEntry[]
  isInView: boolean
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between pb-2">
        <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
          <Sparkles className="text-primary size-3.5" />
          <span>Horizontal Roadmap View — Scroll or click arrows to explore</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('left')}
            className="hover:border-primary/50 hover:text-primary hover:shadow-glow size-8 p-0 transition-all duration-200 ease-out hover:scale-110 active:scale-95"
            aria-label="Scroll timeline left"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('right')}
            className="hover:border-primary/50 hover:text-primary hover:shadow-glow size-8 p-0 transition-all duration-200 ease-out hover:scale-110 active:scale-95"
            aria-label="Scroll timeline right"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Horizontal Track */}
      <div
        ref={scrollRef}
        className="scrollbar-thumb-muted-foreground/30 flex snap-x snap-mandatory scrollbar-thin gap-6 overflow-x-auto scroll-smooth pt-2 pb-6"
      >
        {entries.map((entry, idx) => {
          const IconComponent = entry.icon

          return (
            <motion.div
              key={entry.id}
              variants={nodeVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="relative w-[340px] shrink-0 snap-start sm:w-[420px]"
            >
              {/* Top Node & Connector */}
              <div className="relative mb-4 flex items-center gap-3">
                <div className="border-primary bg-background text-primary shadow-glow flex size-9 items-center justify-center rounded-full border-2">
                  <IconComponent className="size-4" />
                </div>
                <div className="from-primary/60 to-primary/10 h-0.5 flex-1 bg-gradient-to-r" />
                <span className="text-muted-foreground font-mono text-xs">Step {idx + 1}</span>
              </div>

              <TimelineCard entry={entry} layout="horizontal" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Experience & Timeline Section                                 */
/* ------------------------------------------------------------------ */

export function Experience() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, VIEWPORT_CONFIG)

  const [activeFilter, setActiveFilter] = useState<TimelineFilter>('all')
  const [layoutMode, setLayoutMode] = useState<TimelineLayout>('vertical')

  const { timelineEntries, certList } = useTimelineEntries()

  // Filter entries according to active tab
  const filteredTimeline = timelineEntries.filter((entry) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'experience') return entry.category === 'experience'
    if (activeFilter === 'education') return entry.category === 'education'
    return false
  })

  const showCertificationsGrid = activeFilter === 'all' || activeFilter === 'certifications'
  const showTimelineEntries =
    activeFilter === 'all' || activeFilter === 'experience' || activeFilter === 'education'

  return (
    <section ref={ref} id="experience" className="relative scroll-mt-20 py-24 sm:py-32">
      <Container>
        <SectionHeading
          title="Experience & Education"
          subtitle="A chronological view of my professional internships, academic track in AI/ML, and verified certifications."
        />

        {/* Control Toolbar: Filter Tabs + Desktop Layout Switcher */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Filter Pills */}
          <div className="border-border/60 bg-secondary/40 flex flex-wrap items-center gap-1.5 rounded-xl border p-1 backdrop-blur-sm sm:p-1.5">
            {(
              [
                { key: 'all', label: 'All Milestones' },
                { key: 'experience', label: 'Experience' },
                { key: 'education', label: 'Education' },
                { key: 'certifications', label: 'Certifications' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={cn(
                  'cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-out',
                  activeFilter === tab.key
                    ? 'bg-primary text-primary-foreground shadow-sm hover:scale-[1.02] active:scale-[0.98]'
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground hover:scale-[1.02] active:scale-[0.98]',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Layout Toggle (Vertical vs Horizontal Desktop View) */}
          <div className="border-border/60 bg-secondary/40 hidden items-center gap-1 rounded-xl border p-1.5 backdrop-blur-sm lg:flex">
            <span className="text-muted-foreground px-2 font-mono text-xs">Layout:</span>
            <button
              type="button"
              onClick={() => setLayoutMode('vertical')}
              className={cn(
                'inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]',
                layoutMode === 'vertical'
                  ? 'bg-card text-foreground border-border border shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
              title="Switch to Vertical Timeline view"
            >
              <LayoutList className="text-primary size-3.5" />
              Vertical
            </button>

            <button
              type="button"
              onClick={() => setLayoutMode('horizontal')}
              className={cn(
                'inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]',
                layoutMode === 'horizontal'
                  ? 'bg-card text-foreground border-border border shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
              title="Switch to Horizontal Scroll Track view"
            >
              <Columns3 className="text-primary size-3.5" />
              Horizontal Scroll
            </button>
          </div>
        </div>

        {/* Main Timeline Section */}
        {showTimelineEntries && filteredTimeline.length > 0 && (
          <div className="mb-12">
            {/* Desktop Horizontal view or Vertical view */}
            {layoutMode === 'horizontal' ? (
              <div className="hidden lg:block">
                <HorizontalTimeline entries={filteredTimeline} isInView={isInView} />
              </div>
            ) : null}

            <div className={cn(layoutMode === 'horizontal' && 'lg:hidden')}>
              <VerticalTimeline entries={filteredTimeline} isInView={isInView} />
            </div>
          </div>
        )}

        {/* Compact Certifications Badge Grid */}
        {showCertificationsGrid && (
          <CertificationsBadgeGrid certificationsList={certList} isInView={isInView} />
        )}
      </Container>
    </section>
  )
}
