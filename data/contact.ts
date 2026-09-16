import { siteConfig } from './site'

export const contactConfig = {
  heading: 'Get In Touch',
  subtitle: "Have a project in mind or want to collaborate? I'd love to hear from you.",
  resumeUrl: '/resume/resume.pdf',
  targetEmail: siteConfig.links.email,
  web3forms: {
    accessKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? '',
  },
  emailjs: {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
  },
} as const

