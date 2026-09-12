import { ExternalLink, Search } from 'lucide-react'
import type { Tool } from '../types'
import { useAdmin } from '../admin/AdminContext'

interface ToolsGridProps {
  tools: Tool[]
  selectedCategory?: string | null
  onCategorySelect?: (id: string) => void
  search?: string
}

export default function ToolsGrid({ tools, selectedCategory, onCategorySelect, search }: ToolsGridProps) {
  const { categories } = useAdmin()

  const getCatName = (catId: string) =>
    categories.find((c) => c.id === catId)?.name ?? catId

  const getCatColor = (catId: string) =>
    categories.find((c) => c.id === catId)?.color ?? '#6366f1'

  const isFiltered = Boolean(selectedCategory || search?.trim())

  return (
    <section className="px-8 pb-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          {isFiltered ? 'Filtered Tools' : 'All Tools'}
        </h2>
        {isFiltered && (
          <span className="text-sm text-gray-400">
            {tools.length} result{tools.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {tools.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Search size={22} className="text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">No tools found</p>
          <p className="text-xs text-gray-400">Try different keywords or clear your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {tools.map((tool) => {
            const Icon = tool.icon
            const catColor = getCatColor(tool.category)
            return (
              <div
                key={tool.id}
                className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-gray-300 hover:shadow-md hover:shadow-gray-100 transition-all duration-150 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3.5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-150 group-hover:scale-105"
                    style={{ backgroundColor: `${tool.color}10` }}
                  >
                    <Icon size={21} style={{ color: tool.color }} />
                  </div>
                  {selectedCategory ? (
                    <button
                      onClick={() => onCategorySelect?.('')}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md transition-colors"
                      style={{ backgroundColor: `${catColor}10`, color: catColor }}
                    >
                      {getCatName(tool.category)}
                    </button>
                  ) : (
                    <span
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                      style={{ backgroundColor: `${catColor}10`, color: catColor }}
                    >
                      {getCatName(tool.category)}
                    </span>
                  )}
                </div>
                <h3 className="text-[13px] font-semibold text-gray-900 mb-1.5">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">
                  {tool.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <div className="flex flex-wrap gap-1 min-w-0">
                    {tool.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded-md text-[11px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors flex-shrink-0 ml-2"
                  >
                    Open
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
