import axios from "axios"
import type { IDish } from "../interfaces/RestaurantInterfaces"

const apiUrl = import.meta.env.VITE_API_URL

const restaurantRepository = {
  getRestaurants: async () => {
    try {
      const response = await axios.get(`${apiUrl}/restaurant`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar restaurantes:', error)
      throw error
    }
  },
  getDishesByRestaurant: async (restaurantId: number) => {
    try {
      const response = await axios.get(`${apiUrl}/Dish/by-restaurant/${restaurantId}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar pratos:', error)
      throw error
    }
  },

  deleteDish: async (dishId: number) => {
    try {
      const response = await axios.delete(`${apiUrl}/Dish/${dishId}`)
      return response.data
    } catch (error) {
      console.error('Erro ao excluir prato:', error)
      throw error
    }
  },

  updateDish: async (dishId: number, data: Partial<IDish>) => {
    try {
      const response = await axios.put(`${apiUrl}/Dish/${dishId}`, data)
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar prato:', error)
      throw error
    }
  },

}

export default restaurantRepository