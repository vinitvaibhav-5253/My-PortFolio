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
        className={cn('bg-primary mt-4 h-1 w-12 rounded-full', centered && 'mx-auto')}
        aria-hidden="true"
      />
    </div>
  )
}
