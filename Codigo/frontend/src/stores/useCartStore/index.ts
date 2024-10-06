import { create } from 'zustand'
import { CartItem, CartState, Product } from './interfaces'

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  shippingCost: 0,
  subtotal: 0,
  totalDiscount: 0,
  totalAmount: 0,
  couponDiscount: 0,
  appliedCoupon: '',

  setCartItems: (items: CartItem[]) => {
    set({ cartItems: items })
    get().recalculateTotals()
  },

  addProduct: (product: Product, quantity = 1) => {
    const cartItems = [...get().cartItems]
    const existingItem = cartItems.find(
      (item) => item.product._id === product._id,
    )
    const totalDesiredQuantity = existingItem
      ? existingItem.quantity + quantity
      : quantity

    const finalQuantity = Math.min(totalDesiredQuantity, product.stock)

    if (existingItem) {
      existingItem.quantity = finalQuantity
    } else {
      cartItems.push({ product, quantity: finalQuantity })
    }

    set({ cartItems })
    get().recalculateTotals()
  },

  removeProduct: (productId: string) => {
    const cartItems = get().cartItems.filter(
      (item) => item.product._id !== productId,
    )
    set({ cartItems })
    get().recalculateTotals()
  },

  updateQuantity: (productId: string, quantity: number) => {
    const cartItems = [...get().cartItems]
    const item = cartItems.find((item) => item.product._id === productId)

    if (item) {
      const finalQuantity = Math.min(quantity, item.product.stock)
      item.quantity = finalQuantity
      set({ cartItems })
      get().recalculateTotals()
    }
  },

  setShippingCost: (cost: number) => {
    set({ shippingCost: cost })
    get().recalculateTotals()
  },

  recalculateTotals: () => {
    const { cartItems, shippingCost } = get()

    const subtotal = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    )

    const totalDiscount = cartItems.reduce(
      (total, item) =>
        total +
        (item.product.originalPrice - item.product.price) * item.quantity,
      0,
    )

    const totalAmount = subtotal + shippingCost

    set({ subtotal, totalDiscount, totalAmount })
  },

  applyCoupon: (couponCode: string) => {
    const validCoupons = {
      EASTER_EGG: 10,
      FRESCORDEVAGA: 20,
      SABORDEVITORIA: 30,
      NATURA: 100,
    } as {
      [key: string]: number
    }

    if (validCoupons[couponCode]) {
      const discount = validCoupons[couponCode] * get().subtotal
      set({ couponDiscount: discount, appliedCoupon: couponCode })
    } else {
      set({ couponDiscount: 0, appliedCoupon: '' })
    }

    get().recalculateTotals()
  },
}))
