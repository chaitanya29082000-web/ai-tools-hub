import { useState } from 'react'
import { Plus, Pencil, Trash2, ExternalLink, Star, Wrench } from 'lucide-react'
import { useAdmin } from './AdminContext'
import ToolForm from './ToolForm'
import ConfirmDialog from './ConfirmDialog'
import ToastContainer from './Toast'
import { useToasts, useConfirm } from './useUiState'
import type { Tool } from '../types'
import { iconMap } from '../data/mockData'

export default function ToolsManager() {
  const { tools, categories, addTool, updateTool, deleteTool } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [editingTool, setEditingTool] = useState<Tool | null>(null)
  const [filterCategory, setFilterCategory] = useState('')
  const { toasts, addToast, dismissToast } = useToasts()
  const { confirm, requestConfirm, closeConfirm } = useConfirm()

  const filtered = filterCategory
    ? tools.filter((t) => t.category === filterCategory)
    : tools

  const handleSave = (data: import('./ToolForm').ToolFormData) => {
    const icon = iconMap[data.iconKey] ?? iconMap['PenTool']
    try {
      if (editingTool) {
        updateTool(editingTool.id, { ...data, icon })
        addToast('success', `"${data.name}" updated successfully.`)
      } else {
        addTool({ ...data, icon, id: `tool-${Date.now()}` })
        addToast('success', `"${data.name}" added successfully.`)
      }
      setShowForm(false)
      setEditingTool(null)
    } catch {
      addToast('error', 'Something went wrong. Please try again.')
    }
  }

  const handleEdit = (tool: Tool) => {
    setEditingTool(tool)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    const tool = tools.find((t) => t.id === id)
    const name = tool?.name ?? 'this tool'
    requestConfirm(
      'Delete tool',
      `Are you sure you want to delete "${name}"? This action cannot be undone.`,
      () => {
        try {
          deleteTool(id)
          addToast('success', `"${name}" deleted.`)
        } catch {
          addToast('error', 'Failed to delete tool.')
        }
      },
      'Delete'
    )
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingTool(null)
  }

  return (
    <div>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      {confirm.open && (
        <ConfirmDialog
          title={confirm.title}
          message={confirm.message}
          confirmLabel={confirm.confirmLabel}
          onConfirm={() => { confirm.onConfirm(); closeConfirm() }}
          onCancel={closeConfirm}
        />
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Tools</h2>
        <button
          onClick={() => { setEditingTool(null); setShowForm(true) }}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} />
          Add Tool
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <ToolForm
            key={editingTool?.id ?? 'new'}
            tool={editingTool}
            categories={categories}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="mb-4">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Wrench size={24} className="text-gray-400" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            {filterCategory ? 'No tools in this category' : 'No tools yet'}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {filterCategory
              ? 'Try selecting a different category or clear the filter.'
              : 'Get started by adding your first tool.'}
          </p>
          {!filterCategory && (
            <button
              onClick={() => { setEditingTool(null); setShowForm(true) }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <Plus size={18} />
              Add Tool
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tool</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tags</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tool) => {
                const Icon = tool.icon
                const cat = categories.find((c) => c.id === tool.category)
                return (
                  <tr key={tool.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${tool.color}10` }}>
                          <Icon size={18} style={{ color: tool.color }} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{tool.name}</p>
                          <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-indigo-600 flex items-center gap-1">
                            {tool.url.replace('https://', '')}
                            <ExternalLink size={10} />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-gray-600">{cat?.name ?? tool.category}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {tool.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{tag}</span>
                        ))}
                        {tool.tags.length > 3 && <span className="text-xs text-gray-400">+{tool.tags.length - 3}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {tool.featured ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-md text-xs font-medium">
                          <Star size={12} />Featured
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded-md text-xs font-medium">Standard</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(tool)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-indigo-600 transition-colors">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(tool.id)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
