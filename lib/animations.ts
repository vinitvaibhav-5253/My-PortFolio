import type { Variants, Transition } from 'framer-motion'

/* ===================================================================
   Shared Animation Curves & Timings
   Designed for the Rose Titanium theme: snappy, fluid, and modern.
   =================================================================== */

export const EASING_SMOOTH = [0.22, 1, 0.36, 1] as const
export const EASING_SPRING = [0.16, 1, 0.3, 1] as const

export const DURATION_NORMAL = 0.5
export const DURATION_FAST = 0.25
export const DURATION_SLOW = 0.7

export const TRANSITION_SMOOTH: Transition = {
  duration: DURATION_NORMAL,
  ease: EASING_SMOOTH,
}

export const TRANSITION_FAST: Transition = {
  duration: DURATION_FAST,
  ease: EASING_SMOOTH,
}

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.1,
} as const

/* ===================================================================
   Shared Animation Variants
   =================================================================== */

/** Stagger container for section children */
export function staggerContainer(staggerChildren = 0.1, delayChildren = 0.1): Variants {
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

/** Default container variant with 0.1s stagger */
export const containerVariants: Variants = staggerContainer(0.1, 0.1)

/** Fade in from below with subtle 20px translation (avoids layout shift) */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_SMOOTH,
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
    transition: TRANSITION_SMOOTH,
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
    transition: TRANSITION_SMOOTH,
  },
}

/** Subtle scale-in for cards, badges, and avatars */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: TRANSITION_SMOOTH,
  },
}

/** Fast badge scale-in for tag clouds and skill pills */
export const badgeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: TRANSITION_FAST,
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
    transition: { duration: 0.2, ease: EASING_SMOOTH },
  },
  badge: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.96 },
    transition: { duration: 0.15, ease: EASING_SMOOTH },
  },
  icon: {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.92 },
    transition: { duration: 0.15, ease: EASING_SMOOTH },
  },
}
