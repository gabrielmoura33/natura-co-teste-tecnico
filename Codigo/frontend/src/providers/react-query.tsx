'use client'

import { getQueryClient } from '@/lib/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(getQueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ReactQueryProvider
