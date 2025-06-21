import { create } from "zustand"
import type { IDish, IRestaurant, IRestaurantBasicInfo } from "../interfaces/RestaurantInterfaces"
import restaurantRepository from "../repository/restaurantRepository"

interface IRestaurantStore {
  restaurant: IRestaurantBasicInfo | null
  loading: boolean
  restaurants: IRestaurant[]
  dishes: IDish[]
  setRestaurant: (restaurant: IRestaurantBasicInfo) => void
  loadRestaurantInfo: () => void
  getRestaurants: () => void
  getDishes: (restaurantId: number) => void
  deleteDish: (dishId: number) => void
  updateDish: (dishId: number, data: Partial<IDish>) => void

}

export const useRestaurantStore = create<IRestaurantStore>((set) => ({
  dishes: [],
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
  getDishes: async (restaurantId) => {
    try {
      set({ loading: true })
      const data = await restaurantRepository.getDishesByRestaurant(restaurantId)
      set({ dishes: data, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }


  },
  deleteDish: async (dishId) => {
    try {
      set({ loading: true })
      const data = await restaurantRepository.deleteDish(dishId)
      set({ dishes: data, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },
  updateDish: async (dishId, data) => {
    try {
      set({ loading: true })
      const response = await restaurantRepository.updateDish(dishId, data)
      console.log({ respostaUpdate: response })
      set({ dishes: response, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },
}))
