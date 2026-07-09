"use client"

import React from 'react'

export default function NewsletterForm() {
  return (
    <form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="blog-email" className="sr-only">
        Email address
      </label>
      <input
        id="blog-email"
        type="email"
        placeholder="you@company.com"
        className="flex-1 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="rounded-2xl bg-white px-7 py-3 font-semibold text-blue-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
      >
        Subscribe
      </button>
    </form>
  )
}
