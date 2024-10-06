import type { Metadata } from 'next'
import { Lora } from 'next/font/google'
import './globals.css'
import { ToasterProvider } from '../components/toaster-provider'
import ReactQueryProvider from '@/providers/react-query'

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
        <ReactQueryProvider>
          <ToasterProvider />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
