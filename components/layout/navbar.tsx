'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, FileText } from 'lucide-react'

import { cn } from '@/lib/utils'
import { navLinks, siteConfig } from '@/data/site'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  // Automatically close mobile menu and restore scroll on resize to tablet/desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false)
        document.body.style.overflow = ''
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-focus close button and trap focus within drawer
  useEffect(() => {
    if (!isMobileOpen) return

    // Focus the close button when drawer opens
    closeButtonRef.current?.focus()

    const drawer = drawerRef.current
    if (!drawer) return

    function handleKeyDown(e: KeyboardEvent) {
      // Close on Escape
      if (e.key === 'Escape') {
        setIsMobileOpen(false)
        return
      }

      // Trap Tab focus within the drawer
      if (e.key !== 'Tab') return

      const focusableElements = drawer!.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )

      if (focusableElements.length === 0) return

      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]

      if (!first || !last) return

      if (e.shiftKey) {
        // Shift+Tab: wrap from first to last
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        // Tab: wrap from last to first
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileOpen])

  const closeMobile = useCallback(() => {
    document.body.style.overflow = ''
    setIsMobileOpen(false)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          isScrolled
            ? 'border-border/50 bg-background/70 border-b backdrop-blur-xl'
            : 'bg-transparent',
        )}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between" aria-label="Main navigation">
            {/* Logo / Name */}
            <Link
              href="/"
              className="font-display hover:text-primary text-lg font-bold tracking-tight transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {siteConfig.name.split(' ').slice(0, 2).join(' ')}
              <span className="text-primary">.</span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md px-3 py-2 text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {link.label}
                </Link>
              ))}

              <div className="bg-border ml-2 h-5 w-px" aria-hidden="true" />

              <Button asChild size="sm" className="ml-2">
                <a href="/resume/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="size-4" />
                  Resume
                </a>
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 inline-flex size-10 items-center justify-center rounded-md transition-all duration-200 hover:scale-105 active:scale-95 md:hidden"
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-nav-drawer"
            >
              {isMobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile slide-in drawer */}
      {/* Backdrop */}
      <div
        className={cn(
          'bg-background/60 fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          isMobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        aria-hidden={!isMobileOpen}
        className={cn(
          'border-border bg-card/95 fixed inset-y-0 right-0 z-50 flex h-dvh w-72 max-w-[calc(100vw-2.5rem)] flex-col border-l backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden',
          isMobileOpen
            ? 'pointer-events-auto visible translate-x-0 opacity-100'
            : 'pointer-events-none invisible translate-x-full opacity-0',
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-end px-4">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMobile}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 inline-flex size-10 items-center justify-center rounded-md transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav
          className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-4 pb-6"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className="text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 hover:translate-x-1 active:scale-[0.98]"
            >
              {link.label}
            </Link>
          ))}

          <div className="bg-border my-3 h-px w-full shrink-0" aria-hidden="true" />

          <Button asChild size="lg" className="w-full shrink-0" onClick={closeMobile}>
            <a href="/resume/resume.pdf" target="_blank" rel="noopener noreferrer">
              <FileText className="size-4" />
              Resume
            </a>
          </Button>
        </nav>
      </div>
    </>
  )
}
