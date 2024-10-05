import type { Metadata } from 'next'
import { Lora } from 'next/font/google'
import './globals.css'
import { ToasterProvider } from '../components/toaster-provider'

const lora = Lora({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Natura & CO',
  description: 'E-Commerce Natura',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <ToasterProvider />
        {children}
      </body>
    </html>
  )
}
