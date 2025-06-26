import { Card, Image, Modal, Rate } from 'antd'
import styles from './DishCardMenu.module.scss'
import type { IDishRating } from '@/Entities/Restaurant/interfaces/RestaurantInterfaces'
import { StarIcon } from '@phosphor-icons/react'
import { useState } from 'react'

type DishCardMenuProps = {
  name: string
  description: string
  price: number
  image: string
  averageRating: number
  ratings: IDishRating[]
}

const DishCardMenu = (props: DishCardMenuProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Card style={{ width: 'fit-content' }} size="small">
        <div className={styles.container}>
          <div className={styles.info_container}>
            <p className={styles.name}>{props.name}</p>
            <p className={styles.description}>{props.description}</p>

            <div className={styles.footer_container}>
              <p className={styles.price}>R$ {props.price}</p>

              {/* CLICK PARA ABRIR O MODAL */}
              <div
                className={styles.rating_container}
                onClick={() => setIsModalOpen(true)}
                style={{ cursor: 'pointer' }}
              >
                <StarIcon color="#fcbb00" size={16} weight="fill" />
                <p className={styles.rating}>{props.averageRating}</p>
                <p className={styles.reviews_count}>
                  ({props.ratings.length})
                </p>
              </div>
            </div>
          </div>

          <div className={styles.image_container}>
            <Image
              className={styles.image}
              src={
                props.image ||
                'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='
              }
              alt="Imagem do prato"
              preview={false}
            />
          </div>
        </div>
      </Card>

      {/* MODAL COM AVALIAÇÕES */}
      <Modal
        title="Avaliações do prato"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {props.ratings.length === 0 && <p>Sem avaliações ainda.</p>}

        {props.ratings.map((rating) => (
          <div
            key={rating.id}
            style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1.5rem',
              alignItems: 'flex-start',
            }}
          >
            <Image
              src={
                rating.profileImage ||
                'https://cdn-icons-png.flaticon.com/512/149/149071.png'
              }
              width={40}
              height={40}
              style={{ borderRadius: '50%', objectFit: 'cover', objectPosition: 'center' }}
              preview={false}
              className={styles.rating_user_image}
            />

            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>{rating.name}</p>
              <Rate disabled defaultValue={rating.rating} allowHalf />
              <p style={{ marginTop: 6 }}>{rating.description}</p>
            </div>
          </div>
        ))}
      </Modal>
    </>
  )
}

export default DishCardMenu
