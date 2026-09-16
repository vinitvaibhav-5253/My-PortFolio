'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Send,
  Loader2,
  FileText,
  Mail,
  MapPin,
  Phone,
  Copy,
  Check,
  ExternalLink,
  X,
} from 'lucide-react'
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

/* ---------- Helper to construct direct email URLs ---------- */
function getEmailUrls(name: string, email: string, message: string) {
  const subject = `Portfolio Inquiry from ${name || 'Website Visitor'}`
  const body = `Hi Vinit,\n\n${message || 'I would like to get in touch with you.'}\n\n---\nSender Name: ${
    name || 'Not provided'
  }\nSender Email: ${email || 'Not provided'}`

  const targetEmail = contactConfig.targetEmail || siteConfig.links.email

  const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    targetEmail,
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  return { subject, body, targetEmail, mailtoUrl, gmailUrl }
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
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedMessage, setCopiedMessage] = useState(false)
  const [showFallbackModal, setShowFallbackModal] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))

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

  const handleCopyEmail = useCallback(async () => {
    const emailToCopy = contactConfig.targetEmail || siteConfig.links.email
    try {
      await navigator.clipboard.writeText(emailToCopy)
      setCopiedEmail(true)
      toastSuccess('Email address copied to clipboard!')
      setTimeout(() => setCopiedEmail(false), 2500)
    } catch {
      toastError('Could not copy email automatically.')
    }
  }, [])

  const handleCopyFormattedMessage = useCallback(async () => {
    const { body, targetEmail } = getEmailUrls(formData.name, formData.email, formData.message)
    const textToCopy = `To: ${targetEmail}\n\n${body}`
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopiedMessage(true)
      toastSuccess('Message copied to clipboard!')
      setTimeout(() => setCopiedMessage(false), 2500)
    } catch {
      toastError('Could not copy message automatically.')
    }
  }, [formData])

  const handleOpenGmailDirect = useCallback(() => {
    const { gmailUrl } = getEmailUrls(formData.name, formData.email, formData.message)
    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
  }, [formData])

  const handleOpenDefaultMail = useCallback(() => {
    const { mailtoUrl } = getEmailUrls(formData.name, formData.email, formData.message)
    window.location.href = mailtoUrl
  }, [formData])

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      setTouched({ name: true, email: true, message: true })

      const fieldErrors = validate(formData)
      setErrors(fieldErrors)
      if (Object.keys(fieldErrors).length > 0) return

      const web3FormsKey =
        contactConfig.web3forms?.accessKey || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || ''
      const { serviceId, templateId, publicKey } = contactConfig.emailjs
      const isWeb3FormsConfigured = Boolean(web3FormsKey)
      const isEmailJsConfigured = Boolean(serviceId && templateId && publicKey)

      // Fallback if no backend service is configured yet
      if (!isWeb3FormsConfigured && !isEmailJsConfigured) {
        setShowFallbackModal(true)
        // Automatically attempt opening email client for maximum convenience
        handleOpenGmailDirect()
        toastSuccess('Opening Gmail compose window with your message...')
        return
      }

      setIsLoading(true)

      try {
        if (isWeb3FormsConfigured) {
          const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              access_key: web3FormsKey,
              name: formData.name,
              email: formData.email,
              message: formData.message,
              subject: `New Portfolio Message from ${formData.name}`,
              from_name: formData.name,
            }),
          })
          const data = await res.json()
          if (!data.success) {
            throw new Error(data.message || 'Web3Forms submission failed')
          }
        } else if (isEmailJsConfigured) {
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
        }

        toastSuccess("Message sent successfully! I'll get back to you soon.")
        setFormData({ name: '', email: '', message: '' })
        setTouched({})
        setErrors({})

        setCooldown(true)
        setTimeout(() => setCooldown(false), COOLDOWN_SECONDS * 1000)
      } catch {
        // In case of any network or API issue, gracefully show direct email fallback
        toastError('Email service connection issue. Opening direct email options...')
        setShowFallbackModal(true)
      } finally {
        setIsLoading(false)
      }
    },
    [formData, handleOpenGmailDirect],
  )

  const inputBaseClass =
    'w-full rounded-lg border bg-card/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:border-primary/60 focus:shadow-glow'
  const inputDefaultBorder = 'border-border hover:border-primary/30'
  const inputErrorBorder = 'border-red-500/50'

  const targetEmail = contactConfig.targetEmail || siteConfig.links.email

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

                {/* Submit & Secondary action */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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

                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={handleOpenGmailDirect}
                    className="w-full sm:w-auto border-border hover:border-primary/40 text-foreground/90 hover:text-primary transition-colors"
                  >
                    <Mail className="size-4 text-primary" />
                    Open in Gmail
                  </Button>
                </div>

                <p className="text-muted-foreground/70 text-xs">
                  Prefer direct email? Send directly to{' '}
                  <a
                    href={`mailto:${targetEmail}`}
                    className="text-primary hover:underline transition-colors"
                  >
                    {targetEmail}
                  </a>
                </p>
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
                {/* Email Item with Copy & Direct Compose */}
                <div className="group text-muted-foreground flex items-start gap-3 text-sm transition-colors duration-200">
                  <div className="border-border bg-card/50 text-primary group-hover:border-primary/50 group-hover:shadow-glow flex size-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ease-out group-hover:scale-105">
                    <Mail className="text-primary size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-medium">Email</p>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2">
                      <a
                        href={`mailto:${targetEmail}`}
                        className="hover:text-primary break-all transition-colors font-medium text-foreground/90"
                      >
                        {targetEmail}
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1 rounded border border-border bg-card/60 px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                        title="Copy email address"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="size-3 text-emerald-400" />
                            <span className="text-emerald-400 font-medium">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="mt-1.5 flex items-center gap-3 text-xs">
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary/80 hover:text-primary hover:underline transition-colors"
                      >
                        Compose in Gmail <ExternalLink className="size-3" />
                      </a>
                    </div>
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

      {/* ---------- Direct Email Fallback Modal ---------- */}
      <AnimatePresence>
        {showFallbackModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFallbackModal(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="border-border bg-card/95 relative z-10 w-full max-w-lg rounded-2xl border p-6 shadow-2xl backdrop-blur-md sm:p-8"
            >
              <button
                type="button"
                onClick={() => setShowFallbackModal(false)}
                className="text-muted-foreground hover:text-foreground absolute top-4 right-4 rounded-lg p-1 transition-colors"
                aria-label="Close dialog"
              >
                <X className="size-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="border-border bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl border">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">Send Message to Vinit</h3>
                  <p className="text-muted-foreground text-xs">{targetEmail}</p>
                </div>
              </div>

              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Your message is formatted and ready! Choose how you would like to send it:
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  type="button"
                  size="lg"
                  onClick={handleOpenGmailDirect}
                  className="w-full justify-center gap-2"
                >
                  <ExternalLink className="size-4" />
                  Open in Gmail (Web)
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleOpenDefaultMail}
                  className="w-full justify-center gap-2"
                >
                  <Mail className="size-4" />
                  Open Default Mail App (Outlook / Apple Mail)
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={handleCopyFormattedMessage}
                  className="w-full justify-center gap-2"
                >
                  {copiedMessage ? (
                    <>
                      <Check className="size-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      Copy Message & Email
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-6 border-t border-border/50 pt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Need to change anything? Close and edit form.
                </span>
                <button
                  type="button"
                  onClick={() => setShowFallbackModal(false)}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

