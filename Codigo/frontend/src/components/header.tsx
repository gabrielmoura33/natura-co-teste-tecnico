import Link from 'next/link'
import IconLink from './link'
import { Logo } from './logo'
import { Input } from './ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select'
import { Search, ShoppingCart, User } from 'lucide-react'

export function Header() {
  return (
    <div className="flex flex-col">
      <div className="w-full max-w-[90%] self-center h-[2rem] bg-[#4E4E4E] text-center text-white">
        <span>Aproveite as nossas oportunidades!!!</span>
      </div>
      <header className="px-20 py-8 flex items-center gap-10">
        <Link href="/">
          <Logo />
        </Link>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Produtos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Perfumaria</SelectItem>
            <SelectItem value="dark">Cosméticos</SelectItem>
          </SelectContent>
        </Select>
        <Input
          icon={<Search size={25} />}
          placeholder="O que está buscando hoje?"
          variant="rounded"
        />
        <div className="flex justify-between gap-5">
          <IconLink
            icon={<ShoppingCart size={25} />}
            className="text-black"
            href="/cart"
            tooltipText="Minhas compras"
          />
          <IconLink
            icon={<User size={25} />}
            className="text-black"
            href="/"
            tooltipText="Fazer login"
          />
        </div>
      </header>
    </div>
  )
}
