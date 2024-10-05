import { Tag } from 'lucide-react'
import { Button } from './ui/button'
import { Divisor } from './ui/divisor'
import { Input } from './ui/input'

export function CartSummary() {
  return (
    <div className="w-full flex flex-col h-[30rem] border rounded-[1rem] border-[#E5E5E5] py-8 px-4 gap-4 ">
      <h1 className="text-2xl font-bold">Sumário</h1>
      <div className="flex justify-between">
        <span className="font-bold text-xl text-g-250">Subtotal</span>
        <strong>R$ 805,00</strong>
      </div>
      <div className="flex justify-between">
        <span className="font-bold text-xl text-g-250">Desconto (-20%)</span>
        <strong>-R$ 805,00</strong>
      </div>
      <div className="flex justify-between">
        <span className="font-bold text-xl text-g-250">Frete</span>
        <strong>R$ 15,00</strong>
      </div>
      <Divisor />
      <div className="flex justify-between">
        <h1>Total</h1>
        <strong>R$ 644,00</strong>
      </div>
      <div className="flex gap-4">
        <Input icon={<Tag size={25} />} placeholder="Cupom" variant="rounded" />
        <Button className="bg-black text-white" variant="rounded" size="lg">
          Aplicar
        </Button>
      </div>
      <div className="flex gap-4">
        <Button
          variant="rounded"
          size="lg"
          className="bg-primary text-white w-full"
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  )
}
