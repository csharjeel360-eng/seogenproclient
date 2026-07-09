import LlmsGeneratorClient from '@/components/generators/LlmsGeneratorClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free LLMS.txt Generator - Create an AI-Friendly LLMS.txt File Online',
  description:
    'Generate a valid LLMS.txt file for your website in seconds. Help AI assistants and large language models discover your content with an optimized LLMS.txt file—free and easy to use.',
  keywords: 'llms.txt generator, llms creator, ai indexing, seo tools',
  alternates: { canonical: 'https://seogenpro.online/llms-generator' },
}

export default function LlmsGeneratorPage() {
  return <LlmsGeneratorClient />
}
