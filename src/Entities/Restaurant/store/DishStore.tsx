import { create } from "zustand"
import type { IDish } from "../interfaces/RestaurantInterfaces"
import dishRepository from "../repository/dishRepository"

interface IDishStore {
  dishes: IDish[]
  getDishes: () => void
  loading: boolean
}


export const useDishStore = create<IDishStore>((set) => ({
  loading: false,
  dishes: [],
  getDishes: async () => {
    try {
      set({ loading: true })
      const data = await dishRepository.getDishesByRestaurant(1)
      set({ dishes: data, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  }
}))