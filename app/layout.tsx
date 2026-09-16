import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'

import { siteConfig } from '@/data/site'
import { profile } from '@/data/profile'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Toaster } from '@/components/ui/toast'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { AnimationProvider } from '@/components/providers/animation-provider'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#0d0b0c',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Vinit Vaibhav Kumar',
    'AI engineer',
    'ML engineer',
    'full-stack developer',
    'portfolio',
    'react',
    'next.js',
    'typescript',
    'generative AI',
    'machine learning',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@vinitvaibhav',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

/* ---------- JSON-LD Person Schema ---------- */

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  url: siteConfig.url,
  email: `mailto:${siteConfig.links.email}`,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  description: siteConfig.description,
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.twitter],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Galgotias University',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Greater Noida',
      addressCountry: 'IN',
    },
  },
  knowsAbout: [
    'Machine Learning',
    'Generative AI',
    'Natural Language Processing',
    'React',
    'Next.js',
    'TypeScript',
    'AWS Bedrock',
    'Full-Stack Development',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: profile.location,
    addressCountry: 'IN',
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans antialiased">
        {/* Skip-to-content link for keyboard/screen-reader users */}
        <a
          href="#main-content"
          className="bg-primary text-primary-foreground focus:ring-ring fixed top-2 left-2 z-[100] -translate-y-full rounded-md px-4 py-2 text-sm font-medium transition-transform focus:translate-y-0 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          Skip to main content
        </a>

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <AnimationProvider>
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </AnimationProvider>
      </body>
    </html>
  )
}
