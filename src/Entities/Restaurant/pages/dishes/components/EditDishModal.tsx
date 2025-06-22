import { Modal, Form, Input, InputNumber, App } from 'antd'
import type { IDish } from '@/Entities/Restaurant/interfaces/RestaurantInterfaces'
import React, { useEffect } from 'react'

type EditDishModalProps = {
  visible: boolean
  dish: IDish
  onCancel: () => void
  onSave: (updatedDish: IDish) => void
}

const EditDishModal = ({ visible, dish, onCancel, onSave }: EditDishModalProps) => {
  const [form] = Form.useForm()
  const { message } = App.useApp()

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
        // message.success('Prato editado com sucesso!')
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
      <Form form={form} layout="vertical" name="editDishForm">
        <Form.Item
          label="Nome"
          name="name"
          rules={[{ required: true, message: 'Por favor, informe o nome do prato' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Preço"
          name="price"
          rules={[{ required: true, message: 'Por favor, informe o preço' }]}
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
          rules={[{ required: true, message: 'Por favor, informe a URL da imagem' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Descrição"
          name="description"
          rules={[{ required: true, message: 'Por favor, informe a descrição' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditDishModal
