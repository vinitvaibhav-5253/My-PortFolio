'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, MapPin, ArrowRight, Headphones, Award } from 'lucide-react'

import { profile } from '@/data/profile'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Badge } from '@/components/ui/badge'
import { fadeInLeft, fadeInRight, VIEWPORT_CONFIG } from '@/lib/animations'

export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, VIEWPORT_CONFIG)

  return (
    <section ref={ref} id="about" className="relative scroll-mt-20 py-24 sm:py-32">
      <Container>
        <SectionHeading
          title="About Me"
          subtitle="AIML Specialist (Artificial Intelligence & Machine Learning) & BCA student building intelligent systems and IT workflows."
        />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Real Photo Showcase */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Subtle ambient glow behind card */}
              <div
                className="absolute -inset-1 rounded-3xl opacity-30 blur-2xl transition duration-500"
                style={{
                  background:
                    'radial-gradient(circle, hsl(var(--glow-color) / 0.4) 0%, transparent 70%)',
                }}
                aria-hidden="true"
              />

              {/* Showcase Card */}
              <div className="border-border bg-card relative overflow-hidden rounded-2xl border p-5 shadow-lg backdrop-blur-sm sm:p-7">
                {/* Decorative technical grid background */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                  aria-hidden="true"
                />

                {/* Real User Photo Container */}
                <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border-2 border-primary/30 bg-secondary/50 shadow-inner group">
                  <Image
                    src={profile.avatarUrl || '/images/profile.jpg'}
                    alt={profile.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 280px, 320px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-3 inset-x-3 text-center">
                    <div className="font-display text-foreground text-lg font-bold tracking-tight drop-shadow-md">
                      {profile.name}
                    </div>
                    <div className="text-primary text-xs font-semibold drop-shadow-md">
                      Galgotias University • AIML Specialisation
                    </div>
                  </div>
                </div>

                {/* Quick Info Badges inside photo frame */}
                <div className="mt-5 flex flex-col gap-2.5">
                  <div className="border-border/50 bg-secondary/40 hover:border-primary/40 hover:bg-secondary/70 flex cursor-default items-center gap-3 rounded-lg border p-3 text-sm transition-all duration-200 hover:translate-x-1">
                    <GraduationCap className="text-primary size-4 shrink-0" />
                    <span className="text-muted-foreground text-xs break-words sm:text-sm">
                      Galgotias University (BCA AI & ML, 2023–2026)
                    </span>
                  </div>

                  <div className="border-border/50 bg-secondary/40 hover:border-primary/40 hover:bg-secondary/70 flex cursor-default items-center gap-3 rounded-lg border p-3 text-sm transition-all duration-200 hover:translate-x-1">
                    <MapPin className="text-primary size-4 shrink-0" />
                    <span className="text-muted-foreground text-xs break-words sm:text-sm">
                      {profile.location}
                    </span>
                  </div>

                  <div className="border-border/50 bg-secondary/40 hover:border-primary/40 hover:bg-secondary/70 flex cursor-default items-center gap-3 rounded-lg border p-3 text-sm transition-all duration-200 hover:translate-x-1">
                    <Headphones className="text-primary size-4 shrink-0" />
                    <span className="text-muted-foreground text-xs break-words sm:text-sm">
                      AIML Specialisation & IT Operations
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Content & Current Focus */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-6 lg:col-span-7"
          >
            <div className="text-muted-foreground space-y-4 text-base leading-relaxed sm:text-lg">
              <p>
                Hello! I&apos;m <span className="text-foreground font-medium">{profile.name}</span>,
                a passionate developer and student specialising in <span className="text-foreground font-medium">AIML (Artificial Intelligence & Machine Learning)</span> at
                Galgotias University, combined with hands-on experience in IT Service Desk operations,
                hardware and software troubleshooting, incident ticketing, SLA compliance, and remote desktop support (RDP).
              </p>
              <p>
                Proficient in Python, C++, Java, and JavaScript with practical knowledge of machine
                learning workflows using Scikit-learn and NLP techniques. Adept at root cause analysis,
                knowledge base documentation, and cross-functional communication in fast-paced IT
                environments.
              </p>
              <p>
                I hold <span className="text-foreground font-medium">52 hours of verified AWS Academy training</span> across
                Generative AI, Machine Learning Foundations, and NLP.
              </p>
            </div>

            {/* Practical Experience Callout Card */}
            <div className="group border-primary/30 bg-primary/5 hover:border-primary/50 hover:shadow-glow relative overflow-hidden rounded-xl border p-6 transition-all duration-300 ease-out hover:scale-[1.01]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2.5">
                    <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                    <span className="bg-primary relative inline-flex size-2.5 rounded-full" />
                  </span>
                  <span className="text-primary text-xs font-semibold tracking-wider uppercase">
                    Practical Experience
                  </span>
                </div>
                <Badge variant="outline" className="w-fit text-xs">
                  2023 – Present
                </Badge>
              </div>

              <div className="mt-3">
                <h3 className="font-display text-foreground text-lg font-bold">
                  IT & ML Self-Initiated Projects — Peer Technical Support
                </h3>
                <p className="text-primary/90 text-xs font-medium mt-0.5">
                  Galgotias University Labs
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
                  Delivered Tier-1 peer technical support: diagnosed and resolved software environment issues,
                  IDE configuration errors, Python dependency conflicts, and OS-level incidents for
                  cross-functional project teams following full incident lifecycle workflows.
                </p>
              </div>

              <div className="text-primary mt-4 flex items-center gap-1.5 text-xs font-medium">
                <a
                  href="#experience"
                  className="inline-flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-1 active:scale-95"
                >
                  View Experience Timeline
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>

            {/* Key Focus Area Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                Core Focus Areas:
              </span>
              <Badge
                variant="secondary"
                className="border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 cursor-default transition-all duration-200 hover:scale-105"
              >
                AIML (AI & Machine Learning)
              </Badge>
              <Badge
                variant="secondary"
                className="hover:bg-primary/15 hover:border-primary/40 hover:text-primary cursor-default transition-all duration-200 hover:scale-105"
              >
                Natural Language Processing (NLP)
              </Badge>
              <Badge
                variant="secondary"
                className="hover:bg-primary/15 hover:border-primary/40 hover:text-primary cursor-default transition-all duration-200 hover:scale-105"
              >
                IT Service Desk Support
              </Badge>
              <Badge
                variant="secondary"
                className="hover:bg-primary/15 hover:border-primary/40 hover:text-primary cursor-default transition-all duration-200 hover:scale-105"
              >
                Incident Ticketing & SLAs
              </Badge>
              <Badge
                variant="secondary"
                className="hover:bg-primary/15 hover:border-primary/40 hover:text-primary cursor-default transition-all duration-200 hover:scale-105"
              >
                Root Cause Analysis
              </Badge>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

