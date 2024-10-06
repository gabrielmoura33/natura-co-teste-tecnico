import {
  getCartItems,
  addProductToCart,
  removeProductFromCart,
  updateProductQuantityInCart,
  setShippingCostInCart,
} from '@/services/cart.service'
import { useCartStore } from '@/stores/useCartStore'
import { Product } from '@/stores/useCartStore/interfaces'
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
  } = useCartStore()
  const queryClient = useQueryClient()

  useQuery({
    queryKey: ['cartItems'],
    queryFn: async () => {
      const items = await getCartItems()
      setCartItems(items)
      recalculateTotals()
    },
  })

  const addProductMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string
      quantity: number
    }) => addProductToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] })
    },
  })

  const removeProductMutation = useMutation({
    mutationFn: (productId: string) => removeProductFromCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] })
    },
  })

  const updateQuantityMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string
      quantity: number
    }) => updateProductQuantityInCart(productId, quantity),
    onSuccess: () => {
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
      addProductMutation.mutate({ productId: product._id, quantity })
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
    subtotal,
    totalDiscount,
    totalAmount,
    shippingCost,
  }
}
