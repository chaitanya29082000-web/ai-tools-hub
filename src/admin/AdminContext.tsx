/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { Tool, Category } from '../types'
import { initialTools, categories as initialCategories, iconMap } from '../data/mockData'

interface AdminContextValue {
  tools: Tool[]
  categories: Category[]
  addTool: (tool: Tool) => void
  updateTool: (id: string, updates: Partial<Tool>) => void
  deleteTool: (id: string) => void
  addCategory: (category: Category) => void
  updateCategory: (id: string, updates: Partial<Category>) => void
  deleteCategory: (id: string) => void
}

const AdminContext = createContext<AdminContextValue | null>(null)

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}

// --- Serializable shapes ---

interface SerTool {
  id: string
  name: string
  description: string
  category: string
  url: string
  color: string
  iconKey: string
  tags: string[]
  featured: boolean
}

interface SerCategory {
  id: string
  name: string
  description: string
  color: string
  iconKey: string
  toolCount: number
}

// --- Helpers ---

function findIconKey(icon: LucideIcon): string {
  return Object.keys(iconMap).find((k) => iconMap[k] === icon) ?? 'PenTool'
}

function serTool(t: Tool): SerTool {
  return {
    id: t.id, name: t.name, description: t.description,
    category: t.category, url: t.url, color: t.color,
    iconKey: findIconKey(t.icon), tags: t.tags, featured: t.featured,
  }
}

function deserTool(d: SerTool): Tool | null {
  if (!d?.id || !d?.name) return null
  return {
    id: d.id, name: d.name, description: d.description ?? '',
    category: d.category ?? '', url: d.url ?? '',
    color: d.color ?? '#6366f1',
    icon: iconMap[d.iconKey] ?? iconMap['PenTool'],
    tags: Array.isArray(d.tags) ? d.tags : [],
    featured: Boolean(d.featured),
  }
}

function serCat(c: Category): SerCategory {
  return {
    id: c.id, name: c.name, description: c.description,
    color: c.color, iconKey: findIconKey(c.icon), toolCount: c.toolCount,
  }
}

function deserCat(d: SerCategory): Category | null {
  if (!d?.id || !d?.name) return null
  return {
    id: d.id, name: d.name, description: d.description ?? '',
    color: d.color ?? '#6366f1',
    icon: iconMap[d.iconKey] ?? iconMap['PenTool'],
    toolCount: typeof d.toolCount === 'number' ? d.toolCount : 0,
  }
}

const KEY_TOOLS = 'ai-tools-hub:tools'
const KEY_CATS = 'ai-tools-hub:categories'

function loadTools(): Tool[] {
  try {
    const raw = localStorage.getItem(KEY_TOOLS)
    if (!raw) return initialTools
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return initialTools
    const items = parsed.map(deserTool).filter((t): t is Tool => t !== null)
    return items.length > 0 ? items : initialTools
  } catch {
    return initialTools
  }
}

function loadCategories(): Category[] {
  try {
    const raw = localStorage.getItem(KEY_CATS)
    if (!raw) return initialCategories
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return initialCategories
    const items = parsed.map(deserCat).filter((c): c is Category => c !== null)
    return items.length > 0 ? items : initialCategories
  } catch {
    return initialCategories
  }
}

function save(key: string, data: unknown[]) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // storage full or unavailable
  }
}

// --- Provider ---

export function AdminProvider({ children }: { children: ReactNode }) {
  const [tools, setTools] = useState<Tool[]>(loadTools)
  const [categories, setCategories] = useState<Category[]>(loadCategories)

  useEffect(() => {
    save(KEY_TOOLS, tools.map(serTool))
  }, [tools])

  useEffect(() => {
    save(KEY_CATS, categories.map(serCat))
  }, [categories])

  const addTool = (tool: Tool) => setTools((prev) => [...prev, tool])
  const updateTool = (id: string, updates: Partial<Tool>) =>
    setTools((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  const deleteTool = (id: string) =>
    setTools((prev) => prev.filter((t) => t.id !== id))

  const addCategory = (category: Category) =>
    setCategories((prev) => [...prev, category])
  const updateCategory = (id: string, updates: Partial<Category>) =>
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  const deleteCategory = (id: string) =>
    setCategories((prev) => prev.filter((c) => c.id !== id))

  return (
    <AdminContext.Provider
      value={{
        tools, categories,
        addTool, updateTool, deleteTool,
        addCategory, updateCategory, deleteCategory,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}
