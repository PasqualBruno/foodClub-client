import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL

const dishRepository = {
  getDishesByRestaurant: async (restaurantId: number) => {
    try {
      const response = await axios.get(`${apiUrl}/Dish/by-restaurant/${restaurantId}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar pratos:', error)
      throw error
    }
  }

}


export default dishRepository