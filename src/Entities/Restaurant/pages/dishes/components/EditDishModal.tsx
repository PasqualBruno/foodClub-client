import { Modal, Form, Input, InputNumber } from 'antd'
import type { IDish } from '@/Entities/Restaurant/interfaces/RestaurantInterfaces'
import { useEffect } from 'react'

type EditDishModalProps = {
  visible: boolean
  dish: IDish
  onCancel: () => void
  onSave: (updatedDish: IDish) => void
}

const EditDishModal = ({ visible, dish, onCancel, onSave }: EditDishModalProps) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        name: dish.name,
        price: dish.price,
        image: dish.image,
        description: dish.description,
      })
    }
  }, [visible, dish, form])

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        onSave({
          ...dish,
          name: values.name,
          price: values.price,
          image: values.image,
          description: values.description,
        })
      })
      .catch(() => { })
  }

  return (
    <Modal
      title={`Editar prato: ${dish.name}`}
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Salvar"
    >
      <Form form={form} layout="vertical" name="editDishForm" validateTrigger="onChange">
        <Form.Item
          label="Nome"
          name="name"
          hasFeedback
          rules={[
            { required: true, message: 'O nome é obrigatório' },
            { min: 3, message: 'O nome deve ter no mínimo 3 letras' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Preço"
          name="price"
          hasFeedback
          rules={[
            { required: true, message: 'O preço é obrigatório' },
            { type: 'number', min: 0.01, message: 'O preço deve ser maior que R$ 0,00' },
          ]}
        >
          <InputNumber
            min={0}
            step={0.01}
            style={{ width: '100%' }}
            placeholder="Ex: 19.90"
            formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            parser={value => value?.replace(/[^0-9,.-]+/g, '').replace(',', '.') ?? ''}
          />
        </Form.Item>

        <Form.Item
          label="URL da imagem"
          name="image"
          hasFeedback
          rules={[
            { required: true, message: 'A URL da imagem é obrigatória' },
            { type: 'url', message: 'A URL informada não é válida' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Descrição"
          name="description"
          hasFeedback
          rules={[
            { required: true, message: 'A descrição é obrigatória' },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditDishModal