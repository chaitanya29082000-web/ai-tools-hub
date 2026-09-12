import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Home,
  LayoutGrid,
  Star,
  TrendingUp,
  Bookmark,
  Settings,
  HelpCircle,
  Shield,
  PanelLeftClose,
  type LucideIcon,
} from 'lucide-react'

interface SidebarItemData {
  id: string
  label: string
  icon: LucideIcon
  sectionId?: string
}

const navItems: SidebarItemData[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'categories', label: 'Categories', icon: LayoutGrid, sectionId: 'categories-section' },
  { id: 'featured', label: 'Featured', icon: Star, sectionId: 'featured-section' },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
]

const bottomItems: SidebarItemData[] = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help', icon: HelpCircle },
]

interface SidebarProps {
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
}

export default function Sidebar({ collapsed, onCollapsedChange }: SidebarProps) {
  const [activeId, setActiveId] = useState('home')
  const navigate = useNavigate()

  const handleNavClick = (item: SidebarItemData) => {
    setActiveId(item.id)
    if (item.sectionId) {
      const el = document.getElementById(item.sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    if (item.id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <aside
      className={`fixed left-0 top-0 z-30 h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-200 ease-in-out ${
        collapsed ? 'w-[68px]' : 'w-[248px]'
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 border-b border-gray-100 ${collapsed ? 'justify-center px-2' : 'px-5'}`}>
        {!collapsed && (
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <span className="text-[15px] font-semibold text-gray-900 tracking-tight truncate">
              Tools Hub
            </span>
          </div>
        )}
        <button
          onClick={() => onCollapsedChange(!collapsed)}
          className={`p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors ${collapsed ? '' : 'ml-auto'}`}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <PanelLeftClose
            size={18}
            className={`transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeId === item.id
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`w-full flex items-center gap-3 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2'
              } ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2 : 1.5} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-gray-100 space-y-0.5">
        <button
          onClick={() => navigate('/admin')}
          className={`w-full flex items-center gap-3 rounded-lg text-[13px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
            collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2'
          }`}
        >
          <Shield size={18} strokeWidth={1.5} className="flex-shrink-0" />
          {!collapsed && <span>Admin</span>}
        </button>
        {bottomItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 rounded-lg text-[13px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
                collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2'
              }`}
            >
              <Icon size={18} strokeWidth={1.5} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </div>
    </aside>
  )
}
