import axios from "axios"
import type { ICompany } from "../interfaces/CompanyInterfaces"

const api = import.meta.env.VITE_API_URL

const companyRepository = {
  getCompanyById: async (id: number) => {
    try {
      const response = await axios.get(`${api}/company/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar empresa:', error)
      throw error
    }
  },

  updateCompany: async (id: number | undefined, data: Partial<ICompany>) => {
    try {
      const response = await axios.put(`${api}/company/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar empresa:', error)
      throw error
    }
  }
}

export default companyRepository