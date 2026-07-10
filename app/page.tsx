import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import HowItWorks from '@/components/home/HowItWorks'
import Testimonials from '@/components/home/Testimonials'
import FAQ from '@/components/home/FAQ'
import CTA from '@/components/home/CTA'

export const metadata: Metadata = {
  title: 'Free SEO Tools for Robots.txt, Sitemap.xml & LLMS.txt',
  description: 'Generate robots.txt, create XML sitemaps, build llms.txt files, and run AI crawlability audits with free SEO tools from SEO Gen Pro.',
  alternates: {
    canonical: 'https://seogenpro.online/',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  )
}