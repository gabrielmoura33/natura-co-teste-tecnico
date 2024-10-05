'use client'
import { products } from '../../mock-products'
import { HomeProduct } from './home-product'
import { Button } from './ui/button'

type Props = {
  title: string
}
export function HomeContainer({ title }: Props) {
  return (
    <div className="p-8 flex flex-col w-full">
      <div className="w-full px-20">
        <h1 className="mb-6 text-4xl font-bold">{title}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        {products.map((product) => (
          <HomeProduct product={product} key={product._id} />
        ))}
      </div>

      <div className="mt-6 w-full flex justify-center">
        <Button variant="rounded" size="lg">
          Carregar outros
        </Button>
      </div>
    </div>
  )
}
