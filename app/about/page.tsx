import type { Metadata } from 'next'
import Link from 'next/link'
import { Users, Target, Heart, Award, Github, Twitter, Linkedin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About SEO Gen Pro',
  description: 'Learn about SEO Gen Pro, our mission, values, and the team building free SEO tools for search engines and AI crawlers.',
  alternates: {
    canonical: 'https://seogenpro.online/about',
  },
}

const team = [
  {
    name: 'Sharjeel',
    role: 'Founder & CEO',
    bio: 'SEO expert with 15+ years of experience in digital marketing.',
    image: '/images/founder.jpeg',
    social: { twitter: '#', linkedin: '#', github: '#' }
  }
]

const stats = [
  { label: 'Files Generated', value: '50K+', icon: '🚀' },
  { label: 'Happy Users', value: '10K+', icon: '😊' },
  { label: 'Countries', value: '50+', icon: '🌍' },
  { label: 'Uptime', value: '99.9%', icon: '⚡' }
]

const values = [
  {
    icon: Target,
    title: 'Mission',
    description: 'To make SEO accessible to everyone by providing free, professional-grade tools.'
  },
  {
    icon: Heart,
    title: 'Values',
    description: 'We believe in transparency, privacy, and putting users first in everything we do.'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building a community of SEO professionals who help each other succeed.'
  },
  {
    icon: Award,
    title: 'Quality',
    description: 'Committed to delivering the highest quality tools that follow SEO best practices.'
  }
]

export default function AboutPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            About
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Us
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're on a mission to help website owners optimize their sites for search engines and AI crawlers
          </p>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              SEO Generator Pro was founded in 2023 with a simple idea: SEO tools should be free, powerful, and easy to use. We noticed that many website owners struggled with technical SEO files like robots.txt and sitemaps, so we built tools that do the heavy lifting for them.
            </p>
            <p className="text-gray-600 mb-4">
              As AI technology evolved, we saw the need for a new standard: llms.txt. We added AI-powered features to help websites prepare for the AI-driven future of search.
            </p>
            <p className="text-gray-600">
              Today, we've helped over 10,000 websites improve their SEO and prepare for AI crawlers. And we're just getting started.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 gap-8 max-w-lg mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full object-contain"
                  style={{ height: '948px', maxHeight: '600px' }}
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-3">
                    <a href={member.social.twitter} className="text-gray-400 hover:text-blue-600">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-600">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={member.social.github} className="text-gray-400 hover:text-blue-600">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start optimizing your website today with our free SEO tools
          </p>
          <Link href="/robots-generator" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  )
}