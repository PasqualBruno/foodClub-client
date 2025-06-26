// InitialPage.tsx
import { useRestaurantStore } from "@/Entities/Restaurant/store/RestaurantStore"
import { useEffect } from "react"
import RestaurantCard from "./components/RestaurantCard/RestaurantCard"
import { App, Card } from "antd"
import styles from './InitialPage.module.scss'
import RestaurantCardLoading from "./components/RestaurantCard/RestaurantCardLoading"

const InitialPage = () => {
  const { message } = App.useApp()
  const { getRestaurants, restaurants, loading } = useRestaurantStore()

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        await getRestaurants()
      } catch (error) {
        message.error("Erro ao carregar restaurantes. Tente novamente mais tarde.")
      }
    }

    fetchRestaurants()
  }, [getRestaurants, message])

  return (
    <div>
      <h1 >Restaurantes</h1>
      <Card style={{ border: 'none' }}>
        <div className={styles.restaurantes_container}>
          {loading
            ? Array(3).fill(null).map((_, index) => (
              <RestaurantCardLoading key={index} />
            ))
            : restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          }
        </div>
      </Card>
    </div>
  )
}

export default InitialPage
