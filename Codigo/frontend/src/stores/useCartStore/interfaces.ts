export interface Product {
  _id: string
  name: string
  description: string
  originalPrice: number
  price: number
  stock: number
  slug: string
  rating: number
  image: string
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
  couponDiscount: number
  appliedCoupon: string
  addProduct: (product: Product, quantity?: number) => void
  removeProduct: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  setShippingCost: (cost: number) => void
  recalculateTotals: () => void
  setCartItems: (items: CartItem[]) => void
  applyCoupon: (couponCode: string) => void
}
