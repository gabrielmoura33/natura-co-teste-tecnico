import { CartItem } from '@/stores/useCartStore/interfaces'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getCartItems = async ({
  token,
}: {
  token: string | null
}): Promise<CartItem[]> => {
  const response = await axios.get(`${API_URL}/cart`, {
    headers: {
      Authorization: token,
    },
  })
  return response.data?.cartItems || []
}

export const addProductToCart = async (
  productId: string,
  quantity: number,
  token: string | null,
): Promise<void> => {
  await axios.post(
    `${API_URL}/cart/add`,
    { productId, quantity },
    {
      headers: {
        Authorization: token,
      },
    },
  )
}

export const removeProductFromCart = async (
  productId: string,
  token: string | null,
): Promise<void> => {
  await axios.delete(`${API_URL}/cart/remove/${productId}`, {
    headers: {
      Authorization: token,
    },
  })
}

export const updateProductQuantityInCart = async (
  productId: string,
  quantity: number,
  token: string | null,
): Promise<void> => {
  await axios.put(
    `${API_URL}/cart/update`,
    { productId, quantity },
    {
      headers: {
        Authorization: token,
      },
    },
  )
}

export const setShippingCostInCart = async (cost: number): Promise<void> => {
  await axios.put(`${API_URL}/cart/shipping`, { cost })
}

export const applyCouponInCart = async (couponCode: string) => {
  const response = await axios.post(`${API_URL}/cart/apply-coupon`, {
    couponCode,
  })
  return response.data
}
