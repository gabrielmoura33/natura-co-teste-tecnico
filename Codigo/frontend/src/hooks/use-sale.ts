import { finalizeSale } from '@/services/sale.service'
import { useSaleStore } from '@/stores/useSaleStore'
import { useAuth } from '@clerk/nextjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useSale = () => {
  const {
    saleInProgress,
    saleSuccess,
    saleError,
    startSale,
    completeSale,
    failSale,
  } = useSaleStore()
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  const finalizeSaleMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken()
      await finalizeSale(token)
    },
    onMutate: () => {
      startSale()
    },
    onSuccess: () => {
      toast.success('Venda Finalizada com sucesso!')
      completeSale()
      queryClient.invalidateQueries({ queryKey: ['cartItems'] })
    },
    onError: (error: any) => {
      failSale(error?.message || 'Erro ao finalizar a venda')
    },
  })

  const initiateSale = () => {
    finalizeSaleMutation.mutate()
  }

  return {
    saleInProgress,
    saleSuccess,
    saleError,
    initiateSale,
  }
}
