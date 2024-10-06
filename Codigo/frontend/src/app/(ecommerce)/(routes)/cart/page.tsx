import { CartSummary } from '@/components/cart-summary'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { CartList } from '@/components/ui/cart-list'

/**
 *
 * @todo: abstract breadcrumb componet
 */
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
          <CartList />
          <CartSummary />
        </section>
      </div>
    </main>
  )
}
