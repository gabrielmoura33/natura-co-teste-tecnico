export interface Product {
  id: string
  name: string
  originalPrice: number
  discountedPrice: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  cartItems: CartItem[]
  shippingCost: number
  subtotal: number
  totalDiscount: number
  totalAmount: number
  addProduct: (product: Product, quantity?: number) => void
  removeProduct: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  setShippingCost: (cost: number) => void
  recalculateTotals: () => void
}
