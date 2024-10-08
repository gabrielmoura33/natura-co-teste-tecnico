'use client'
import { Tag } from 'lucide-react'
import { Button } from './ui/button'
import { Divisor } from './ui/divisor'
import { Input } from './ui/input'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { calculateDiscountPercentage } from '@/utils/calculateDiscount'
import { useCart } from '@/hooks/use-cart'
import { useForm } from 'react-hook-form'
import { useSale } from '@/hooks/use-sale'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export function CartSummary() {
  const { totalAmount, totalDiscount, subtotal, shippingCost, applyCoupon } =
    useCart()
  const { register, handleSubmit } = useForm()
  const { initiateSale } = useSale()
  const [isLoading, setIsLoading] = useState(false)
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const onSubmitCoupon = (data: any) => {
    const { couponCode } = data
    if (couponCode) {
      applyCoupon(couponCode)
    }
  }

  const onFinalizeSale = () => {
    if (isSignedIn) {
      setIsLoading(true)
      initiateSale()
      setIsLoading(false)
    } else {
      router.push('/sign-in')
    }
  }

  return (
    <div className="w-full flex flex-col h-[30rem] border rounded-[1rem] border-[#E5E5E5] py-8 px-4 gap-4 ">
      <h1 className="text-2xl font-bold">Sumário</h1>
      <div className="flex justify-between">
        <span className="font-bold text-xl text-g-250">Subtotal</span>
        <strong>{formatCurrencyBRL(subtotal)}</strong>
      </div>
      <div className="flex justify-between">
        <span className="font-bold text-xl text-g-250">
          Desconto
          {totalDiscount > 0 &&
            ` ${calculateDiscountPercentage(subtotal, totalAmount)}`}
        </span>
        <strong className="text-red-400">
          -{formatCurrencyBRL(totalDiscount)}
        </strong>
      </div>
      <div className="flex justify-between">
        <span className="font-bold text-xl text-g-250">Frete</span>
        <strong>{formatCurrencyBRL(shippingCost)}</strong>
      </div>
      <Divisor />
      <div className="flex justify-between">
        <h1 className="font-bold text-xl">Total</h1>
        <strong>{formatCurrencyBRL(totalAmount)}</strong>
      </div>
      <form onSubmit={handleSubmit(onSubmitCoupon)} className="flex gap-4">
        <Input
          icon={<Tag size={25} />}
          placeholder="Cupom"
          variant="rounded"
          {...register('couponCode')}
        />
        <Button
          disabled={totalAmount <= 0}
          className="bg-black text-white"
          variant="rounded"
          size="lg"
          type="submit"
        >
          Aplicar
        </Button>
      </form>
      <div className="flex gap-4">
        <Button
          variant="rounded"
          size="lg"
          className="bg-primary text-white w-full"
          disabled={totalAmount <= 0}
          onClick={onFinalizeSale}
          isLoading={isLoading}
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  )
}
