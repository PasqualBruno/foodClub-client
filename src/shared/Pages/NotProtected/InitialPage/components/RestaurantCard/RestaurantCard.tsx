import type { IRestaurant } from '@/Entities/Restaurant/interfaces/RestaurantInterfaces'
import { App, Card, Image, Modal, Typography } from 'antd'
import { StarIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import Menu from '../Menu/Menu'
import styles from './RestaurantCard.module.scss'
import { useAuthStore } from '@/shared/store/AuthStore'
import { UserType } from '@/shared/interfaces/sharedInterfaces'
import { useCompanyStore } from '@/Entities/Company/store/CompanyStore'

interface RestaurantCardProps {
  restaurant?: IRestaurant
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const { message, modal } = App.useApp()
  const { company, updateCompany } = useCompanyStore()

  const { user } = useAuthStore()


  return (
    <>
      <Card
        size='small'
        className={styles.container_card}
        onClick={() => setIsModalOpen(true)}
      >
        {restaurant && (
          <div className={styles.container}>
            <Image
              className={styles.restaurant_image} src={restaurant.profileImage}
              alt={restaurant.name}
              width={80}
              height={80}
              preview={false}
              fallback='https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='
            />
            <div className={styles.info_container}>
              <Typography.Text className={styles.name}>
                {restaurant.name}
              </Typography.Text>
              <div className={styles.rating_container}>
                <StarIcon color="#fcbb00" size={16} weight="fill" />
                <p className={styles.rating_text}>{restaurant.averageRating}</p>
              </div>
            </div>
          </div>
        )}
      </Card>


      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        closable
        maskClosable
        destroyOnHidden
        footer={user.userType === UserType.Company ? undefined : null}
        okText="Selecionar o restaurante"
        cancelText="Voltar"
        width={'90%'}
        className={styles.modal}
        onOk={() => {
          modal.confirm({
            title: 'Seleção de restaurante',
            content: (
              <div className={styles.modal_content}>
                <p>
                  Você está prestes a selecionar o restaurante <strong>{restaurant?.name}</strong> para atender sua empresa.
                </p>
                <p>
                  Ao confirmar, o cardápio deste restaurante será disponibilizado para que os funcionários cadastrados realizem seus pedidos diretamente pelo sistema.
                </p>
                <p>
                  Deseja continuar?
                </p>
              </div>
            ),
            onOk: () => {
              try {
                console.log(company)
                if (!company) return
                updateCompany(company.id, { restaurantId: restaurant?.id })
              } catch (error) {
                message.error('Erro ao selecionar restaurante. Tente novamente mais tarde.')
                console.error('Erro ao selecionar restaurante:', error)
              }
              setIsModalOpen(false)
              message.success('Restaurante selecionado com sucesso!')
            },
            onCancel: () => setIsModalOpen(false),
          })
        }}
      >
        {restaurant && <Menu restaurant={restaurant} />}
      </Modal>
    </>
  )
}

export default RestaurantCard
