/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3333

// Middlewares
app.use(cors())
app.use(bodyParser.json())

// Dados em memória
const products = [
  {
    _id: '1',
    name: 'Fragrância Elegance',
    originalPrice: 100,
    price: 80,
    stock: 5,
    slug: 'fragrancia-elegance',
    rating: 3.5,
    image:
      'https://m.media-amazon.com/images/I/71f16NperJL._AC_UF1000,1000_QL80_.jpg',
    description: 'Perfume Fragrância Elegance',
  },
  {
    _id: '2',
    name: 'Essência Natural',
    originalPrice: 200,
    price: 150,
    stock: 10,
    slug: 'essencia-natural',
    rating: 2.5,
    image:
      'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-br-storefront-catalog/default/dw23040526/NATBRA-103348_3.jpg',
    description: 'Perfume Essência Natural',
  },
  {
    _id: '3',
    name: 'Aroma Divino',
    originalPrice: 300,
    price: 250,
    stock: 3,
    slug: 'aroma-divino',
    rating: 5,
    image:
      'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-br-storefront-catalog/default/dw6f7b0816/produto-joia/background/mobile/83314.jpg',
    description: 'Perfume Aroma Divino',
  },
  {
    _id: '4',
    name: 'Toque Suave',
    originalPrice: 300,
    price: 250,
    stock: 3,
    slug: 'toque-suave',
    rating: 3.2,
    image:
      'https://cdn.awsli.com.br/600x450/1339/1339272/produto/64192110/c655653654.jpg',
    description: 'Perfume Toque Suave',
  },
  {
    _id: '5',
    name: 'Essência Floral',
    originalPrice: 150,
    price: 120,
    stock: 8,
    slug: 'essencia-floral',
    rating: 4.1,
    image: 'https://m.media-amazon.com/images/I/41-4SD9wGeL._AC_.jpg',
    description: 'Perfume Essência Floral',
  },
  {
    _id: '6',
    name: 'Luz do Amanhecer',
    originalPrice: 180,
    price: 145,
    stock: 12,
    slug: 'luz-do-amanhecer',
    rating: 4.7,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLnhq9dZ3ewcrbhkTcSHeoywzv1y94QAR7BA&s',
    description: 'Perfume Luz do Amanhecer',
  },
  {
    _id: '7',
    name: 'Toque de Seda',
    originalPrice: 90,
    price: 75,
    stock: 15,
    slug: 'toque-de-seda',
    rating: 3.9,
    image: 'https://m.media-amazon.com/images/I/419uTVeUhoL._AC_.jpg',
    description: 'Hidratante Toque de Seda',
  },
  {
    _id: '8',
    name: 'Reflexo Noturno',
    originalPrice: 210,
    price: 185,
    stock: 9,
    slug: 'reflexo-noturno',
    rating: 4.5,
    image:
      'https://http2.mlstatic.com/D_NQ_NP_603022-MLB76914428456_062024-O.webp',
    description: 'Perfume Reflexo Noturno',
  },
  {
    _id: '9',
    name: 'Sofisticação Absoluta',
    originalPrice: 300,
    price: 270,
    stock: 4,
    slug: 'sofisticacao-absoluta',
    rating: 4.8,
    image:
      'https://down-br.img.susercontent.com/file/6c94148141f379142d226cc150d0f094',
    description: 'Perfume Sofisticação Absoluta',
  },
  {
    _id: '10',
    name: 'Essência de Jasmim',
    originalPrice: 120,
    price: 95,
    stock: 10,
    slug: 'essencia-de-jasmim',
    rating: 4.0,
    image:
      'https://production.na01.natura.com/on/demandware.static/-/Sites-NatBrazil-Library/default/dwacfc3584/Categorias/NE%20Presentes%20-%20Mais%20Vendidos/mob_hero_mais-vendidos_02.jpg',
    description: 'Perfume Essência de Jasmim',
  },
  {
    _id: '11',
    name: 'Brilho Celestial',
    originalPrice: 160,
    price: 130,
    stock: 6,
    slug: 'brilho-celestial',
    rating: 3.7,
    image:
      'https://http2.mlstatic.com/D_NQ_NP_603022-MLB76914428456_062024-O.webp',
    description: 'Perfume Brilho Celestial',
  },
  {
    _id: '12',
    name: 'Aroma Encantado',
    originalPrice: 180,
    price: 140,
    stock: 7,
    slug: 'aroma-encantado',
    rating: 4.2,
    image:
      'https://www.infomoney.com.br/wp-content/uploads/2019/06/natura-ekos-cosmeticos-beleza.jpg',
    description: 'Perfume Aroma Encantado',
  },
  {
    _id: '13',
    name: 'Efeito Luminoso',
    originalPrice: 110,
    price: 90,
    stock: 5,
    slug: 'efeito-luminoso',
    rating: 3.8,
    image:
      'https://www.revendedor.com.br/wp-content/uploads/2021/08/produtos-mais-vendidos-natura.jpg',
    description: 'Hidratante Efeito Luminoso',
  },
  {
    _id: '14',
    name: 'Frescor Tropical',
    originalPrice: 130,
    price: 110,
    stock: 11,
    slug: 'frescor-tropical',
    rating: 4.6,
    image:
      'https://m.media-amazon.com/images/I/71f16NperJL._AC_UF1000,1000_QL80_.jpg',
    description: 'Perfume Frescor Tropical',
  },
  {
    _id: '15',
    name: 'Sensação de Luxo',
    originalPrice: 350,
    price: 310,
    stock: 3,
    slug: 'sensacao-de-luxo',
    rating: 4.9,
    image:
      'https://www.revendedor.com.br/wp-content/uploads/2021/08/produtos-mais-vendidos-natura.jpg',
    description: 'Perfume Sensação de Luxo',
  },
  {
    _id: '16',
    name: 'Essência dos Sonhos',
    originalPrice: 190,
    price: 160,
    stock: 9,
    slug: 'essencia-dos-sonhos',
    rating: 4.4,
    image:
      'https://http2.mlstatic.com/D_NQ_NP_603022-MLB76914428456_062024-O.webp',
    description: 'Perfume Essência dos Sonhos',
  },
  {
    _id: '17',
    name: 'Chama da Noite',
    originalPrice: 220,
    price: 195,
    stock: 7,
    slug: 'chama-da-noite',
    rating: 4.5,
    image: 'https://m.media-amazon.com/images/I/419uTVeUhoL._AC_.jpg',
    description: 'Perfume Chama da Noite',
  },
  {
    _id: '18',
    name: 'Aura Secreta',
    originalPrice: 250,
    price: 220,
    stock: 5,
    slug: 'aura-secreta',
    rating: 4.3,
    image:
      'https://cdn.awsli.com.br/600x450/1339/1339272/produto/64192110/c655653654.jpg',
    description: 'Perfume Aura Secreta',
  },
  {
    _id: '19',
    name: 'Elegância Pura',
    originalPrice: 270,
    price: 240,
    stock: 6,
    slug: 'elegancia-pura',
    rating: 4.7,
    image:
      'https://cdn.awsli.com.br/600x450/1339/1339272/produto/64192110/c655653654.jpg',
    description: 'Perfume Elegância Pura',
  },
  {
    _id: '20',
    name: 'Frescura da Manhã',
    originalPrice: 100,
    price: 85,
    stock: 12,
    slug: 'frescura-da-manha',
    rating: 4.1,
    image:
      'https://a-static.mlcdn.com.br/450pxx450px/kit-tododia-todanoite-cha-de-camomila-e-lavanda-relaxante-spray-ambientes-creme-corporal-sabonete-natura/equipemb/kitcltdnat2/e2fc1d9a8555271f618046a00b5440ef.jpeg',
    description: 'Perfume Frescura da Manhã',
  },
  {
    _id: '21',
    name: 'Brilho do Sol',
    originalPrice: 130,
    price: 110,
    stock: 8,
    slug: 'brilho-do-sol',
    rating: 4.0,
    image: 'https://m.media-amazon.com/images/I/419uTVeUhoL._AC_.jpg',
    description: 'Perfume Brilho do Sol',
  },
  {
    _id: '22',
    name: 'Toque de Frescor',
    originalPrice: 140,
    price: 120,
    stock: 10,
    slug: 'toque-de-frescor',
    rating: 3.9,
    image: 'https://example.com/image18.jpg',
    description: 'Hidratante Toque de Frescor',
  },
  {
    _id: '23',
    name: 'Vento Selvagem',
    originalPrice: 210,
    price: 180,
    stock: 5,
    slug: 'vento-selvagem',
    rating: 4.2,
    image: 'https://example.com/image19.jpg',
    description: 'Perfume Vento Selvagem',
  },
  {
    _id: '24',
    name: 'Encanto de Verão',
    originalPrice: 160,
    price: 130,
    stock: 9,
    slug: 'encanto-de-verao',
    rating: 4.6,
    image: 'https://example.com/image20.jpg',
    description: 'Perfume Encanto de Verão',
  },
  {
    _id: '25',
    name: 'Beleza Natural',
    originalPrice: 180,
    price: 150,
    stock: 7,
    slug: 'beleza-natural',
    rating: 4.5,
    image: 'https://m.media-amazon.com/images/I/51YXs1uQvCL.jpg',
    description: 'Perfume Beleza Natural',
  },
  {
    _id: '26',
    name: 'Sombra da Lua',
    originalPrice: 250,
    price: 220,
    stock: 4,
    slug: 'sombra-da-lua',
    rating: 4.8,
    image:
      'https://www.infomoney.com.br/wp-content/uploads/2019/06/natura_produtos.jpg',
    description: 'Perfume Sombra da Lua',
  },
  {
    _id: '27',
    name: 'Aroma Suave',
    originalPrice: 120,
    price: 95,
    stock: 11,
    slug: 'aroma-suave',
    rating: 4.0,
    image:
      'https://img.clasf.com.br/2021/04/12/produtos-natura-recife-202104120123001689710000.jpg',
    description: 'Perfume Aroma Suave',
  },
  {
    _id: '28',
    name: 'Luxo Selvagem',
    originalPrice: 310,
    price: 280,
    stock: 3,
    slug: 'luxo-selvagem',
    rating: 4.9,
    image:
      'https://down-br.img.susercontent.com/file/br-11134207-7qukw-ljmy3c1r2n8m09',
    description: 'Perfume Luxo Selvagem',
  },
  {
    _id: '29',
    name: 'Essência Vibrante',
    originalPrice: 140,
    price: 115,
    stock: 8,
    slug: 'essencia-vibrante',
    rating: 4.1,
    image:
      'https://images-americanas.b2w.io/produtos/7378899927/imagens/natura-deo-parfum-ilia-flor-de-laranjeira-feminino-50ml/7378899927_1_large.jpg',
    description: 'Perfume Essência Vibrante',
  },
  {
    _id: '30',
    name: 'Brisa Marinha',
    originalPrice: 170,
    price: 145,
    stock: 7,
    slug: 'brisa-marinha',
    rating: 4.3,
    image:
      'https://production.na01.natura.com/on/demandware.static/-/Sites-NatBrazil-Library/default/dwd29baa84/Categorias/NE%20Promo%C3%A7%C3%B5es/02-09-2024/depor-mes-cliente-semselo-mob.jpg',
    description: 'Perfume Brisa Marinha',
  },
]

