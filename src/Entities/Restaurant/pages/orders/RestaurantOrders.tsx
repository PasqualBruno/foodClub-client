import { useEffect, useState } from 'react'
import {
  App,
  Button,
  Card,
  Image,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { ICompanyOrder, IEmployeeOrder } from '@/Entities/Company/interfaces/CompanyInterfaces'
import { useRestaurantStore } from '@/Entities/Restaurant/store/RestaurantStore'

function RestaurantOrders() {
  const { companyOrders, getCompanyOrders, updateEmployeeOrder, updateCompanyOrder } = useRestaurantStore()
  const { message } = App.useApp()

  const [selectedOrder, setSelectedOrder] = useState<ICompanyOrder | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingStatusId, setEditingStatusId] = useState<number | null>(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  useEffect(() => {
    async function fetchOrders() {
      try {
        await getCompanyOrders(1)
      } catch (error) {
        message.error('Erro ao carregar pedidos das empresas.')
      }
    }

    fetchOrders()
  }, [getCompanyOrders, message])

  function handleStatusChange(orderId: number, newStatus: string) {
    try {
      const updatedOrders = companyOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
      useRestaurantStore.setState({ companyOrders: updatedOrders })
      message.success('Status atualizado com sucesso.')
    } catch {
      message.error('Erro ao atualizar status.')
    } finally {
      setEditingStatusId(null)
    }
  }

  function openEmployeeModal(order: ICompanyOrder) {
    setSelectedOrder(order)
    setModalOpen(true)
    const checkedKeys = order.employeeOrders
      .filter((eo) => eo.status === 'Concluido')
      .map((eo) => eo.id)
    setSelectedRowKeys(checkedKeys)
  }

  async function handleAllConcluded() {
    if (!selectedOrder) return

    const orderId = selectedOrder.id

    try {
      setModalOpen(false)
      setSelectedOrder(null)
      setSelectedRowKeys([])
      message.info('Pedido está pronto, procurando entregador...')
      await updateCompanyOrder(orderId, { status: 'Procurando Entregador' })

      await wait(5000)

      message.info('Entregador encontrado.')
      await updateCompanyOrder(orderId, { status: 'Enviado' })

      await wait(5000)

      message.success('Pedido entregue!')
      await updateCompanyOrder(orderId, { status: 'Entregue' })
    } catch (error) {
      message.error('Erro ao atualizar status do pedido da empresa.')
    }
  }

  // Função auxiliar de espera
  function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }


  async function handleEmployeeSelectionChange(
    selectedKeys: React.Key[],
    selectedRows: IEmployeeOrder[]
  ) {
    const previouslySelected = new Set(selectedRowKeys)
    const currentlySelected = new Set(selectedKeys)

    const added = selectedKeys.filter((key) => !previouslySelected.has(key))
    const removed = Array.from(previouslySelected).filter((key) => !currentlySelected.has(key))

    try {
      for (const orderId of added) {
        await updateEmployeeOrder(orderId as number, { status: 'Concluido' })
      }
      for (const orderId of removed) {
        await updateEmployeeOrder(orderId as number, { status: 'Preparando' })
      }

      if (selectedOrder) {
        const updatedOrder = companyOrders.find((o) => o.id === selectedOrder.id)
        setSelectedOrder(updatedOrder || null)
      }

      const total = selectedOrder?.employeeOrders.length || 0
      if (selectedKeys.length === total && total > 0) {
        message.success('Todos os pedidos dos funcionários foram concluídos!')
        handleAllConcluded()
      }

      setSelectedRowKeys(selectedKeys)
    } catch (error) {
      message.error('Erro ao atualizar status dos pedidos dos funcionários.')
    }
  }

  function getSortedEmployeeOrders(): IEmployeeOrder[] {
    if (!selectedOrder) return []
    return [...selectedOrder.employeeOrders].sort((a, b) => {
      if (a.status === b.status) return 0
      if (a.status === 'Concluido') return 1
      return -1
    })
  }

  const columns: ColumnsType<ICompanyOrder> = [
    {
      title: 'Código',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Empresa',
      key: 'company',
      render(_, record) {
        return (
          <Space>
            <Image
              src={record.company.image}
              width={32}
              height={32}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
              preview={false}
              fallback='https://static.vecteezy.com/system/resources/previews/046/593/914/non_2x/creative-logo-design-for-real-estate-company-vector.jpg'
            />
            <Typography.Text>{record.company.name}</Typography.Text>
          </Space>
        )
      },
    },
    {
      title: 'Total',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render(price: number) {
        return (
          <Tag color="green" style={{ minWidth: 80, textAlign: 'center' }}>
            R$ {price}
          </Tag>
        )
      },
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: 'Itens',
      dataIndex: 'employeeOrders',
      key: 'employeeOrders',
      render(orders) {
        return orders.length
      },
      sorter: (a, b) => a.employeeOrders.length - b.employeeOrders.length,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render(status: string, record) {
        const color = {
          Preparando: 'blue',
          Entregue: 'green',
          Cancelado: 'red',
        }[status] || 'default'

        return editingStatusId === record.id ? (
          <Select
            defaultValue={status}
            style={{ minWidth: 120 }}
            onChange={(value) => handleStatusChange(record.id, value)}
            onBlur={() => setEditingStatusId(null)}
            options={[
              { label: 'Preparando', value: 'Preparando' },
              { label: 'Entregue', value: 'Entregue' },
              { label: 'Cancelado', value: 'Cancelado' },
            ]}
          />
        ) : (
          <Tag
            color={color}
            style={{ minWidth: 90, textAlign: 'center', cursor: 'pointer' }}
            onClick={() => setEditingStatusId(record.id)}
          >
            {status}
          </Tag>
        )
      },
    },
    {
      title: 'Funcionários',
      key: 'actions',
      render(_, record) {
        return (
          <Button type="link" onClick={() => openEmployeeModal(record)}>
            Ver pedidos
          </Button>
        )
      },
    },
  ]

  return (
    <>
      <h1>Pedidos das Empresas</h1>
      <Card style={{ border: 'none' }}>
        <Table<ICompanyOrder>
          className="custom-table"
          columns={columns}
          dataSource={companyOrders}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal
        title={`Pedidos dos Funcionários - ${selectedOrder?.company.name}`}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false)
          setSelectedOrder(null)
          setSelectedRowKeys([])
        }}
        footer={null}
        width={800}
      >
        <Table
          className="custom-table"
          dataSource={getSortedEmployeeOrders()}
          rowKey="id"
          pagination={false}
          rowClassName={(record) =>
            record.status === 'Concluido' ? 'employee-order-concluido' : ''
          }
          rowSelection={{
            selectedRowKeys,
            onChange: handleEmployeeSelectionChange,
          }}
          columns={[
            {
              title: 'Funcionário',
              key: 'employee',
              render(_, record) {
                return (
                  <Space>
                    <Image
                      src={record.employee.image}
                      width={32}
                      height={32}
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                      preview={false}
                      fallback='https://i.pinimg.com/736x/74/c7/9a/74c79ad33fa47102510e888209fbcf11.jpg'
                    />
                    <Typography.Text>{record.employee.name}</Typography.Text>
                  </Space>
                )
              },
            },
            {
              title: 'Prato',
              key: 'dish',
              render(_, record) {
                return (
                  <Space>
                    <Image
                      src={record.dish.image}
                      width={48}
                      height={48}
                      style={{ objectFit: 'cover', borderRadius: 8 }}
                      preview={false}
                      fallback='https://cbx-prod.b-cdn.net/COLOURBOX65474531.jpg?width=800&height=800&quality=70'
                    />
                    <Typography.Text>{record.dish.name}</Typography.Text>
                  </Space>
                )
              },
            },
            {
              title: 'Preço',
              dataIndex: ['dish', 'price'],
              key: 'price',
              render(price) {
                return (
                  <Tag color="green" style={{ minWidth: 80, textAlign: 'center' }}>
                    R$ {price}
                  </Tag>
                )
              },
            },
          ]}
        />
      </Modal>
    </>
  )
}

export default RestaurantOrders
