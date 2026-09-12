import { ExternalLink } from 'lucide-react'
import type { Tool } from '../types'
import { useAdmin } from '../admin/AdminContext'

interface FeaturedToolCardProps {
  tool: Tool
}

export default function FeaturedToolCard({ tool }: FeaturedToolCardProps) {
  const { categories } = useAdmin()
  const Icon = tool.icon
  const cat = categories.find((c) => c.id === tool.category)
  const catColor = cat?.color ?? '#6366f1'

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-5 bg-white border border-gray-200 rounded-2xl hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50 transition-all duration-150"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-150 group-hover:scale-105"
          style={{ backgroundColor: `${tool.color}12` }}
        >
          <Icon size={22} style={{ color: tool.color }} />
        </div>
        <ExternalLink
          size={14}
          className="text-gray-300 group-hover:text-indigo-400 transition-colors mt-1"
        />
      </div>
      <h3 className="text-[13px] font-semibold text-gray-900 mb-1.5 group-hover:text-indigo-600 transition-colors">
        {tool.name}
      </h3>
      <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
        {tool.description}
      </p>
      <span
        className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold"
        style={{ backgroundColor: `${catColor}10`, color: catColor }}
      >
        {cat?.name ?? tool.category}
      </span>
    </a>
  )
}