let cartItems = []
let shippingCost = 0

// Obter o estado completo do carrinho
app.get('/cart', (req, res) => {
  res.json({
    cartItems,
    shippingCost,
  })
})

// Adicionar produto ao carrinho
app.post('/cart/add', (req, res) => {
  const { productId, quantity } = req.body

  const product = products.find((p) => p._id === productId)
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' })
  }

  const cartItem = cartItems.find((item) => item.product._id === productId)

  if (cartItem) {
    const totalDesiredQuantity = cartItem.quantity + quantity
    const finalQuantity = Math.min(totalDesiredQuantity, product.stock)
    cartItem.quantity = finalQuantity
  } else {
    const finalQuantity = Math.min(quantity, product.stock)
    cartItems.push({ product, quantity: finalQuantity })
  }

  res.status(200).json({ message: 'Produto adicionado ao carrinho' })
})

// Remover produto do carrinho
app.delete('/cart/remove/:id', (req, res) => {
  const productId = req.params.id

  cartItems = cartItems.filter((item) => item.product._id !== productId)

  res.status(200).json({ message: 'Produto removido do carrinho' })
})

// Atualizar quantidade de produto no carrinho
app.put('/cart/update', (req, res) => {
  const { productId, quantity } = req.body

  const product = products.find((p) => p._id === productId)
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' })
  }

  const cartItem = cartItems.find((item) => item.product._id === productId)

  if (cartItem) {
    const finalQuantity = Math.min(quantity, product.stock)
    cartItem.quantity = finalQuantity
    res.status(200).json({ message: 'Quantidade atualizada' })
  } else {
    res.status(404).json({ error: 'Produto não está no carrinho' })
  }
})

// Definir custo de envio
app.put('/cart/shipping', (req, res) => {
  const { cost } = req.body
  shippingCost = cost

  res.status(200).json({ message: 'Custo de envio atualizado' })
})

app.get('/products', (req, res) => {
  const { search = '', page = 1, limit = 10 } = req.query

  // Filtrar produtos pela busca
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  )

  // Paginação
  const startIndex = (page - 1) * limit
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + Number(limit),
  )

  res.json({
    products: paginatedProducts,
    currentPage: Number(page),
    totalPages: Math.ceil(filteredProducts.length / limit),
    totalProducts: filteredProducts.length,
  })
})

app.post('/cart/apply-coupon', (req, res) => {
  const { couponCode } = req.body

  const validCoupons = {
    EASTER_EGG: 10,
    FRESCORDEVAGA: 20,
    SABORDEVITORIA: 30,
    NATURA: 100,
  }

  if (validCoupons[couponCode]) {
    res.json({ success: true, discount: validCoupons[couponCode] })
  } else {
    res.status(400).json({ success: false, message: 'Cupom inválido' })
  }
})

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor fake rodando em http://localhost:${port}`)
})
