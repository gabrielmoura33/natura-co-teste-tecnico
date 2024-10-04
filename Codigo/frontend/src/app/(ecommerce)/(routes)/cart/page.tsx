import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
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

        <section className="grid lg:grid-cols-2 gap-12 mt-4">
          <ScrollArea className="w-full flex flex-col h-[34rem] border border-[#E5E5E5] py-8 px-4 gap-4">
            <div className="w-full h-[8rem] bg-slate-500"></div>
            <div className="border-t-[1px] border-[#E5E5E5] my-4"></div>
            <div className="w-full h-[8rem] bg-slate-500"></div>
            <div className="border-t-[1px] border-[#E5E5E5] my-4"></div>
            <div className="w-full h-[8rem] bg-slate-500"></div>
            <div className="border-t-[1px] border-[#E5E5E5] my-4"></div>
            <div className="w-full h-[8rem] bg-slate-500"></div>

            <div className="border-t-[1px] border-[#E5E5E5] my-4"></div>

            <div className="w-full h-[8rem] bg-slate-500"></div>
          </ScrollArea>
          <div className="w-full h-[30rem] border rounded-[1rem] border-[#E5E5E5]"></div>
        </section>
      </div>
    </main>
  )
}
