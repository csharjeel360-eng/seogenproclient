import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact SEO Gen Pro',
  description: 'Get in touch with SEO Gen Pro for support, questions, or custom SEO tool needs.',
  alternates: {
    canonical: 'https://seogenpro.online/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
