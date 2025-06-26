import type { IEmployee, IWeeklyOrder } from "@/Entities/Employee/interfaces/employeeInterfaces"
import axios from "axios"

const api = import.meta.env.VITE_API_URL

const employeeRepository = {
  getEmployeeByCompany: async (id: number) => {
    try {
      const response = await axios.get(`${api}/company/${id}/employees`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar funcionários da empresa:', error)
      throw error
    }
  },

  getEmployeeByCompanyIdTemp: async (id: number) => {
    try {
      const response = await axios.get(`${api}/employee`)
      const filteredEmployees = response.data.filter((employee: IEmployee) => employee.companyId === id)
      return filteredEmployees
    } catch (error) {
      console.error('Erro ao buscar funcionários da empresa:', error)
      throw error
    }
  },

  deleteEmployee: async (id: number) => {
    try {
      const response = await axios.delete(`${api}/employee/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao excluir funcionário:', error)
      throw error
    }
  },

  updateEmployee: async (id: number, data: Partial<IEmployee>) => {
    try {
      const response = await axios.put(`${api}/employee/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error)
      throw error
    }
  },

  createEmployee: async (data: Partial<IEmployee>, companyId: number) => {
    try {
      const response = await axios.post(`${api}/user`, { ...data, companyId })
      return response.data
    } catch (error) {
      console.error('Erro ao criar funcionário:', error)
      throw error
    }
  },

  createWeeklyOrder: async (data: IWeeklyOrder) => {
    try {
      const response = await axios.post(`${api}/employee-weekly-orders`, data)
      return response.data
    } catch (error) {
      console.error('Erro ao criar funcionário:', error)
      throw error
    }
  }
}

export default employeeRepository