import { create } from "zustand"
import type { IRestaurant, IRestaurantBasicInfo } from "../interfaces/RestaurantInterfaces"
import restaurantRepository from "../repository/restaurantRepository"

interface IRestaurantStore {
  restaurant: IRestaurantBasicInfo | null
  loading: boolean
  restaurants: IRestaurant[]
  setRestaurant: (restaurant: IRestaurantBasicInfo) => void
  loadRestaurantInfo: () => void
  getRestaurants: () => void

}

export const useRestaurantStore = create<IRestaurantStore>((set) => ({
  loading: false,
  restaurant: null,
  restaurants: [],
  setRestaurant: (restaurant) => set({ restaurant }),
  loadRestaurantInfo: () => {
  },
  getRestaurants: async () => {
    try {
      set({ loading: true })
      const data = await restaurantRepository.getRestaurants()
      set({ restaurants: data, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },
}))
