import { useAdmin } from '../admin/AdminContext'
import CategoryCard from './CategoryCard'

interface CategoriesGridProps {
  selectedCategory?: string | null
  onCategorySelect?: (id: string) => void
}

export default function CategoriesGrid({ selectedCategory, onCategorySelect }: CategoriesGridProps) {
  const { categories } = useAdmin()

  return (
    <section className="px-8 pb-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
        {selectedCategory && (
          <button
            onClick={() => onCategorySelect?.('')}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Clear filter
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onSelect={onCategorySelect}
          />
        ))}
      </div>
    </section>
  )
}
