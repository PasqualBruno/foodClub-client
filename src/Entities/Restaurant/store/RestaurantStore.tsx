import { create } from "zustand"
import type { IDish, IRestaurant, IRestaurantBasicInfo } from "../interfaces/RestaurantInterfaces"
import restaurantRepository from "../repository/restaurantRepository"
import type { ICompanyOrder, IEmployeeOrder } from "@/Entities/Company/interfaces/CompanyInterfaces"

interface IRestaurantStore {
  restaurant: IRestaurantBasicInfo | null
  loading: boolean
  restaurants: IRestaurant[]
  dishes: IDish[]
  companyOrders: ICompanyOrder[]
  getCompanyOrders: (restaurantId: number) => void
  setRestaurant: (restaurant: IRestaurantBasicInfo) => void
  loadRestaurantInfo: () => void
  getRestaurants: () => void
  getDishes: (restaurantId: number) => void
  deleteDish: (dishId: number) => void
  updateDish: (dishId: number, data: Partial<IDish>) => void
  updateEmployeeOrder: (orderId: number, data: Partial<IEmployeeOrder>) => void
  updateCompanyOrder: (orderId: number, data: Partial<ICompanyOrder>) => void
  createDish: (data: Partial<IDish>) => void

}

export const useRestaurantStore = create<IRestaurantStore>((set) => ({
  companyOrders: [],
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
      console.log({ data })

      // set({ dishes: data, loading: false })
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
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  getCompanyOrders: async (restaurantId) => {
    try {
      set({ loading: true })
      const data = await restaurantRepository.getCompanyOrders(restaurantId)
      set({ companyOrders: data, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  updateEmployeeOrder: async (orderId, data) => {
    try {
      set({ loading: true })
      const response = await restaurantRepository.updateEmployeeOrder(orderId, data)
      set({ companyOrders: response, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  updateCompanyOrder: async (orderId, data) => {
    try {
      set({ loading: true })
      const response = await restaurantRepository.updateCompanyOrder(orderId, data)
      set({ companyOrders: response, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  createDish: async (data) => {
    try {
      set({ loading: true })
      await restaurantRepository.createDish(data)
    } catch (error) {
      set({ loading: false })
      throw error
    }
  }
}))
