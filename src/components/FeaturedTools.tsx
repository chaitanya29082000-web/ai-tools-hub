import { useAdmin } from '../admin/AdminContext'
import FeaturedToolCard from './FeaturedToolCard'

export default function FeaturedTools() {
  const { tools } = useAdmin()
  const featured = tools.filter((t) => t.featured)

  if (featured.length === 0) return null

  return (
    <section id="featured-section" className="px-8 pb-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">Featured Tools</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {featured.map((tool) => (
          <FeaturedToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  )
}
