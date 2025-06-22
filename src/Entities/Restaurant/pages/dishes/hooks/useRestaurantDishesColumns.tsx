import { Rate, Image, Tag, Typography, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { IDish } from '@/Entities/Restaurant/interfaces/RestaurantInterfaces'
import { PencilSimpleIcon, TrashSimpleIcon } from '@phosphor-icons/react'

const useRestaurantDishesColumns = (
  onEditClick: (dish: IDish) => void,
  onDeleteClick: (dishId: number, dishName: string) => void
): ColumnsType<IDish> => {
  return [
    {
      title: 'Imagem',
      dataIndex: 'image',
      key: 'image',
      render: (src: string) => <Image src={src} width={64} height={64} alt="Imagem do prato" />,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <Tag color="green">R$ {price.toFixed(2)}</Tag>,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Avaliação',
      dataIndex: 'averageRating',
      key: 'averageRating',
      render: (rating: number) => <Rate allowHalf disabled defaultValue={rating} />,
      sorter: (a, b) => a.averageRating - b.averageRating,
    },
    {
      title: 'Qtd. avaliações',
      dataIndex: 'ratings',
      key: 'ratings',
      render: (ratings) => (
        <Typography.Text style={{ color: '#3e3e3e', opacity: 0.6 }}>
          {ratings?.length || 0}
        </Typography.Text>
      ),
      sorter: (a, b) => (a.ratings?.length || 0) - (b.ratings?.length || 0),
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <PencilSimpleIcon
            size={20}
            cursor="pointer"
            color="#7D0000"
            onClick={() => onEditClick(record)}
          />
          <TrashSimpleIcon
            size={20}
            cursor="pointer"
            color="#d32029"
            onClick={() => onDeleteClick(record.id, record.name)}
          />
        </Space>
      ),
    },
  ]
}

export default useRestaurantDishesColumns
