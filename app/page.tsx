import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import HowItWorks from '@/components/home/HowItWorks'
import Testimonials from '@/components/home/Testimonials'
import FAQ from '@/components/home/FAQ'
import CTA from '@/components/home/CTA'

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