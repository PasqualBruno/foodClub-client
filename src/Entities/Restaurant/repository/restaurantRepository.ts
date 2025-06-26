import axios from "axios"
import type { IDish } from "../interfaces/RestaurantInterfaces"
import { mockCompanyOrders } from "../store/mockData"
import type { ICompanyOrder, IEmployeeOrder } from "@/Entities/Company/interfaces/CompanyInterfaces"

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
      console.log({ data })
      const response = await axios.put(`${apiUrl}/Dish/${dishId}`, data)
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar prato:', error)
      throw error
    }
  },

  getCompanyOrders: async (restaurantId: number) => {
    //TODO -- Integrar com o back
    console.log(restaurantId)
    try {
      // const response = await axios.get(`${apiUrl}/Order/by-restaurant/${restaurantId}`)
      // return response.data
      return mockCompanyOrders
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error)
      throw error
    }
  },

  updateEmployeeOrder: async (orderId: number, data: Partial<IEmployeeOrder>) => {
    //TODO -- Integrar com o back
    try {
      const updatedOrders = mockCompanyOrders.map((companyOrder) => {
        // Atualiza employeeOrders dentro do pedido da empresa
        const updatedEmployeeOrders = companyOrder.employeeOrders.map((employeeOrder) =>
          employeeOrder.id === orderId ? { ...employeeOrder, ...data } : employeeOrder
        )
        return { ...companyOrder, employeeOrders: updatedEmployeeOrders }
      })

      return updatedOrders
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error)
      throw error
    }
  },
  updateCompanyOrder: async (orderId: number, data: Partial<ICompanyOrder>) => {
    //TODO -- Integrar com o back
    try {
      const updatedOrders = mockCompanyOrders.map((companyOrder) =>
        companyOrder.id === orderId
          ? { ...companyOrder, ...data }
          : companyOrder
      )

      return updatedOrders
    } catch (error) {
      console.error('Erro ao atualizar pedido da empresa:', error)
      throw error
    }
  },

  createDish: async (data: Partial<IDish>) => {
    try {
      const response = await axios.post(`${apiUrl}/Dish`, data)
      return response.data
    } catch (error) {
      console.error('Erro ao criar prato:', error)
      throw error
    }
  },



}

export default restaurantRepository

