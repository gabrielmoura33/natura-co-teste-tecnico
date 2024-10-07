import { Product } from '@/stores/useCartStore/interfaces'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface ProductsResponse {
  products: Product[]
  currentPage: number
  totalPages: number
  totalProducts: number
}

export const getProducts = async (
  search: string = '',
  page: number = 1,
  limit: number = 10,
  token: string | null,
): Promise<ProductsResponse> => {
  const response = await axios.get(`${API_URL}/products`, {
    params: {
      search,
      page,
      limit,
    },
    headers: {
      Authorization: token,
    },
  })
  return response.data
}
