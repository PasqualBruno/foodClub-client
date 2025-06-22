import { Card, Image } from 'antd'
import styles from './DishCardMenu.module.scss'
import type { IDishRating } from '@/Entities/Restaurant/interfaces/RestaurantInterfaces'
import { StarIcon } from '@phosphor-icons/react'

type DishCardMenuProps = {
  name: string
  description: string
  price: number
  image: string
  averageRating: number
  ratings: IDishRating[]
}

const DishCardMenu = (props: DishCardMenuProps) => {
  return (
    <Card style={{ width: 'fit-content' }} size="small">
      <div className={styles.container}>
        <div className={styles.info_container}>
          <p className={styles.name}>{props.name}</p>
          <p className={styles.description}>{props.description}</p>
          <div className={styles.footer_container}>

            <p className={styles.price}>R$ {props.price.toFixed(2)}</p>
            <div className={styles.rating_container}>
              <StarIcon color="#fcbb00" size={16} weight="fill" />
              <p className={styles.rating}>{props.averageRating}</p>
              <p className={styles.reviews_count}>({props.ratings.length})</p>
            </div>
          </div>
        </div>
        <div className={styles.image_container} > <Image
          className={styles.image}
          src={
            props.image
              ? props.image
              : 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='
          }
          alt=""
          preview={false}
        /></div>
      </div>
    </Card >
  )
}

export default DishCardMenu
