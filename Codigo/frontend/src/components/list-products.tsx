import { products } from '../../mock-products'
import { ListProduct } from './list-product'

export function ListProducts() {
  return (
    <div className="mt-6 w-full flex flex-col gap-8">
      {products.map((product) => (
        <ListProduct product={product} key={product._id} />
      ))}
    </div>
  )
}
