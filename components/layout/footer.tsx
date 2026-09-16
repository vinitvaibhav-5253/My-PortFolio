'use client'

import { useCallback } from 'react'
import { ArrowUp, Heart } from 'lucide-react'

import { siteConfig } from '@/data/site'
import { Container } from '@/components/ui/container'
import { SocialLinks } from '@/components/ui/social-links'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <footer className="border-border bg-card/30 border-t">
      <Container className="py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Social links */}
          <SocialLinks />

          {/* Divider */}
          <div className="bg-border h-px w-16" aria-hidden="true" />

          {/* Credits */}
          <div className="text-muted-foreground flex flex-col items-center gap-2 text-center text-sm">
            <p>
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <p className="flex flex-wrap items-center justify-center gap-1">
              <span>Built with</span>
              <Heart className="text-primary inline size-3" aria-hidden="true" />
              <span>using Next.js, Tailwind CSS & Framer Motion</span>
            </p>
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group border-border bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-primary hover:shadow-glow inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 ease-out hover:scale-105 active:scale-95"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp className="size-3 transition-transform duration-200 group-hover:-translate-y-1" />
          </button>
        </div>
      </Container>
    </footer>
  )
}
