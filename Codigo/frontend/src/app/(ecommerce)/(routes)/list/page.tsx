import { ListProducts } from '@/components/list-products'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

const Listbreadcrumb = () => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Produtos</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
)

export default function ListPage() {
  return (
    <main className="h-full overflow-auto">
      <div className="mx-auto max-w-screen-2xl h-full border-t-[1px] border-[#E5E5E5] py-8">
        <Listbreadcrumb />
        <h1 className="mt-4 text-[2.25rem] font-bold ">Lista de Produtos</h1>
        <ListProducts />
        <div className="mt-6 w-full flex justify-center">
          <Button variant="rounded" size="lg">
            Carregar outros
          </Button>
        </div>
      </div>
    </main>
  )
}
