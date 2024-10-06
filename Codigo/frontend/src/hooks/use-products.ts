'use client'
import { getProducts } from '@/services/products.service'
import { useProductStore } from '@/stores/useProductsStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useProducts = (
  search: string = '',
  page: number = 1,
  limit: number = 10,
) => {
  const { products, setProducts, setPagination } = useProductStore()
  const { data, isLoading, isSuccess, error } = useQuery({
    enabled: true,
    queryKey: ['products', search, page, limit],
    queryFn: async () => {
      const data = await getProducts(search, page, limit)
      return data
    },
  })

  useEffect(() => {
    if (data) {
      setProducts(data.products)
      setPagination(data.currentPage, data.totalPages, data.totalProducts)
    }
  }, [data, isSuccess, setPagination, setProducts])

  return {
    products,
    isLoading,
    error,
    currentPage: useProductStore((state) => state.currentPage),
    totalPages: useProductStore((state) => state.totalPages),
    totalProducts: useProductStore((state) => state.totalProducts),
  }
}
