/* eslint-disable @next/next/no-img-element */
import { Product } from '@/stores/useCartStore/interfaces'
import Rating from './ui/rating'
import { formatCurrencyBRL } from '@/utils/formatCurrency'

interface HomeProduct {
  key: string
  product: Product
}

export function HomeProduct({
  product: { price, originalPrice, name, image, description, rating },
  key,
}: HomeProduct) {
  return (
    <div className="w-full flex align-center flex-col gap-4" key={key}>
      <div className="h-full w-full">
        <img
          src={image}
          alt={description}
          className="h-full w-full rounded-2xl"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold ">{name}</h1>
        <div className="mt-2 flex flex-col gap-4">
          <Rating rating={rating} />
          <div className="flex flex-col">
            {originalPrice !== price && (
              <span className="text-lg font-bold text-gray-300 line-through">
                {formatCurrencyBRL(originalPrice)}
              </span>
            )}
            <span className="text-xl font-bold ">
              {formatCurrencyBRL(price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
