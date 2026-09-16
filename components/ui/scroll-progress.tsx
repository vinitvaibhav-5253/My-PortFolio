'use client'

import { motion, useScroll } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="from-primary via-primary to-accent pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r shadow-[0_0_10px_hsl(var(--glow-color)/0.6)]"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  )
}
