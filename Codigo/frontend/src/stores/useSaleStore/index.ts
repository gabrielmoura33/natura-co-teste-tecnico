import { create } from 'zustand'

interface SaleState {
  saleInProgress: boolean
  saleSuccess: boolean
  saleError: string | null
  startSale: () => void
  completeSale: () => void
  failSale: (error: string) => void
}

export const useSaleStore = create<SaleState>((set) => ({
  saleInProgress: false,
  saleSuccess: false,
  saleError: null,

  startSale: () =>
    set({ saleInProgress: true, saleSuccess: false, saleError: null }),
  completeSale: () =>
    set({ saleInProgress: false, saleSuccess: true, saleError: null }),
  failSale: (error: string) =>
    set({ saleInProgress: false, saleSuccess: false, saleError: error }),
}))
