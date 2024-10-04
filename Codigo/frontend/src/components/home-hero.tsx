import { Button } from './ui/button'

type Props = {
  backgroundImageUrl: string
  title: string
  subtitle: string
  ctaText: string
  onClick: () => void
}

export function HomeHero({
  backgroundImageUrl,
  title,
  subtitle,
  ctaText,
  onClick,
}: Props) {
  return (
    <div
      className="h-[41rem] bg-slate-700 relative"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-[34rem] flex flex-col absolute left-[6%] top-[20%]">
        <h1 className="text-[3.25rem] font-bold text-white">{title}</h1>
        <span className="text-base text-white">{subtitle}</span>
        <div className="w-5 mt-10">
          <Button size="lg" variant="rounded" onClick={onClick}>
            {ctaText}
          </Button>
        </div>
      </div>
    </div>
  )
}
