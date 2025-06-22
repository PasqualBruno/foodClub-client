import { useEffect, useState } from 'react'
import { App, Button, Card, Table } from 'antd'
import { useNavigate } from 'react-router'
import useRestaurantDishesColumns from './hooks/useRestaurantDishesColumns'
import type { IDish } from '../../interfaces/RestaurantInterfaces'
import { useRestaurantStore } from '../../store/RestaurantStore'
import EditDishModal from './components/EditDishModal'

const RestaurantDishes = () => {
  const {
    restaurant,
    getDishes,
    dishes = [],
    deleteDish,
    updateDish,
  } = useRestaurantStore()

  const { message, modal } = App.useApp()

  const navigate = useNavigate()

  const [editingDish, setEditingDish] = useState<IDish | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const { createDish } = useRestaurantStore()


  useEffect(() => {
    async function fetchDishes() {
      if (!restaurant?.id) {
        localStorage.removeItem('foodClubToken')
        navigate('/entrar')
        return
      }

      try {
        await getDishes(restaurant.id)
      } catch {
        message.error('Erro ao carregar pratos. Tente novamente mais tarde.')
      }
    }

    fetchDishes()
  }, [restaurant, getDishes, message, navigate])

  const onDeleteClick = (dishId: number, dishName: string) => {
    modal.confirm({
      title: 'Confirmar exclusão',
      content: `Tem certeza que deseja excluir o prato "${dishName}"?`,
      okText: 'Sim',
      okType: 'primary',
      cancelText: 'Não',
      onOk: async () => {
        try {
          await deleteDish(dishId)
          message.success('Prato excluído com sucesso!')
          if (restaurant?.id) await getDishes(restaurant.id)
        } catch {
          message.error('Erro ao excluir prato.')
        }
      },
    })
  }

  const onEditClick = (dish: IDish) => {
    setEditingDish(dish)
    setModalOpen(true)
  }

  const handleSave = async (updatedDish: IDish) => {
    const { id, name, price, image, description } = updatedDish

    const newValuesToUpdate = {
      name,
      price,
      image,
      description,
    }

    try {
      await updateDish(id, newValuesToUpdate)
      if (!restaurant) return
      getDishes(restaurant.id)
      setModalOpen(false)
      setEditingDish(null)

      if (restaurant?.id) {
        await getDishes(restaurant.id)
      }
    } catch {
      message.error('Erro ao atualizar prato.')
    }
  }

  const handleAddClick = () => {
    if (!restaurant) return

    setEditingDish({
      id: 0,
      restaurantId: restaurant.id,
      name: '',
      description: '',
      price: 0,
      image: '',
      averageRating: 0,
      ratings: [],
    })
    setIsAddModalOpen(true)
  }

  const handleAddSave = async (newDishData: IDish) => {
    try {
      await createDish(newDishData)
      message.success('Prato adicionado com sucesso!')
      setIsAddModalOpen(false)
      setEditingDish(null)

      if (restaurant?.id) {
        await getDishes(restaurant.id)
      }
    } catch {
      message.error('Erro ao adicionar prato.')
    }
  }

  const columns = useRestaurantDishesColumns(onEditClick, onDeleteClick)

  return (
    <>
      <h1>Pratos</h1>
      <Card
        style={{ border: 'none' }}
        extra={
          <Button type="primary" onClick={handleAddClick}>
            Adicionar
          </Button>
        }
      >
        <Table<IDish>
          columns={columns}
          dataSource={dishes || []}
          rowKey="id"
          pagination={{ pageSize: 6 }}
          className="custom-table"
        />
      </Card>

      {/* Modal de edição */}
      {editingDish && modalOpen && (
        <EditDishModal
          visible={modalOpen}
          dish={editingDish}
          onCancel={() => {
            setModalOpen(false)
            setEditingDish(null)
          }}
          onSave={handleSave}
        />
      )}

      {/* Modal de adição */}
      {editingDish && isAddModalOpen && (
        <EditDishModal
          visible={isAddModalOpen}
          dish={editingDish}
          onCancel={() => {
            setIsAddModalOpen(false)
            setEditingDish(null)
          }}
          onSave={handleAddSave}
        />
      )}
    </>
  )
}

export default RestaurantDishes
