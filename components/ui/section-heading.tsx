'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeadingProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const isBarInView = useInView(barRef, { once: true, amount: 0.5 })

  return (
    <div className={cn(centered && 'text-center', 'mb-12', className)}>
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-muted-foreground mt-4 max-w-2xl text-base sm:text-lg',
            centered && 'mx-auto',
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        ref={barRef}
        className={cn(
          'bg-primary mt-4 h-1 w-12 rounded-full origin-left transition-transform duration-700',
          centered && 'mx-auto',
          isBarInView ? 'scale-x-100' : 'scale-x-0',
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        aria-hidden="true"
      />
    </div>
  )
}
