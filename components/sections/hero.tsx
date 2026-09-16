'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, ArrowDown, FileText } from 'lucide-react'

import { profile } from '@/data/profile'
import { siteConfig } from '@/data/site'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { GridBackground } from '@/components/ui/grid-background'
import { fadeInUp, staggerContainer } from '@/lib/animations'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const containerVariants = staggerContainer(0.12, 0.2)

const socialLinks = [
  {
    label: 'GitHub',
    href: siteConfig.links.github,
    icon: GithubIcon,
  },
  {
    label: 'LinkedIn',
    href: siteConfig.links.linkedin,
    icon: LinkedinIcon,
  },
  {
    label: 'X (Twitter)',
    href: siteConfig.links.twitter,
    icon: TwitterIcon,
  },
  {
    label: 'Email',
    href: `mailto:${siteConfig.links.email}`,
    icon: Mail,
  },
]

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-svh items-center justify-center">
      <GridBackground className="absolute inset-0" />

      <Container className="relative z-10 pt-24 pb-16 sm:py-24 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Profile Photo Avatar */}
          <motion.div variants={fadeInUp} className="relative mb-6">
            <div className="relative size-28 rounded-full bg-gradient-to-tr from-primary via-primary/50 to-primary/20 p-1 shadow-glow transition-transform duration-300 hover:scale-105 sm:size-32">
              <div className="relative size-full overflow-hidden rounded-full border-2 border-background bg-card">
                <Image
                  src={profile.avatarUrl || '/images/profile.jpg'}
                  alt={profile.name}
                  fill
                  className="object-cover object-top"
                  sizes="128px"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Greeting badge */}
          <motion.div variants={fadeInUp}>
            <span className="border-border bg-card/50 text-muted-foreground hover:border-primary/40 hover:shadow-glow inline-flex cursor-default items-center gap-2 rounded-full border px-4 py-1.5 text-sm backdrop-blur-sm transition-all duration-200">
              <span className="relative flex h-2 w-2">
                <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
              </span>
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeInUp}
            className="font-display mt-8 text-3xl font-bold tracking-tight break-words sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {profile.name.split(' ').map((word, i, arr) => (
              <span key={i}>
                {i === arr.length - 1 ? <span className="text-primary">{word}</span> : word}
                {i < arr.length - 1 ? ' ' : ''}
              </span>
            ))}
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground mt-4 text-lg font-medium sm:text-xl"
          >
            {profile.title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground/80 mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
          >
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href="#projects">
                View Projects
                <ArrowDown className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="/resume/resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="size-4" />
                View Resume
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
              <a href="#contact">Get in Touch</a>
            </Button>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={fadeInUp} className="mt-14 flex items-center gap-3 sm:mt-16">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="border-border bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-primary hover:shadow-glow inline-flex size-10 items-center justify-center rounded-lg border transition-all duration-200 ease-out hover:scale-110 active:scale-95"
                aria-label={social.label}
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator - hidden on mobile to avoid overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:flex"
      >
        <a
          href="#about"
          className="group text-muted-foreground/50 hover:text-primary flex flex-col items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Scroll to about section"
        >
          <span className="group-hover:text-primary text-xs tracking-widest uppercase transition-colors">
            Scroll
          </span>
          <div className="motion-safe:animate-bounce">
            <ArrowDown className="group-hover:text-primary size-4 transition-colors" />
          </div>
        </a>
      </motion.div>
    </section>
  )
}
