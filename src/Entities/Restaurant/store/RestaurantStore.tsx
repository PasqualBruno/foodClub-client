import { create } from "zustand"
import type { IDish, IRestaurant, IRestaurantBasicInfo } from "../interfaces/RestaurantInterfaces"
import restaurantRepository from "../repository/restaurantRepository"

interface IRestaurantStore {
  restaurant: IRestaurantBasicInfo | null
  dishes: IDish[]
  restaurants: IRestaurant[]
  setRestaurant: (restaurant: IRestaurantBasicInfo) => void
  loadRestaurantInfo: () => void
  getRestaurants: () => void
}

export const useRestaurantStore = create<IRestaurantStore>((set) => ({
  restaurant: null,
  dishes: [],
  restaurants: [],
  setRestaurant: (restaurant) => set({ restaurant }),
  loadRestaurantInfo: () => {
  },
  getRestaurants: async () => {
    try {
      const data = await restaurantRepository.getRestaurants()
      console.log(data)
      set({ restaurants: data })
    } catch (error) {
      console.error("Erro ao buscar restaurantes:", error)
    }
  },
}))
