'use client'
import { getProducts } from '@/services/products.service'
import { Product } from '@/stores/useCartStore/interfaces'
import { useProductStore } from '@/stores/useProductsStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useProducts = (
  search: string = '',
  page: number = 1,
  limit: number = 4,
) => {
  const { products, updateProducts, setProducts, setPagination } =
    useProductStore()
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
      if (page > 1 && data.products.length > 0) {
        updateProducts((prevProducts: Product[]) => [
          ...prevProducts,
          ...data.products,
        ])
      } else if (data.products.length > 0) {
        setProducts(data.products)
      } else {
        setProducts([])
      }
      setPagination(data.currentPage, data.totalPages, data.totalProducts)
    }
  }, [data, isSuccess, search, setPagination, setProducts, updateProducts])

  return {
    products,
    isLoading,
    error,
    currentPage: useProductStore((state) => state.currentPage),
    totalPages: useProductStore((state) => state.totalPages),
    totalProducts: useProductStore((state) => state.totalProducts),
  }
}
