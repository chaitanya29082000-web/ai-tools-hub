import { Search, Bell } from 'lucide-react'

interface HeaderProps {
  search?: string
  onSearchChange?: (value: string) => void
}

export default function Header({ search = '', onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-200/80">
      <div className="flex items-center justify-between h-16 px-8">
        <div className="flex-1 max-w-lg">
          <div className="relative group">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search tools, categories, tags..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50/80 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white transition-all duration-150"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-6">
          <button className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-white" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center ml-1 shadow-sm">
            <span className="text-xs font-semibold text-white">U</span>
          </div>
        </div>
      </div>
    </header>
  )
}
