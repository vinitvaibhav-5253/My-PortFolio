<div align="center">

# 🚀 Vinit Vaibhav Kumar — Portfolio

**AIML Specialist | Full-Stack Developer | IT Service Desk Analyst**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-vinitvaibhav.online-00C853?style=for-the-badge)](https://vinitvaibhav.online)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)

<br />

<p align="center">
  <strong>A modern, performant, and fully responsive portfolio website</strong><br/>
  built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, and shadcn/ui.
</p>

<br />

[**View Live →**](https://vinitvaibhav.online) · [**Report Bug →**](https://github.com/vinitvaibhav-5253/My-PortFolio/issues) · [**Request Feature →**](https://github.com/vinitvaibhav-5253/My-PortFolio/issues)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| ⚡ **Blazing Fast** | Built on Next.js 16 App Router with React 19 — lazy-loaded sections for optimal performance |
| 🎨 **Stunning Animations** | Smooth scroll-triggered animations powered by Framer Motion |
| 📱 **Fully Responsive** | Pixel-perfect across mobile, tablet, and desktop screens |
| 🌙 **Dark Mode** | Elegant dark theme with carefully curated color palette |
| 🧩 **Component-Driven** | Modular architecture with shadcn/ui + Radix UI primitives |
| 📧 **Working Contact Form** | Dual email integration (Web3Forms + EmailJS) with Gmail fallback |
| 🔍 **SEO Optimized** | JSON-LD structured data, Open Graph, Twitter Cards, and meta tags |
| ♿ **Accessible** | Skip-to-content links, semantic HTML, ARIA labels, and keyboard navigation |
| 📊 **Scroll Progress** | Visual scroll progress indicator at the top of the page |
| 🖋️ **Typography** | Inter, Space Grotesk & JetBrains Mono fonts — optimized with `next/font` |

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technologies |
|-------|-------------|
| **Framework** | Next.js 16 (App Router), React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4, CSS Variables |
| **UI Components** | shadcn/ui, Radix UI |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Contact Form** | Web3Forms, EmailJS |
| **Fonts** | Inter, Space Grotesk, JetBrains Mono |
| **Linting** | ESLint 9, Prettier |
| **Deployment** | Vercel |

</div>

---

## 📂 Project Structure

```
portfolio/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, metadata, SEO)
│   ├── page.tsx                  # Home page — assembles all sections
│   └── globals.css               # Global styles & Tailwind directives
│
├── components/
│   ├── layout/                   # Structural components
│   │   ├── navbar.tsx            # Responsive navigation bar
│   │   ├── footer.tsx            # Site footer
│   │   └── page-transition.tsx   # Page entrance animation wrapper
│   │
│   ├── sections/                 # Portfolio sections
│   │   ├── hero.tsx              # Hero / landing section
│   │   ├── about.tsx             # About me
│   │   ├── skills.tsx            # Skills & technologies
│   │   ├── projects.tsx          # Featured projects showcase
│   │   ├── experience.tsx        # Work experience timeline
│   │   ├── resume.tsx            # Resume download section
│   │   └── contact.tsx           # Contact form
│   │
│   ├── ui/                       # Reusable UI primitives
│   │   ├── badge.tsx             # Badge component
│   │   ├── button.tsx            # Button variants (shadcn/ui)
│   │   ├── card.tsx              # Card component
│   │   ├── container.tsx         # Max-width container
│   │   ├── grid-background.tsx   # Animated grid background
│   │   ├── scroll-progress.tsx   # Scroll progress indicator
│   │   ├── section-heading.tsx   # Section title component
│   │   ├── social-links.tsx      # Social media links
│   │   └── toast.tsx             # Toast notifications
│   │
│   └── providers/
│       └── animation-provider.tsx # Framer Motion lazy provider
│
├── data/                         # Static content & configuration
│   ├── site.ts                   # Site metadata, URLs, nav links
│   ├── profile.ts                # Personal profile data
│   ├── projects.ts               # Project entries
│   ├── skills.ts                 # Skill categories
│   ├── experience.ts             # Work experience entries
│   ├── education.ts              # Education history
│   ├── certifications.ts         # Professional certifications
│   ├── contact.ts                # Contact form config
│   └── types.ts                  # TypeScript interfaces
│
├── lib/                          # Utility functions
│   └── animations.ts             # Framer Motion animation variants
│
├── public/
│   ├── images/                   # Static images (profile photo)
│   └── resume/                   # Downloadable resume PDF
│
├── .env.example                  # Environment variable template
├── .gitignore                    # Git ignore rules
├── components.json               # shadcn/ui configuration
├── eslint.config.mjs             # ESLint 9 configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies & scripts
├── postcss.config.mjs            # PostCSS + Tailwind setup
├── tsconfig.json                 # TypeScript configuration
└── .prettierrc                   # Prettier formatting rules
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.17
- **npm** ≥ 9 (or yarn / pnpm / bun)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/vinitvaibhav-5253/My-PortFolio.git
cd My-PortFolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys (see Environment Variables below)

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (with hot reload) |
| `npm run build` | Create optimized production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint checks |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting without modifying files |
| `npm run typecheck` | Run TypeScript type checking |

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory. See [`.env.example`](.env.example) for the template.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Optional | [Web3Forms](https://web3forms.com) access key for contact form |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Optional | [EmailJS](https://emailjs.com) service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Optional | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Optional | EmailJS public key |

> **Note:** If no email service keys are configured, the contact form gracefully falls back to a direct Gmail / mailto link.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                    Next.js 16                    │
│                  (App Router)                    │
├────────────────────┬────────────────────────────┤
│   Server Layer     │     Client Layer           │
│                    │                            │
│  • layout.tsx      │  • Hero (eager)            │
│  • SEO metadata    │  • About     ┐            │
│  • JSON-LD schema  │  • Skills    │            │
│  • Font loading    │  • Projects  ├ lazy loaded│
│                    │  • Experience│            │
│                    │  • Resume    │            │
│                    │  • Contact   ┘            │
├────────────────────┴────────────────────────────┤
│              Framer Motion Animations            │
├─────────────────────────────────────────────────┤
│          shadcn/ui + Radix UI Primitives         │
├─────────────────────────────────────────────────┤
│       Tailwind CSS 4 + CSS Custom Properties     │
└─────────────────────────────────────────────────┘
```

---

## 🎨 Sections Overview

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Full-screen landing with name, title, tagline, CTA buttons, and animated grid background |
| 2 | **About** | Personal introduction, education, certifications, and background |
| 3 | **Skills** | Categorized skill cards — IT Support, AI/ML, Programming, Tools & Platforms |
| 4 | **Projects** | Featured project cards with tech stack badges, role, and key highlights |
| 5 | **Experience** | Professional experience timeline with responsibilities |
| 6 | **Resume** | One-click resume download section |
| 7 | **Contact** | Working contact form with dual email service support |

---

## 🌐 Deployment

This project is deployed on **Vercel**. Every push to `main` triggers an automatic deployment.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vinitvaibhav-5253/My-PortFolio)

### Manual Deployment

```bash
# Build for production
npm run build

# Preview the production build
npm run start
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 📬 Contact

<div align="center">

| Platform | Link |
|----------|------|
| 🌐 **Website** | [vinitvaibhav.online](https://vinitvaibhav.online) |
| 📧 **Email** | [vinitvaibhav5253@gmail.com](mailto:vinitvaibhav5253@gmail.com) |
| 💼 **LinkedIn** | [vinit-vaibhav-13b089344](https://linkedin.com/in/vinit-vaibhav-13b089344) |
| 🐙 **GitHub** | [vinitvaibhav-5253](https://github.com/vinitvaibhav-5253) |
| 🐦 **Twitter / X** | [@vinitvaibhav_53](https://x.com/vinitvaibhav_53) |

</div>

---

<div align="center">

**⭐ If you found this helpful, please star this repository!**

Made with ❤️ by [Vinit Vaibhav Kumar](https://vinitvaibhav.online)

</div>
