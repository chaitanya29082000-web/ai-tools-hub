import { useAdmin } from './AdminContext'
import { Wrench, FolderOpen, Star, BarChart3 } from 'lucide-react'

export default function AdminDashboard() {
  const { tools, categories } = useAdmin()
  const featuredCount = tools.filter((t) => t.featured).length

  const stats = [
    { label: 'Total Tools', value: tools.length, icon: Wrench, color: '#6366f1' },
    { label: 'Categories', value: categories.length, icon: FolderOpen, color: '#8b5cf6' },
    { label: 'Featured', value: featuredCount, icon: Star, color: '#f59e0b' },
    { label: 'Total Tags', value: new Set(tools.flatMap((t) => t.tags)).size, icon: BarChart3, color: '#10b981' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white border border-gray-200 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}10` }}
                >
                  <Icon size={20} style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
