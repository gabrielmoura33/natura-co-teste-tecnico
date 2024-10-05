/* eslint-disable @next/next/no-img-element */
'use client'
import { Product } from '@/stores/useCartStore/interfaces'
import { Button } from './ui/button'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { useCartStore } from '@/stores/useCartStore'
import Rating from './ui/rating'
import { useState } from 'react'

interface ListProduct {
  key: string
  product: Product
}

export function ListProduct({ key, product }: ListProduct) {
  const { price, name, image, description, rating, originalPrice } = product
  const { addProduct } = useCartStore()
  const [loading, setLoading] = useState(false)
  function onAddProduct() {
    setLoading(true)
    addProduct(product)
    setLoading(false)
  }
  return (
    <div className="w-[43rem] h-[21rem] flex gap-8" key={key}>
      <div className="h-full w-full">
        <img
          src={image}
          alt={description}
          className="h-full w-full rounded-2xl"
        />
      </div>
      <div className="flex flex-col w-full py-8 justify-between">
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <strong className="text-xl font-bold">100ml</strong>
          <Rating rating={rating} />
        </div>

        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-300 line-through">
            {formatCurrencyBRL(originalPrice)}
          </span>
          <span className="text-xl font-bold">{formatCurrencyBRL(price)}</span>
        </div>
        <Button
          variant="rounded"
          size="lg"
          className="bg-primary text-white w-full"
          onClick={onAddProduct}
          isLoading={loading}
        >
          Adicionar
        </Button>
      </div>
    </div>
  )
}
