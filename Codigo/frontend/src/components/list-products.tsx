'use client'
import { useState } from 'react'
import { useProducts } from '@/hooks/use-products'
import { ListProduct } from './list-product'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import LottieEmptySearch from './empty-search'

export function ListProducts() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const searchQuery = searchParams.get('search') || ''
  const pageQuery = parseInt(searchParams.get('page') || '1', 10)

  const [page, setPage] = useState(pageQuery)

  const { products, isLoading, error, totalPages } = useProducts(
    searchQuery,
    page,
    10,
  )

  const handleLoadMore = async () => {
    const nextPage = page + 1
    setPage(nextPage)
    router.replace(`?search=${searchQuery}&page=${nextPage}`)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading products</div>

  return (
    <div className="mt-6 w-full flex flex-col gap-8">
      {products.length === 0 && <LottieEmptySearch />}
      {products.map((product) => (
        <ListProduct product={product} key={product._id} />
      ))}
      {page < totalPages && (
        <div className="mt-6 w-full flex justify-center">
          <Button
            variant="rounded"
            size="lg"
            onClick={handleLoadMore}
            isLoading={isLoading}
          >
            Carregar outros
          </Button>
        </div>
      )}
    </div>
  )
}
