import { Header } from '@/components/header'
import { ReactNode } from 'react'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main className="h-full">
      <Header />
      <div className="mx-auto  h-full">{children}</div>
    </main>
  )
}
