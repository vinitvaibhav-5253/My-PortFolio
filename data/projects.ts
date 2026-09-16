import type { Project } from './types'

export const projects: Project[] = [
  {
    title: 'Email Spam Detection System',
    description:
      'A machine learning-based binary classification system engineered with Scikit-learn and NLP techniques to classify incoming emails and filter spam with high precision.',
    techStack: ['Python', 'Scikit-learn', 'NLP', 'TF-IDF', 'Pandas'],
    role: 'ML & NLP Developer',
    highlights: [
      'Engineered a binary classification pipeline achieving ~95% spam detection accuracy with precision, recall, and F1-score optimization.',
      'Implemented full NLP workflow including tokenisation, stop-word removal, and TF-IDF feature extraction.',
      'Produced structured technical documentation replicating enterprise knowledge-base standards.',
    ],
    imageUrl: undefined,
    liveUrl: undefined,
    githubUrl: 'https://github.com/vinitvaibhav-5253',
    featured: true,
  },
  {
    title: 'Traffic Accident Analysis Dashboard',
    description:
      'An exploratory data analysis pipeline and analytical dashboard revealing high-risk traffic accident patterns and streamlining automated reporting.',
    techStack: ['Python', 'Pandas', 'Matplotlib', 'EDA', 'Data Visualization'],
    role: 'Data Analyst & Developer',
    highlights: [
      'Conducted in-depth EDA on large-scale accident datasets to identify critical spatial and temporal risk factors.',
      'Automated data processing and reporting pipelines, reducing manual analysis effort by 40%.',
      'Delivered professional analytical reports simulating IT incident reporting standards.',
    ],
    imageUrl: undefined,
    liveUrl: undefined,
    githubUrl: 'https://github.com/vinitvaibhav-5253',
    featured: false,
  },
  {
    title: 'OEMS – Online Examination Management System',
    description:
      'A comprehensive web application enabling educational institutions to manage question banks, schedule exams, and evaluate student submissions automatically.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    role: 'Full-Stack Developer',
    highlights: [
      'Built a responsive full-stack system with role-based access control for students and administrators.',
      'Designed dynamic question bank management, timed assessment sessions, and instant automated grading.',
      'Engineered real-time score report generation and secure relational database storage.',
    ],
    imageUrl: undefined,
    liveUrl: undefined,
    githubUrl: 'https://github.com/vinitvaibhav-5253',
    featured: false,
  },
  {
    title: 'Glimra (formerly Inspira)',
    description:
      'A Pinterest-style AI-powered pin-sharing platform built for students in India, facilitating academic resource discovery, inspiration boards, and community collaboration.',
    techStack: ['React Native', 'Expo', 'Firebase', 'AWS Bedrock (Claude)', 'MySQL'],
    role: 'Lead Full-Stack Developer & AI Engineer',
    highlights: [
      'AI-powered content recommendations via Claude on AWS Bedrock',
      'OTP-based auth flow with EmailJS and social login integration',
      'Collaborative student resource sharing boards with responsive mobile layout',
    ],
    imageUrl: undefined,
    liveUrl: undefined,
    githubUrl: 'https://github.com/vinitvaibhav-5253',
    featured: false,
  },
]

