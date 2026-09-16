import { cn } from '@/lib/utils'

interface GridBackgroundProps {
  className?: string
  children?: React.ReactNode
}

export function GridBackground({ className, children }: GridBackgroundProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Dot grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Animated rose glow orb */}
      <div
        className="animate-glow-drift gpu-accelerated pointer-events-none absolute -top-1/4 left-1/2 h-[600px] w-[600px] rounded-full opacity-60 blur-[60px] sm:blur-[90px]"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--glow-color) / 0.2) 0%, hsl(var(--glow-color) / 0.05) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Noise texture overlay */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
        aria-hidden="true"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Fade mask at bottom edge */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
