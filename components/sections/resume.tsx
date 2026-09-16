'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FileText,
  Download,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  Headphones,
  Eye,
  Brain,
} from 'lucide-react'

import { profile } from '@/data/profile'
import { contactConfig } from '@/data/contact'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer, VIEWPORT_CONFIG } from '@/lib/animations'

const containerVariants = staggerContainer(0.12, 0.1)

export function Resume() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, VIEWPORT_CONFIG)
  const [showPreview, setShowPreview] = useState(false)

  const resumePath = contactConfig.resumeUrl || '/resume/resume.pdf'

  return (
    <section ref={ref} id="resume" className="relative scroll-mt-20 py-24 sm:py-32">
      <Container>
        <SectionHeading
          title="Resume"
          subtitle="Review my professional qualifications, hands-on IT support expertise, and verified machine learning credentials."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto max-w-5xl space-y-8"
        >
          {/* Main Action Banner */}
          <motion.div variants={fadeInUp}>
            <Card className="group border-primary/30 bg-card/80 hover:border-primary/50 hover:shadow-glow relative overflow-hidden backdrop-blur-sm transition-all duration-300">
              <div
                className="from-primary/0 via-primary/60 to-primary/0 absolute inset-x-0 top-0 h-1 bg-gradient-to-r"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="border-primary/30 bg-primary/10 text-primary">
                      <FileText className="mr-1 size-3.5" />
                      Official Curriculum Vitae
                    </Badge>
                    <span className="text-muted-foreground font-mono text-xs">Updated 2026</span>
                  </div>

                  <h3 className="font-display text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
                    {profile.name}
                  </h3>

                  <p className="text-muted-foreground max-w-xl text-sm leading-relaxed sm:text-base">
                    Specialising in <span className="text-foreground font-medium">AIML (Artificial Intelligence & Machine Learning)</span> and intelligent systems, backed by 52 hours of AWS Academy verified AI/ML training and hands-on IT technical support experience.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <a href={resumePath} download="Vinit_Vaibhav_Kumar_Resume.pdf">
                      <Download className="mr-2 size-4" />
                      Download PDF
                    </a>
                  </Button>

                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                    <a href={resumePath} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 size-4" />
                      Open in Tab
                    </a>
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={() => setShowPreview(!showPreview)}
                    className="w-full sm:w-auto"
                  >
                    <Eye className="mr-2 size-4" />
                    {showPreview ? 'Hide Preview' : 'Interactive Preview'}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Snapshot Cards */}
          <motion.div variants={fadeInUp} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border/80 bg-card/70 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="border-primary/20 bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg border">
                  <Brain className="size-5" />
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                    Core Specialisation
                  </div>
                  <div className="text-foreground text-sm font-bold mt-0.5">
                    AIML (AI & Machine Learning)
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-border/80 bg-card/70 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="border-primary/20 bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg border">
                  <GraduationCap className="size-5" />
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                    Current Degree
                  </div>
                  <div className="text-foreground text-sm font-bold mt-0.5">
                    BCA – AI & ML (2023–26)
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-border/80 bg-card/70 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="border-primary/20 bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg border">
                  <Award className="size-5" />
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                    AWS Training
                  </div>
                  <div className="text-foreground text-sm font-bold mt-0.5">
                    52 Hours (GenAI, ML, NLP)
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-border/80 bg-card/70 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="border-primary/20 bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg border">
                  <Briefcase className="size-5" />
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                    Availability
                  </div>
                  <div className="text-foreground text-sm font-bold mt-0.5">
                    Pan-India / Rotational
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Interactive Document Viewer Frame */}
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Card className="border-border bg-card overflow-hidden rounded-xl border">
                <div className="border-border bg-secondary/50 flex items-center justify-between border-b px-4 py-2.5 text-xs">
                  <span className="text-muted-foreground font-mono">
                    resume.pdf — Embedded Document Preview
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={resumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      Fullscreen
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
                <div className="relative h-[720px] w-full bg-neutral-900">
                  <iframe
                    src={`${resumePath}#toolbar=0`}
                    title="Resume PDF Document Viewer"
                    className="size-full border-none"
                  />
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  )
}