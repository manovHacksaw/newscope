import { NewsList } from '@/components/NewsList'
import { categories } from '@/utils/categories'
import { notFound } from 'next/navigation'

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}



export default function CategoryPage({
  params,
}: {
  params: { name: string }
}) {
  const category = params.name.toLowerCase() // Ensure case-insensitive matching

  const validCategories = categories.map((c) => c.name.toLowerCase())

  if (!validCategories.includes(category)) {
    notFound() // Trigger a 404 if the category is invalid
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {capitalize(category)} News
      </h1>
      <NewsList category={category} />
    </div>
  )
}

// Generate static params for all valid categories
export async function generateStaticParams() {
  return categories.map((category) => ({
    name: category.name.toLowerCase(),
  }))
}

