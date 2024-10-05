'use client'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { CartItem } from '../cart-item'
import { Divisor } from './divisor'
import { useCartStore } from '@/stores/useCartStore'
import LottieEmptyCart from '../empty-cart'

export function CartList() {
  const { cartItems } = useCartStore()
  return (
    <ScrollArea className="w-full flex flex-col h-[34rem] border border-[#E5E5E5] rounded-[1rem] py-8 px-4 gap-4">
      {cartItems.length === 0 && <LottieEmptyCart />}
      {cartItems.map((item) => (
        <>
          <CartItem cartItem={item} key={item.product._id} />
          <Divisor />
        </>
      ))}
    </ScrollArea>
  )
}
