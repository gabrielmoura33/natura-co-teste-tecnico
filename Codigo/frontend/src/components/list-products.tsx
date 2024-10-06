'use client'
import { useProducts } from '@/hooks/use-products'
import { ListProduct } from './list-product'
import { useSearchParams } from 'next/navigation'

export function ListProducts() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const pageQuery = parseInt(searchParams.get('page') || '1', 10)

  const { products, isLoading, error } = useProducts(searchQuery, pageQuery)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading products</div>

  return (
    <div className="mt-6 w-full flex flex-col gap-8">
      {products.map((product) => (
        <ListProduct product={product} key={product._id} />
      ))}
    </div>
  )
}
