import type { IRestaurant } from '@/Entities/Restaurant/interfaces/RestaurantInterfaces'
import { useDishStore } from '@/Entities/Restaurant/store/DishStore'
import { App, Card, Image, Rate, Tag } from 'antd'
import { useEffect, useMemo } from 'react'

import styles from './Menu.module.scss'
import { ForkKnifeIcon } from '@phosphor-icons/react'
import DishCardMenu from '../DishCardMenu/DishCardMenu'
import { nanoid } from 'nanoid'

type MenuProps = {
  restaurant: IRestaurant
}

const Menu = ({ restaurant }: MenuProps) => {
  const { getDishes, dishes } = useDishStore()
  const { message } = App.useApp()

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        await getDishes()
      } catch (error: any) {
        message.error("Erro ao carregar pratos. Tente novamente mais tarde.")
        console.error("Erro ao carregar pratos:", error)
      }
    }

    fetchDishes()
  }, [restaurant])

  const cheaperDish = useMemo(() => {
    if (dishes.length === 0) return null

    return dishes.reduce((prev, current) =>
      prev.price < current.price ? prev : current
    )
  }, [dishes])

  return (
    <div className={styles.menu_container}>
      <Card className={styles.menu_card} size='small'>
        <div className={styles.menu_header}>
          <Image
            className={styles.restaurant_image}
            src={restaurant.image}
            alt={restaurant.name}
            width={120}
            height={120}
            preview={false}
          />
          <div className={styles.info_container}>
            <p className={styles.name}>{restaurant.name}</p>

            <div className={styles.infos_container}>
              <div className={styles.restaurant_info}>
                <div className={styles.rating_container}>
                  <Rate allowHalf defaultValue={2.5} />
                  <p className={styles.average_rating}>{restaurant.averageRating || 2.5}</p>
                  <p className={styles.rating_count}>({restaurant?.restaurantRatings?.length || 0})</p>
                </div>
              </div>

              <div className={styles.dishes_info}>
                <div className={styles.dishes_quantity}>
                  <ForkKnifeIcon size={20} />
                  <p>Refeições: {dishes.length}</p>
                </div>
                {cheaperDish && (
                  <div className={styles.cheaper_dish_container}>
                    <p>Pratos a partir de</p>
                    <Tag color="#50a773" className={styles.price_value}>
                      R$ {cheaperDish.price.toFixed(2)}
                    </Tag>

                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </Card >

      <p className={styles.menu_title}>Pratos</p>

      <div className={styles.dishes_container}>
        {
          dishes.map((dish) => (
            <DishCardMenu
              key={nanoid()}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              image={dish.image}
              averageRating={dish.averageRating}
              ratings={dish.ratings}
            />
          ))
        }
      </div>

    </div >
  )
}

export default Menu
