import { CartItem } from '@/components/cart-item'
import { CartSummary } from '@/components/cart-summary'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Divisor } from '@/components/ui/divisor'

import { ScrollArea } from '@/components/ui/scroll-area'

const CartBreadcrumb = () => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Carrinho</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
)

export default function CartPage() {
  return (
    <main className="h-full overflow-auto">
      <div className="mx-auto max-w-screen-2xl h-full border-t-[1px] border-[#E5E5E5] py-8">
        <CartBreadcrumb />
        <h1 className="mt-4 text-[2.25rem] font-bold ">Seu carrinho</h1>

        <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-20 mt-4">
          <ScrollArea className="w-full flex flex-col h-[34rem] border border-[#E5E5E5] rounded-[1rem] py-8 px-4 gap-4">
            <CartItem />
            <Divisor />
            <CartItem />
            <Divisor />
            <CartItem />
            <Divisor />
            <CartItem />
          </ScrollArea>
          <CartSummary />
        </section>
      </div>
    </main>
  )
}
