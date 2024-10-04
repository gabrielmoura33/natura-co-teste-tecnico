import { HomeHero } from '@/components/home-hero'
import { HomeContainer } from '@/components/home-container'

const HomePage = () => {
  return (
    <div className="h-full">
      <HomeHero
        title="Se joga no arraiá"
        subtitle="aproveite as festas com o melhor da maquiagem Natura"
        ctaText="Comprar agora"
        backgroundImageUrl="https://www.brazilbeautynews.com/IMG/logo/arton5004.jpg"
      />
      <HomeContainer title="Descubra as fragrâncias que combinam com você" />
    </div>
  )
}

export default HomePage
