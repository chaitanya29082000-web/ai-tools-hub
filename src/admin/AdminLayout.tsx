import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Wrench,
  FolderOpen,
  PanelLeftClose,
  Shield,
  LogOut,
} from 'lucide-react'
import { useAuth } from './AuthContext'

const adminNav = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/tools', label: 'Manage Tools', icon: Wrench },
  { to: '/admin/categories', label: 'Categories', icon: FolderOpen },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50/80">
      <aside
        className={`fixed left-0 top-0 z-30 h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-200 ease-in-out ${
          collapsed ? 'w-[68px]' : 'w-[248px]'
        }`}
      >
        <div className={`flex items-center h-16 border-b border-gray-100 ${collapsed ? 'justify-center px-2' : 'px-5'}`}>
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
                <Shield size={14} className="text-white" />
              </div>
              <span className="text-[15px] font-semibold text-gray-900 tracking-tight">
                Admin Panel
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors ${collapsed ? '' : 'ml-auto'}`}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <PanelLeftClose
              size={18}
              className={`transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {adminNav.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                    collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2'
                  } ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Icon size={18} strokeWidth={1.5} className="flex-shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            )
          })}
        </nav>

        <div className="px-3 py-3 border-t border-gray-100 space-y-0.5">
          <NavLink
            to="/"
            className={`w-full flex items-center gap-3 rounded-lg text-[13px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
              collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2'
            }`}
          >
            <PanelLeftClose size={18} strokeWidth={1.5} className="flex-shrink-0" />
            {!collapsed && <span>Back to App</span>}
          </NavLink>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 rounded-lg text-[13px] font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors ${
              collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2'
            }`}
          >
            <LogOut size={18} strokeWidth={1.5} className="flex-shrink-0" />
            {!collapsed && <span>Log out</span>}
          </button>
        </div>
      </aside>

      <div
        className={`transition-all duration-200 ${
          collapsed ? 'pl-[68px]' : 'pl-[248px]'
        }`}
      >
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-200/80">
          <div className="flex items-center h-16 px-8">
            <h1 className="text-lg font-semibold text-gray-900">Admin</h1>
          </div>
        </header>
        <main className="p-8 max-w-[1400px]">{children}</main>
      </div>
    </div>
  )
}
