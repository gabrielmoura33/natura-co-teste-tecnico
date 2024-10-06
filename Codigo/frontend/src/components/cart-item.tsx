/* eslint-disable @next/next/no-img-element */
'use client'
import { Trash } from 'lucide-react'
import IncreaseButton from './increase-button'
import { CartItem as ICartItem } from '@/stores/useCartStore/interfaces'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { useCart } from '@/hooks/use-cart'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { useState } from 'react'

interface CartItemProps {
  key: string
  cartItem: ICartItem
}
export function CartItem({ key, cartItem }: CartItemProps) {
  const { product, quantity } = cartItem
  const { updateQuantity, removeProduct } = useCart()
  const [open, setOpen] = useState(false)

  const onUpdateQuantity = (quantity: number) => {
    updateQuantity(product._id, quantity)
  }

  const onRemove = () => {
    removeProduct(product._id)
    setOpen(false)
  }

  return (
    <div className="w-full h-[8rem] flex gap-8 relative" key={key}>
      <div className="h-full w-28">
        <img
          src={product.image}
          alt={product.description}
          className="h-full w-full rounded-sm"
        />
      </div>
      <section className="flex flex-col gap-16">
        <h1 className="text-xl font-bold">{product.name}</h1>
        <span className="textbase">{formatCurrencyBRL(product.price)}</span>
      </section>
      <IncreaseButton
        className="absolute bottom-0 right-5"
        value={quantity}
        max={15}
        onIncrease={() => onUpdateQuantity(quantity + 1)}
        onDecrease={() => onUpdateQuantity(quantity - 1)}
      />

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <button className="flex items-center text-red-400 absolute top-0 right-5">
            <Trash size={25} />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover este item do carrinho? Esta ação
              não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={onRemove}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
