'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Code2, Cloud, Layers, CheckCircle2, Headphones, Terminal } from 'lucide-react'

import { skillCategories } from '@/data/skills'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { fadeInUp, staggerContainer, VIEWPORT_CONFIG } from '@/lib/animations'

const categoryIcons: Record<string, React.ElementType> = {
  'IT Support & Operations': Headphones,
  'AI & Machine Learning': Brain,
  'Programming & Web': Code2,
  'Tools & Platforms': Terminal,
  'AI/ML': Brain,
  'Web Development': Code2,
  'Cloud & Tools': Cloud,
}

const categoryDescriptions: Record<string, string> = {
  'IT Support & Operations':
    'Tier-1 Service Desk, incident triage, OS administration, SLA management, and technical troubleshooting.',
  'AI & Machine Learning':
    'Scikit-learn classification models, NLP text pipelines, exploratory data analysis, and predictive modeling.',
  'Programming & Web':
    'Object-oriented programming in C++, Java, and Python, alongside full-stack responsive web systems.',
  'Tools & Platforms':
    'Git/GitHub version control, VS Code, Google Colab, AWS Academy training, and enterprise documentation.',
}

const containerVariants = staggerContainer(0.12, 0.1)

export function Skills() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, VIEWPORT_CONFIG)

  return (
    <section ref={ref} id="skills" className="relative scroll-mt-20 py-24 sm:py-32">
      <Container>
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Curated proficiencies across IT Service Desk operations, Artificial Intelligence, software programming, and modern dev tools."
        />

        {/* Category Grid — Highly Scannable for Recruiters */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skillCategories.map((category) => {
            const IconComponent = categoryIcons[category.category] || Layers
            const description = categoryDescriptions[category.category]

            return (
              <motion.div
                key={category.category}
                variants={fadeInUp}
              >
                <Card className="group border-border/80 bg-card/80 hover:border-primary/40 hover:shadow-glow relative flex h-full flex-col justify-between overflow-hidden backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1">
                  {/* Subtle top accent gradient bar on hover */}
                  <div
                    className="from-primary/0 via-primary/50 to-primary/0 absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  <div>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="border-primary/20 bg-primary/10 text-primary group-hover:shadow-glow flex size-11 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105">
                          <IconComponent className="size-5" />
                        </div>
                        <span className="text-muted-foreground font-mono text-xs">
                          {category.skills.length} skills
                        </span>
                      </div>

                      <CardTitle className="mt-4 text-xl font-bold tracking-tight">
                        {category.category}
                      </CardTitle>
                      {description && (
                        <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                          {description}
                        </p>
                      )}
                    </CardHeader>

                    {/* Badge Grid with Interactive Glow */}
                    <CardContent className="pt-2">
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="border-border/60 bg-secondary/60 text-foreground hover:border-primary/50 hover:bg-primary/15 hover:text-primary inline-flex cursor-default items-center border px-3 py-1.5 text-xs font-medium break-words transition-all duration-200 hover:scale-105 hover:shadow-sm active:scale-95"
                          >
                            <span className="bg-primary/70 mr-1.5 size-1.5 shrink-0 rounded-full" />
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </div>

                  {/* Scannability footer hint */}
                  <div className="border-border/40 border-t px-6 py-3">
                    <div className="text-muted-foreground/80 flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="text-primary size-3 shrink-0" />
                      <span>Production & Academic project experience</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
