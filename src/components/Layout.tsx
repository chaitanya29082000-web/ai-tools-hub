import Sidebar from './Sidebar'
import Header from './Header'

interface LayoutProps {
  children: React.ReactNode
  search?: string
  onSearchChange?: (v: string) => void
}

export default function Layout({ children, search = '', onSearchChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50/80">
      <Sidebar />
      <div className="pl-[248px] transition-all duration-200">
        <Header search={search} onSearchChange={onSearchChange} />
        <div className="max-w-[1400px]">{children}</div>
      </div>
    </div>
  )
}
