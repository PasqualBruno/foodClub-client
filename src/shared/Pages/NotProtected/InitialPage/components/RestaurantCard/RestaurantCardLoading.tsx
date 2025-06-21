// RestaurantCardLoading.tsx
import { Card, Skeleton } from 'antd'
import styles from './RestaurantCard.module.scss'

const RestaurantCardLoading = () => {
  return (
    <Card size="small" className={styles.container_card}>
      <div className={styles.container}>
        <Skeleton.Avatar active size={80} shape="square" />
        <div className={styles.info_container} style={{ flex: 1, marginLeft: 12 }}>
          <Skeleton.Input style={{ width: '60%', marginBottom: 10 }} active size="default" />
          <Skeleton.Input style={{ width: '30%' }} active size="small" />
        </div>
      </div>
    </Card>
  )
}

export default RestaurantCardLoading
