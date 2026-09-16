'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Loader2, FileText, Mail, MapPin, Phone } from 'lucide-react'
import emailjs from '@emailjs/browser'

import { contactConfig } from '@/data/contact'
import { profile } from '@/data/profile'
import { siteConfig } from '@/data/site'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Button } from '@/components/ui/button'
import { SocialLinks } from '@/components/ui/social-links'
import { toastSuccess, toastError } from '@/components/ui/toast'
import { fadeInUp, staggerContainer, VIEWPORT_CONFIG } from '@/lib/animations'

/* ---------- Validation ---------- */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function validate(fields: { name: string; email: string; message: string }): FormErrors {
  const errors: FormErrors = {}
  if (!fields.name.trim()) errors.name = 'Name is required'
  if (!fields.email.trim()) {
    errors.email = 'Email is required'
  } else if (!EMAIL_REGEX.test(fields.email)) {
    errors.email = 'Please enter a valid email address'
  }
  if (!fields.message.trim()) errors.message = 'Message is required'
  return errors
}

/* ---------- Animation variants ---------- */

const containerVariants = staggerContainer(0.1, 0.1)

/* ---------- Spam cooldown (seconds) ---------- */
const COOLDOWN_SECONDS = 5

/* ---------- Component ---------- */

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, VIEWPORT_CONFIG)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [cooldown, setCooldown] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))

      // Clear error on edit if field was touched
      if (touched[name]) {
        setErrors((prev) => {
          const updated = { ...prev }
          delete updated[name as keyof FormErrors]
          return updated
        })
      }
    },
    [touched],
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target
      setTouched((prev) => ({ ...prev, [name]: true }))
      // Validate single field on blur
      const fieldErrors = validate(formData)
      if (fieldErrors[name as keyof FormErrors]) {
        setErrors((prev) => ({
          ...prev,
          [name]: fieldErrors[name as keyof FormErrors],
        }))
      }
    },
    [formData],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // Mark all fields as touched
      setTouched({ name: true, email: true, message: true })

      // Validate
      const fieldErrors = validate(formData)
      setErrors(fieldErrors)
      if (Object.keys(fieldErrors).length > 0) return

      const { serviceId, templateId, publicKey } = contactConfig.emailjs
      if (!serviceId || !templateId || !publicKey) {
        toastError('Email service is not configured. Please try again later.')
        return
      }

      setIsLoading(true)

      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
          { publicKey },
        )
        toastSuccess("Message sent successfully! I'll get back to you soon.")
        setFormData({ name: '', email: '', message: '' })
        setTouched({})
        setErrors({})

        // Anti-spam cooldown
        setCooldown(true)
        setTimeout(() => setCooldown(false), COOLDOWN_SECONDS * 1000)
      } catch {
        toastError('Failed to send message. Please try again or email me directly.')
      } finally {
        setIsLoading(false)
      }
    },
    [formData],
  )

  const inputBaseClass =
    'w-full rounded-lg border bg-card/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:border-primary/60 focus:shadow-glow'
  const inputDefaultBorder = 'border-border hover:border-primary/30'
  const inputErrorBorder = 'border-red-500/50'

  return (
    <section ref={ref} id="contact" className="relative scroll-mt-20 py-[var(--space-section)]">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section heading */}
          <motion.div variants={fadeInUp}>
            <SectionHeading
              title={contactConfig.heading}
              subtitle={contactConfig.subtitle}
              centered
            />
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-12 lg:grid-cols-5">
            {/* ---------- Contact Form (3 cols) ---------- */}
            <motion.div variants={fadeInUp} className="lg:col-span-3">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your name"
                    required
                    className={`${inputBaseClass} ${
                      errors.name ? inputErrorBorder : inputDefaultBorder
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="you@example.com"
                    required
                    className={`${inputBaseClass} ${
                      errors.email ? inputErrorBorder : inputDefaultBorder
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell me about your project or idea…"
                    required
                    className={`${inputBaseClass} resize-none ${
                      errors.message ? inputErrorBorder : inputDefaultBorder
                    }`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-300">{errors.message}</p>}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading || cooldown}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending…
                    </>
                  ) : cooldown ? (
                    'Message Sent ✓'
                  ) : (
                    <>
                      <Send className="size-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* ---------- Info Panel (2 cols) ---------- */}
            <motion.div variants={fadeInUp} className="flex flex-col gap-8 lg:col-span-2">
              {/* Download Resume */}
              <div className="border-border bg-card/30 hover:border-primary/40 hover:shadow-glow rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 ease-out">
                <h3 className="font-display text-lg font-semibold">Download Resume</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Get a copy of my full resume with detailed experience and skills.
                </p>
                <Button asChild size="lg" className="mt-4 w-full">
                  <a href={contactConfig.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="size-4" />
                    Download Resume
                  </a>
                </Button>
              </div>

              {/* Contact info */}
              <div className="space-y-4">
                <div className="group text-muted-foreground flex items-center gap-3 text-sm transition-colors duration-200">
                  <div className="border-border bg-card/50 text-primary group-hover:border-primary/50 group-hover:shadow-glow flex size-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ease-out group-hover:scale-105">
                    <Mail className="text-primary size-4" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Email</p>
                    <a
                      href={`mailto:${siteConfig.links.email}`}
                      className="hover:text-primary break-all transition-colors"
                    >
                      {siteConfig.links.email}
                    </a>
                  </div>
                </div>

                {profile.phone && (
                  <div className="group text-muted-foreground flex items-center gap-3 text-sm transition-colors duration-200">
                    <div className="border-border bg-card/50 text-primary group-hover:border-primary/50 group-hover:shadow-glow flex size-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ease-out group-hover:scale-105">
                      <Phone className="text-primary size-4" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium">Phone</p>
                      <a
                        href={`tel:${profile.phone}`}
                        className="hover:text-primary break-all transition-colors"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="group text-muted-foreground flex items-center gap-3 text-sm transition-colors duration-200">
                  <div className="border-border bg-card/50 text-primary group-hover:border-primary/50 group-hover:shadow-glow flex size-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ease-out group-hover:scale-105">
                    <MapPin className="text-primary size-4" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Location</p>
                    <p>{profile.location}</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <p className="text-muted-foreground mb-3 text-sm font-medium">Find me online</p>
                <SocialLinks />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
