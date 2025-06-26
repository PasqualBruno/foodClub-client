import { Card, Modal, List, Typography, Button, Image, Avatar, App } from 'antd'
import styles from './WeeklyOrders.module.scss'
import { useAuthStore } from '@/shared/store/AuthStore'
import { useEffect, useState } from 'react'
import { UserType } from '@/shared/interfaces/sharedInterfaces'
import { useCompanyStore } from '@/Entities/Company/store/CompanyStore'
import { useEmployeeStore } from '../../store/EmployeeStore'
import { useRestaurantStore } from '@/Entities/Restaurant/store/RestaurantStore'
import { ForkKnifeIcon, PlusCircleIcon } from '@phosphor-icons/react'
import type { IDish } from '@/Entities/Restaurant/interfaces/RestaurantInterfaces'

const { Title, Text } = Typography

type SelectedDishes = {
  [key: string]: IDish | null
}

const WeeklyOrders = () => {
  const { user } = useAuthStore()
  const { getCompany, company } = useCompanyStore()
  const { employee, createWeeklyOrder } = useEmployeeStore()
  const { getDishes, dishes } = useRestaurantStore()
  const { message } = App.useApp()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedDishes, setSelectedDishes] = useState<SelectedDishes>({})

  console.log({ employee })

  const daysMap = {
    Monday: 'Segunda-feira',
    Tuesday: 'Terça-feira',
    Wednesday: 'Quarta-feira',
    Thursday: 'Quinta-feira',
    Friday: 'Sexta-feira',
  } as const


  const daysOfWeekKeys = Object.keys(daysMap) as (keyof typeof daysMap)[]

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
  }, [user.userType, employee?.companyId, getCompany])

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
  }, [company?.restaurantId, getDishes])

  const handleCardClick = (dayKey: string) => {
    setSelectedDay(dayKey)
    setIsModalVisible(true)
  }

  const handleDishSelect = async (dish: IDish) => {
    if (!selectedDay) {
      message.error("Erro: Dia da semana não selecionado.")
      return
    }

    try {
      // Dispara a função para criar o pedido semanal
      await createWeeklyOrder({
        employeeId: user.id!,
        dayOfWeek: selectedDay,
        order: {
          dishId: dish.id,
          quantity: 1, // Assumindo quantidade 1
        }
      })

      // Se a criação for bem-sucedida, atualiza o estado local
      setSelectedDishes((prev) => ({
        ...prev,
        [selectedDay]: dish,
      }))
      message.success(`Prato "${dish.name}" selecionado para ${daysMap[selectedDay as keyof typeof daysMap]}.`)
    } catch (error) {
      console.error("Erro ao criar pedido semanal:", error)
      message.error("Erro ao selecionar o prato. Tente novamente.")
    }

    setIsModalVisible(false)
  }

  const handleRemoveDish = (dayKey: string) => {
    setSelectedDishes((prev) => ({
      ...prev,
      [dayKey]: null,
    }))
  }

  return (
    <div className={styles.container}>
      <Title level={2}>Pedidos Semanais</Title>
      <Title level={4}>Peça seu prato uma vez, e não se preocupe mais</Title>
      <div className={styles.cards_container}>
        {daysOfWeekKeys.map((dayKey) => {
          const dayNameInPortuguese = daysMap[dayKey]
          const dish = selectedDishes[dayKey]

          return (
            <Card
              key={dayKey}
              className={styles.day_card}
              title={<Title level={4}>{dayNameInPortuguese}</Title>}
            >
              {dish ? (
                <div className={styles.selected_dish_content}>
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    className={styles.dish_image}
                    preview={false}
                  />
                  <div className={styles.dish_info}>
                    <Text strong>{dish.name}</Text>
                  </div>
                  <Button
                    type="text"
                    danger
                    icon={<PlusCircleIcon size={20} />}
                    onClick={() => handleRemoveDish(dayKey)}
                  />
                </div>
              ) : (
                <div className={styles.no_dish_content}>
                  <ForkKnifeIcon size={40} weight="light" className={styles.icon} />
                  <p>Nenhum prato selecionado</p>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<PlusCircleIcon />}
                    onClick={() => handleCardClick(dayKey)}
                  >
                    Selecionar Prato
                  </Button>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      <Modal
        title="Selecione um Prato"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <List
          itemLayout="horizontal"
          dataSource={dishes}
          renderItem={(dish) => (
            <List.Item
              className={styles.dish_list_item}
              onClick={() => handleDishSelect(dish)}
            >
              <List.Item.Meta
                avatar={<Avatar src={dish.image} shape='square' size={60} />}
                title={dish.name}
                description={`R$ ${dish.price} - ${dish.description}`}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  )
}

export default WeeklyOrders