import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL

const authRepository = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${apiUrl}/user/login`, {
        email,
        password,
      })

      return response.data
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw error
    }
  },

  logout: async () => {
    try {
      await axios.post(`${apiUrl}/user/logout`)
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      throw error
    }
  },

  register: async (data: { userType: string; email: string; password: string }) => {
    try {
      const response = await axios.post(`${apiUrl}/user`, data)
      return response
    } catch (error) {
      console.error('Erro ao cadastrar:', error)
      throw error
    }
  },
}



export default authRepository
