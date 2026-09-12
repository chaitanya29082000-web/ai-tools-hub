import { useState } from 'react'
import type { Category } from '../types'
import { iconMap } from '../data/mockData'

interface CategoryFormProps {
  category?: Category | null
  onSave: (data: Omit<Category, 'id' | 'toolCount'>) => void
  onCancel: () => void
}

const iconOptions = Object.keys(iconMap)

export default function CategoryForm({ category, onSave, onCancel }: CategoryFormProps) {
  const [name, setName] = useState(category?.name ?? '')
  const [description, setDescription] = useState(category?.description ?? '')
  const [color, setColor] = useState(category?.color ?? '#6366f1')
  const [iconKey, setIconKey] = useState(() => {
    if (category) {
      return Object.keys(iconMap).find((k) => iconMap[k] === category.icon) ?? 'PenTool'
    }
    return 'PenTool'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      name,
      description,
      color,
      icon: iconMap[iconKey],
    })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">
        {category ? 'Edit Category' : 'Add New Category'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon
            </label>
            <select
              value={iconKey}
              onChange={(e) => setIconKey(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {iconOptions.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <div className="flex gap-2 max-w-xs">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
          >
            {category ? 'Save Changes' : 'Add Category'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
