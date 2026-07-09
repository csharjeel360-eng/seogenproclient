import { Metadata } from 'next'
import RobotsGenerator from '@/components/generators/RobotsGenerator'

export const metadata: Metadata = {
  title: 'Free Robots.txt Generator - Create an SEO-Friendly Robots.txt File Online',
  description:
    'Generate a valid robots.txt file in seconds. Control search engine crawlers, improve website SEO, and create a customized robots.txt file for Google, Bing, and AI crawlers—for free.',
  keywords: 'robots.txt generator, robots.txt creator, seo tools, crawler control',
  alternates: { canonical: 'https://seogenpro.online/robots-generator' },
}

export default function RobotsGeneratorPage() {
  return <RobotsGenerator />
}