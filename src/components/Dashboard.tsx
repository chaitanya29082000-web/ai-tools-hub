import { useState } from 'react'
import Layout from './Layout'
import Hero from './Hero'
import CategoriesGrid from './CategoriesGrid'
import FeaturedTools from './FeaturedTools'
import ToolsGrid from './ToolsGrid'
import { useAdmin } from '../admin/AdminContext'

function Dashboard() {
  const { tools, categories } = useAdmin()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = selectedCategory ? tool.category === selectedCategory : true
    if (!matchesCategory) return false
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.tags.some((t) => t.toLowerCase().includes(q)) ||
      categories.some((c) => c.id === tool.category && c.name.toLowerCase().includes(q))
    )
  })

  return (
    <Layout search={search} onSearchChange={setSearch}>
      <Hero />
      <ToolsGrid
        tools={filteredTools}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        search={search}
      />
      <CategoriesGrid
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <FeaturedTools />
    </Layout>
  )
}

export default Dashboard
