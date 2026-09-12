import type { Category } from '../types'

interface CategoryCardProps {
  category: Category
  toolCount: number
  isSelected?: boolean
  onSelect?: (id: string) => void
}

export default function CategoryCard({ category, toolCount, isSelected, onSelect }: CategoryCardProps) {
  const Icon = category.icon

  return (
    <button
      onClick={() => onSelect?.(isSelected ? '' : category.id)}
      className={`group text-left p-5 border rounded-2xl transition-all duration-150 ${
        isSelected
          ? 'bg-indigo-50/80 border-indigo-300 shadow-sm ring-1 ring-indigo-200'
          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md hover:shadow-gray-100'
      }`}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-3.5 transition-transform duration-150 group-hover:scale-105"
        style={{ backgroundColor: `${category.color}10` }}
      >
        <Icon size={21} style={{ color: category.color }} />
      </div>
      <h3 className={`text-[13px] font-semibold mb-1 transition-colors ${
        isSelected ? 'text-indigo-700' : 'text-gray-900 group-hover:text-indigo-600'
      }`}>
        {category.name}
      </h3>
      <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
        {category.description}
      </p>
      <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-medium ${
        isSelected
          ? 'bg-indigo-100 text-indigo-700'
          : 'bg-gray-100 text-gray-500'
      }`}>
        {toolCount} tool{toolCount !== 1 ? 's' : ''}
      </span>
    </button>
  )
}
