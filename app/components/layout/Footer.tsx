import Link from 'next/link'
import { Facebook, Twitter, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  generators: [
    { name: 'Robots.txt Generator', href: '/robots-generator' },
    { name: 'Sitemap.xml Generator', href: '/sitemap-generator' },
    { name: 'LLMS.txt Generator', href: '/llms-generator' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ],
  support: [
    { name: 'Documentation', href: '/documentation' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" suppressHydrationWarning={true} className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-sm">
                <img src="/images/logo.svg" alt="SEO Generator Pro Logo" className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-semibold tracking-tight text-white">SEO Generator Pro</div>
                <div className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">AI SEO TOOLS</div>
              </div>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
              Professional SEO file generator tools for search engines, AI crawlers, and modern website optimization.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }, index) => (
                <a key={`${label}-${index}`} href={href} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-cyan-500 hover:text-white">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Generators', links: footerLinks.generators },
            { title: 'Company', links: footerLinks.company },
            { title: 'Support', links: footerLinks.support },
            { title: 'Legal', links: footerLinks.legal },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-100">{section.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} suppressHydrationWarning={true} className="text-sm text-slate-400 transition-colors hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:grid-cols-3">
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <MapPin className="h-4 w-4 text-cyan-400" />
            <span>Suite 301, Tech Hub, G-11 Markaz, Islamabad</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <Mail className="h-4 w-4 text-cyan-400" />
            <a href="mailto:teckysolutions360@gmail.com" className="transition-colors hover:text-white">
              teckysolutions360@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <Phone className="h-4 w-4 text-cyan-400" />
            <a href="tel:+923259579107" className="transition-colors hover:text-white">
              +92 325 957 9107
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} SEO Generator Pro. All rights reserved.</p>
          <p>Built for better indexing, visibility, and AI discoverability.</p>
        </div>
      </div>
    </footer>
  )
}