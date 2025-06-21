import axios from "axios"

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

}

export default restaurantRepository