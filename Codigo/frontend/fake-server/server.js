/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// Middlewares
app.use(cors())
app.use(bodyParser.json())

// Dados em memória
const products = [
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

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor fake rodando em http://localhost:${port}`)
})
