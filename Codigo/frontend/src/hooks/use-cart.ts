import {
  getCartItems,
  addProductToCart,
  removeProductFromCart,
  updateProductQuantityInCart,
  setShippingCostInCart,
  applyCouponInCart,
} from '@/services/cart.service'
import { useCartStore } from '@/stores/useCartStore'
import { Product } from '@/stores/useCartStore/interfaces'
import { useAuth } from '@clerk/nextjs'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'

export const useCart = () => {
  const {
    cartItems,
    addProduct,
    removeProduct,
    updateQuantity,
    setShippingCost,
    recalculateTotals,
    subtotal,
    totalDiscount,
    totalAmount,
    shippingCost,
    setCartItems,
    applyCoupon,
  } = useCartStore()
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  useQuery({
    queryKey: ['cartItems'],
    queryFn: async () => {
      const token = await getToken()
      const items = await getCartItems({
        token,
      })
      setCartItems(items)
      recalculateTotals()
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  })

  const addProductMutation = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string
      quantity: number
    }) => {
      const token = await getToken()
      await addProductToCart(productId, quantity, token)
      queryClient.invalidateQueries({ queryKey: ['cartItems'] })
    },
  })

  const removeProductMutation = useMutation({
    mutationFn: async (productId: string) => {
      const token = await getToken()
      await removeProductFromCart(productId, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] })
    },
  })

  const applyCouponMutation = useMutation({
    mutationFn: async (couponCode: string) =>
      await applyCouponInCart(couponCode),
    onSuccess: (data) => {
      if (data.success) {
        applyCoupon(data.discount)
        queryClient.invalidateQueries({ queryKey: ['cartItems'] })
      }
    },
  })

  const updateQuantityMutation = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string
      quantity: number
    }) => {
      const token = await getToken()
      await updateProductQuantityInCart(productId, quantity, token)
      queryClient.invalidateQueries({ queryKey: ['cartItems'] })
    },
  })

  const setShippingCostMutation = useMutation({
    mutationFn: (cost: number) => setShippingCostInCart(cost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] })
    },
  })

  return {
    cartItems,
    addProduct: (product: Product, quantity = 1) => {
      addProductMutation.mutate({
        productId: product._id,
        quantity,
      })
      addProduct(product, quantity)
    },
    removeProduct: (productId: string) => {
      removeProductMutation.mutate(productId)
      removeProduct(productId)
    },
    updateQuantity: (productId: string, quantity: number) => {
      updateQuantityMutation.mutate({ productId, quantity })
      updateQuantity(productId, quantity)
    },
    setShippingCost: (cost: number) => {
      setShippingCostMutation.mutate(cost)
      setShippingCost(cost)
    },
    applyCoupon: (couponCode: string) => {
      applyCouponMutation.mutate(couponCode)
    },
    subtotal,
    totalDiscount,
    totalAmount,
    shippingCost,
  }
}
