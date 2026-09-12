import { useState } from 'react'
import { Plus, Pencil, Trash2, FolderOpen } from 'lucide-react'
import { useAdmin } from './AdminContext'
import CategoryForm from './CategoryForm'
import ConfirmDialog from './ConfirmDialog'
import ToastContainer from './Toast'
import { useToasts, useConfirm } from './useUiState'
import type { Category } from '../types'

export default function CategoriesManager() {
  const { categories, tools, addCategory, updateCategory, deleteCategory } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const { toasts, addToast, dismissToast } = useToasts()
  const { confirm, requestConfirm, closeConfirm } = useConfirm()

  const handleSave = (data: Omit<Category, 'id' | 'toolCount'>) => {
    try {
      if (editingCategory) {
        updateCategory(editingCategory.id, data)
        addToast('success', `Category "${data.name}" updated.`)
      } else {
        addCategory({ ...data, id: `cat-${Date.now()}`, toolCount: 0 })
        addToast('success', `Category "${data.name}" added.`)
      }
      setShowForm(false)
      setEditingCategory(null)
    } catch {
      addToast('error', 'Something went wrong. Please try again.')
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    const catTools = tools.filter((t) => t.category === id)
    if (catTools.length > 0) {
      addToast('error', `Cannot delete: ${catTools.length} tool(s) still use this category.`)
      return
    }
    const cat = categories.find((c) => c.id === id)
    const name = cat?.name ?? 'this category'
    requestConfirm(
      'Delete category',
      `Are you sure you want to delete "${name}"? This action cannot be undone.`,
      () => {
        try {
          deleteCategory(id)
          addToast('success', `Category "${name}" deleted.`)
        } catch {
          addToast('error', 'Failed to delete category.')
        }
      },
      'Delete'
    )
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingCategory(null)
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
        <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
        <button
          onClick={() => { setEditingCategory(null); setShowForm(true) }}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <CategoryForm
            key={editingCategory?.id ?? 'new'}
            category={editingCategory}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}

      {categories.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FolderOpen size={24} className="text-gray-400" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">No categories yet</h3>
          <p className="text-sm text-gray-500 mb-4">Create your first category to organize tools.</p>
          <button
            onClick={() => { setEditingCategory(null); setShowForm(true) }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon
            const toolCount = tools.filter((t) => t.category === cat.id).length
            return (
              <div key={cat.id} className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}10` }}>
                    <Icon size={20} style={{ color: cat.color }} />
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleEdit(cat)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-indigo-600 transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(cat.id)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{cat.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{cat.description}</p>
                <span className="text-xs font-medium text-gray-400">
                  {toolCount} tool{toolCount !== 1 ? 's' : ''}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
