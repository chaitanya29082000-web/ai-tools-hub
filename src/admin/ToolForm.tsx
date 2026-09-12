import { useState } from 'react'
import type { Tool } from '../types'
import { iconMap } from '../data/mockData'

export interface ToolFormData {
  name: string
  description: string
  category: string
  url: string
  color: string
  iconKey: string
  tags: string[]
  featured: boolean
}

interface ToolFormProps {
  tool?: Tool | null
  categories: { id: string; name: string }[]
  onSave: (data: ToolFormData) => void
  onCancel: () => void
}

const iconOptions = Object.keys(iconMap)

export default function ToolForm({ tool, categories, onSave, onCancel }: ToolFormProps) {
  const [name, setName] = useState(tool?.name ?? '')
  const [description, setDescription] = useState(tool?.description ?? '')
  const [url, setUrl] = useState(tool?.url ?? '')
  const [categoryId, setCategoryId] = useState(tool?.category ?? '')
  const [color, setColor] = useState(tool?.color ?? '#6366f1')
  const [iconKey, setIconKey] = useState(() => {
    if (tool) {
      return Object.keys(iconMap).find((k) => iconMap[k] === tool.icon) ?? 'PenTool'
    }
    return 'PenTool'
  })
  const [tagsInput, setTagsInput] = useState(tool?.tags.join(', ') ?? '')
  const [featured, setFeatured] = useState(tool?.featured ?? false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      name,
      description,
      category: categoryId,
      url,
      color,
      iconKey,
      tags: tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      featured,
    })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">
        {tool ? 'Edit Tool' : 'Add New Tool'}
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
              URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="flex gap-2">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. AI, writing, productivity"
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer px-3 py-2.5">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Featured tool
              </span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
          >
            {tool ? 'Save Changes' : 'Add Tool'}
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
