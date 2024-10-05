import React from 'react'
import { twMerge } from 'tailwind-merge'

interface IncreaseButtonProps {
  value: number
  onIncrease: () => void
  onDecrease: () => void
  min?: number
  max?: number
  className?: string
}

function IncreaseButton({
  value,
  onIncrease,
  onDecrease,
  min = 0,
  max = 5,
  className = '',
}: IncreaseButtonProps) {
  return (
    <div
      className={twMerge(
        'flex items-center w-[7.8125rem] h-[2.5625rem] p-[0.625rem] px-[1.1875rem] gap-[1.6875rem] flex-shrink-0 rounded-full bg-n-150',
        className,
      )}
    >
      <button
        className="text-lg font-bold text-gray-700"
        onClick={onDecrease}
        type="button"
        disabled={value === min}
      >
        -
      </button>
      <span className="text-lg font-semibold">{value}</span>
      <button
        className="text-lg font-bold text-gray-700"
        onClick={onIncrease}
        type="button"
        disabled={value === max}
      >
        +
      </button>
    </div>
  )
}

export default IncreaseButton
