'use client'
import { Tag } from 'lucide-react'
import { Button } from './ui/button'
import { Divisor } from './ui/divisor'
import { Input } from './ui/input'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { calculateDiscountPercentage } from '@/utils/calculateDiscount'
import { useCart } from '@/hooks/use-cart'

export function CartSummary() {
  const { totalAmount, totalDiscount, subtotal, shippingCost } = useCart()
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
            calculateDiscountPercentage(subtotal, totalAmount)}
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
      <div className="flex gap-4">
        <Input icon={<Tag size={25} />} placeholder="Cupom" variant="rounded" />
        <Button className="bg-black text-white" variant="rounded" size="lg">
          Aplicar
        </Button>
      </div>
      <div className="flex gap-4">
        <Button
          variant="rounded"
          size="lg"
          className="bg-primary text-white w-full"
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  )
}
