import { Button } from './ui/button'

export function ListProduct() {
  return (
    <div className="w-[43rem] h-[21rem] flex gap-8">
      <div className="h-full w-full">
        <img
          src="https://http2.mlstatic.com/D_NQ_NP_879398-MLU70064905383_062023-O.webp"
          alt="kasndjas"
          className="h-full w-full rounded-2xl"
        />
      </div>
      <div className="flex flex-col w-full py-8 justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hidratante Masculino</h1>
          <strong className="text-xl font-bold">100ml</strong>
        </div>

        <span className="text-xl font-bold">R$212,00</span>
        <Button
          variant="rounded"
          size="lg"
          className="bg-primary text-white w-full"
        >
          Adicionar
        </Button>
      </div>
    </div>
  )
}
