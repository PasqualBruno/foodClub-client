
import { useRestaurantStore } from "@/Entities/Restaurant/store/RestaurantStore"
import { useEffect } from "react"


const InitialPage = () => {

  const { getRestaurants } = useRestaurantStore()

  useEffect(() => {
    getRestaurants()
  }, [getRestaurants])


  return (
    <div>InitialPage</div>
  )
}

export default InitialPage