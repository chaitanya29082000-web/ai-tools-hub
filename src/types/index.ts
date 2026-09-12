import type { LucideIcon } from 'lucide-react'

export interface Category {
  id: string
  name: string
  description: string
  icon: LucideIcon
  toolCount: number
  color: string
}

export interface Tool {
  id: string
  name: string
  description: string
  category: string
  url: string
  icon: LucideIcon
  color: string
  tags: string[]
  featured: boolean
}

export type ToolInput = Omit<Tool, 'id' | 'icon'>

export interface SidebarItem {
  id: string
  label: string
  icon: LucideIcon
  active?: boolean
}
