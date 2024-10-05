import { Product } from '@/stores/useCartStore/interfaces'

export const products: Product[] = [
  {
    _id: '1',
    name: 'Product A',
    originalPrice: 100,
    price: 80,
    stock: 5,
    slug: 'product-a',
    rating: 3.5,
    image:
      'https://m.media-amazon.com/images/I/71f16NperJL._AC_UF1000,1000_QL80_.jpg',
    description: 'Perfume produto A',
  },
  {
    _id: '2',
    name: 'Product B',
    originalPrice: 200,
    price: 150,
    stock: 10,
    slug: 'product-b',
    rating: 2.5,
    image:
      'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-br-storefront-catalog/default/dw23040526/NATBRA-103348_3.jpg',
    description: 'Perfume produto B',
  },
  {
    _id: '3',
    name: 'Product C',
    originalPrice: 300,
    price: 250,
    stock: 3,
    slug: 'product-c',
    rating: 5,
    image:
      'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-br-storefront-catalog/default/dw6f7b0816/produto-joia/background/mobile/83314.jpg',
    description: 'Perfume produto C',
  },
  {
    _id: '4',
    name: 'Product D',
    originalPrice: 300,
    price: 250,
    stock: 3,
    slug: 'product-c',
    rating: 3.2,
    image:
      'https://cdn.awsli.com.br/600x450/1339/1339272/produto/64192110/c655653654.jpg',
    description: 'Perfume produto C',
  },
]
