import type { Variants, Transition } from 'framer-motion'

/* ===================================================================
   Milky Smooth Easing Curves & Springs
   Crafted for zero-jank, 60-120 FPS hardware-accelerated animations.
   =================================================================== */

/** Quintic ease-out curve (Linear / Apple / Stripe grade) */
export const EASING_MILKY = [0.22, 1, 0.36, 1] as const
export const EASING_SMOOTH = [0.22, 1, 0.36, 1] as const
export const EASING_FAST = [0.16, 1, 0.3, 1] as const

/** Snappy micro-interaction spring (buttons, badges, icons) */
export const SPRING_SNAPPY: Transition = {
  type: 'spring',
  damping: 20,
  stiffness: 320,
  mass: 0.4,
}

/** Fluid spring for layout and card transitions */
export const SPRING_MILKY: Transition = {
  type: 'spring',
  damping: 26,
  stiffness: 200,
  mass: 0.6,
}

/** Bouncy spring for playful icons */
export const SPRING_BOUNCE: Transition = {
  type: 'spring',
  damping: 14,
  stiffness: 260,
  mass: 0.5,
}

export const DURATION_NORMAL = 0.5
export const DURATION_FAST = 0.25
export const DURATION_SLOW = 0.8

export const TRANSITION_SMOOTH: Transition = {
  duration: DURATION_NORMAL,
  ease: EASING_MILKY,
}

export const TRANSITION_FAST: Transition = {
  duration: DURATION_FAST,
  ease: EASING_MILKY,
}

/** Standard viewport configuration: triggers once when 15% visible */
export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.15,
} as const

/* ===================================================================
   Hardware-Accelerated Entrance Variants (Zero Blur Filter Overhead)
   =================================================================== */

/** Stagger container for section children */
export function staggerContainer(staggerChildren = 0.08, delayChildren = 0.05): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }
}

export const containerVariants: Variants = staggerContainer(0.08, 0.05)

/** Fade in from below with GPU transform */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_NORMAL,
      ease: EASING_MILKY,
    },
  },
}

/** Simple opacity fade */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: TRANSITION_SMOOTH,
  },
}

/** Directional fade in from left */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION_NORMAL,
      ease: EASING_MILKY,
    },
  },
}

/** Directional fade in from right */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION_NORMAL,
      ease: EASING_MILKY,
    },
  },
}

/** Subtle scale-in for cards, badges, and avatars */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION_NORMAL,
      ease: EASING_MILKY,
    },
  },
}

/** Fast badge scale-in */
export const badgeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: SPRING_SNAPPY,
  },
}

/** Editorial Masked Word Reveal */
export const textRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
}

export const textRevealWord: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: EASING_MILKY,
    },
  },
}

/** Smooth accordion expand / collapse (transform & opacity based, no layout reflow) */
export const accordionVariants: Variants = {
  collapsed: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: EASING_SMOOTH,
    },
  },
  expanded: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: EASING_SMOOTH,
    },
  },
}

/** Hover & tap micro-interaction presets */
export const hoverScale = {
  subtle: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: SPRING_SNAPPY,
  },
  badge: {
    whileHover: { scale: 1.05, y: -1 },
    whileTap: { scale: 0.96 },
    transition: SPRING_SNAPPY,
  },
  icon: {
    whileHover: { scale: 1.1, y: -1 },
    whileTap: { scale: 0.94 },
    transition: SPRING_SNAPPY,
  },
  card: {
    whileHover: { y: -4 },
    transition: SPRING_MILKY,
  },
}
