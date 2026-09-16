'use client'

import { motion } from 'framer-motion'
import { EASING_SMOOTH } from '@/lib/animations'

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: EASING_SMOOTH }}
    >
      {children}
    </motion.div>
  )
}
