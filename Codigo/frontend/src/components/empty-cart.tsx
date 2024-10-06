import React from 'react'
import Lottie from 'react-lottie'
import animationData from '@/assets/animations/empty-cart.json'

const LottieEmptyCart: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div className="cursor-default pointer-events-none">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  )
}

export default LottieEmptyCart
