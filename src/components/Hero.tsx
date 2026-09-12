import { Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="px-8 pt-10 pb-8">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold tracking-wide uppercase mb-5">
          <Sparkles size={13} />
          Discover AI-Powered Tools
        </div>
        <h1 className="text-[2.5rem] leading-[1.15] font-bold text-gray-900 tracking-tight mb-4">
          Find the best AI tools
          <br />
          for your workflow
        </h1>
        <p className="text-base text-gray-500 leading-relaxed max-w-lg">
          Browse curated AI tools across categories — from code assistants to
          image generators. Streamline your creative and development process.
        </p>
      </div>
    </section>
  )
}
