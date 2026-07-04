import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO Setup for Google Search Console',
  description: 'Submit your robots.txt, sitemap.xml, and llms.txt files to Google Search Console and improve crawlability.',
}

const checklist = [
  {
    title: 'Robots.txt',
    url: '/robots.txt',
    description: 'Controls crawler access and points Google to your sitemap.',
  },
  {
    title: 'Sitemap.xml',
    url: '/sitemap.xml',
    description: 'Lists your important URLs so search engines can discover them faster.',
  },
  {
    title: 'LLMS.txt',
    url: '/llms.txt',
    description: 'Helps AI crawlers understand your website structure and content.',
  },
]

export default function SeoSetupPage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-24 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Google Search Console Ready</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Submit your SEO files and improve indexing
        </h1>
        <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-300">
          This page gives you the core files Google and other crawlers need to understand your site. Submit the sitemap in Search Console and confirm that your robots and llms files are live.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {checklist.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
            <Link href={item.url} className="mt-4 inline-flex text-sm font-semibold text-cyan-600 hover:underline">
              Open {item.title}
            </Link>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-8 dark:border-cyan-900 dark:bg-cyan-950/40">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Google Search Console checklist</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-700 dark:text-slate-300">
          <li>Open Google Search Console and add your property.</li>
          <li>Submit your sitemap at <span className="font-semibold">/sitemap.xml</span>.</li>
          <li>Verify that <span className="font-semibold">/robots.txt</span> is reachable and does not block important pages.</li>
          <li>Confirm that <span className="font-semibold">/llms.txt</span> is available for AI crawlers.</li>
          <li>Use the URL inspection tool to test your homepage and key pages.</li>
        </ol>
      </div>
    </section>
  )
}
