import { CartItem } from '@/stores/useCartStore/interfaces'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getCartItems = async (): Promise<CartItem[]> => {
  const response = await axios.get(`${API_URL}/cart`)
  return response.data.cartItems || []
}

export const addProductToCart = async (
  productId: string,
  quantity: number,
): Promise<void> => {
  await axios.post(`${API_URL}/cart/add`, { productId, quantity })
}

export const removeProductFromCart = async (
  productId: string,
): Promise<void> => {
  await axios.delete(`${API_URL}/cart/remove/${productId}`)
}

export const updateProductQuantityInCart = async (
  productId: string,
  quantity: number,
): Promise<void> => {
  await axios.put(`${API_URL}/cart/update`, { productId, quantity })
}

export const setShippingCostInCart = async (cost: number): Promise<void> => {
  await axios.put(`${API_URL}/cart/shipping`, { cost })
}
