import { useEffect } from "react"
import { useCompanyStore } from "@/Entities/Company/store/CompanyStore"
import { useAuthStore } from "@/shared/store/AuthStore"
import { useEmployeeStore } from "../store/EmployeeStore"
import { UserType } from "@/shared/interfaces/sharedInterfaces"
import { useRestaurantStore } from "@/Entities/Restaurant/store/RestaurantStore"
import DishCardMenu from "@/shared/Pages/NotProtected/InitialPage/components/DishCardMenu/DishCardMenu"
import styles from "./CardapioDisponivel.module.scss"
import { App, Card } from "antd"

const CardapioDisponivel = () => {
  const { user } = useAuthStore()
  const { employee } = useEmployeeStore()
  const { getCompany, company } = useCompanyStore()
  const { getDishes, dishes } = useRestaurantStore()
  const { message, modal } = App.useApp()


  // Busca a empresa do funcionário quando logado
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        if (user.userType === UserType.Employee && employee?.companyId) {
          await getCompany(employee.companyId)
        }
      } catch (error) {
        console.error("Erro ao buscar empresa:", error)
      }
    }

    fetchCompany()
  }, [user.userType, employee?.companyId])

  // Busca os pratos quando a empresa e o restaurante estiverem definidos
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        if (company?.restaurantId) {
          await getDishes(company.restaurantId)
        }
      } catch (error) {
        console.error("Erro ao buscar pratos do restaurante:", error)
      }
    }

    fetchDishes()
  }, [company?.restaurantId])

  return <div className={styles.container}>
    <h1>Cardápio Disponivel</h1>
    <Card style={{ border: 'none' }} >
      <div className={styles.dishes_container}>
        {dishes.map((dish) => {
          return <div onClick={() => {
            modal.confirm({
              content: `Tem certeza que deseja selecionar o prato ${dish.name} como seu pedido do dia?`, onOk: () => { message.success(`Prato ${dish.name} adicionado ao pedido com sucesso!`) }
            })
          }}>
            <DishCardMenu key={dish.id} {...dish} />
          </div>
        })}
      </div>
    </Card>
  </div>
}

export default CardapioDisponivel
