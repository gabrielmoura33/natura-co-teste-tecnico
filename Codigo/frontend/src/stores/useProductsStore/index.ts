import { create } from 'zustand'
import { Product } from './interfaces'

interface ProductState {
  products: Product[]
  currentPage: number
  totalPages: number
  totalProducts: number
  setProducts: (products: Product[]) => void
  updateProducts: (updater: (prevProducts: Product[]) => Product[]) => void
  setPagination: (
    currentPage: number,
    totalPages: number,
    totalProducts: number,
  ) => void
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  currentPage: 1,
  totalPages: 1,
  totalProducts: 0,
  setProducts: (products) => set({ products }),
  updateProducts: (updater) =>
    set((state) => ({ products: updater(state.products) })),
  setPagination: (currentPage, totalPages, totalProducts) =>
    set({ currentPage, totalPages, totalProducts }),
}))
