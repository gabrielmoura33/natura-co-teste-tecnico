'use client'
import { Trash } from 'lucide-react'
import IncreaseButton from './increase-button'
import { useState } from 'react'

export function CartItem() {
  const [amount, setAmount] = useState(0)
  return (
    <div className="w-full h-[8rem] flex gap-8 relative">
      <div className="h-full w-28">
        <img
          src="https://m.media-amazon.com/images/I/51zB3lt+upL.jpg"
          alt=""
          width={10}
          height={10}
          className="h-full w-full rounded-sm"
        />
      </div>
      <section className="flex flex-col gap-16">
        <h1 className="text-xl font-bold">Body Splash</h1>
        <span className="textbase">R$ 145,00</span>
      </section>
      <IncreaseButton
        className="absolute bottom-0 right-5"
        value={amount}
        max={15}
        onIncrease={() => setAmount(amount + 1)}
        onDecrease={() => setAmount(amount - 1)}
      />
      <button className="flex items-center text-red-400 absolute top-0 right-5">
        <span>
          <Trash size={25} />
        </span>
      </button>
    </div>
  )
}
