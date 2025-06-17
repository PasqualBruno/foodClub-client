import { create } from "zustand"
import type { IDish, IRestaurantBasicInfo } from "../interfaces/RestaurantInterfaces"

interface IRestaurantStore {
  restaurant: IRestaurantBasicInfo | null
  dishes: IDish[]
  setRestaurant: (restaurant: IRestaurantBasicInfo) => void
  loadRestaurantInfo: () => void
}

export const useRestaurantStore = create<IRestaurantStore>((set) => ({
  restaurant: null,
  dishes: [],
  setRestaurant: (restaurant) => set({ restaurant }),
  loadRestaurantInfo: () => {
  },
}))
