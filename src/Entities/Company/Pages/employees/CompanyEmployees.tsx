import { useEmployeeStore } from "@/Entities/Employee/store/EmployeeStore"
import { useAuthStore } from "@/shared/store/AuthStore"
import { useEffect, useState } from "react"
import {
  Table,
  Button,
  Modal,
  Space,
  Avatar,
  Form,
  Input,
  Switch,
  App,
} from "antd"
import { PlusOutlined } from "@ant-design/icons"
import {
  PencilSimple,
  TrashSimple,
  UserCircle,
} from "@phosphor-icons/react"
import 'antd/dist/reset.css'
import type { IEmployee } from "@/Entities/Employee/interfaces/employeeInterfaces"
import { UserType } from "@/shared/interfaces/sharedInterfaces"

const CompanyEmployees = () => {
  const {
    getEmployeeByCompany,
    companyEmployees,
    deleteEmployee,
    updateEmployee,
    createEmployee,
  } = useEmployeeStore()

  const { user } = useAuthStore()
  const { modal, message } = App.useApp()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<IEmployee | null>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    if (user.id) {
      getEmployeeByCompany(user.id)
    }
  }, [getEmployeeByCompany, user.id])

  const showAddModal = () => {
    setEditingEmployee(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const showEditModal = (employee: IEmployee) => {
    setEditingEmployee(employee)
    form.setFieldsValue({
      ...employee,
      birthDate: employee.birthDate?.split("T")[0], // remove hora
    })
    setIsModalVisible(true)
  }

  const showDeleteConfirm = (employee: IEmployee) => {
    modal.confirm({
      title: "Confirmar exclusão",
      content: (
        <p>
          Tem certeza que deseja excluir <strong>{employee.name}</strong>?
        </p>
      ),
      okText: "Excluir",
      cancelText: "Cancelar",
      okButtonProps: { danger: true },
      async onOk() {
        try {
          await deleteEmployee(employee.id)
          message.success("Funcionário excluído com sucesso!")
          getEmployeeByCompany(user.id)
        } catch (err) {
          message.error("Erro ao excluir funcionário")
        }
      },
    })
  }

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields()

      if (editingEmployee) {
        // PUT
        const payload = {
          name: values.name,
          cpf: values.cpf,
          birthDate: values.birthDate,
          vacation: values.vacation ?? false,
          image: values.image,
        }

        await updateEmployee(editingEmployee.id, payload)
        message.success("Funcionário atualizado com sucesso!")
      } else {
        // POST
        const payload = {
          name: values.name,
          email: values.email,
          password: values.password,
          cpf: values.cpf,
          userType: UserType.Employee,
          employee: {
            name: values.name,
            birthDate: values.birthDate,
          },
          company: {
            id: user.id,
          },
          image: values.image,
        }

        await createEmployee(payload, user.id)
        message.success("Funcionário cadastrado com sucesso!")
      }

      getEmployeeByCompany(user.id)
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      console.error("Erro ao enviar:", error)
      message.error("Erro ao salvar funcionário")
    }
  }

  const columns = [
    {
      title: "Imagem",
      dataIndex: "image",
      key: "image",
      render: (image: string) =>
        image ? (
          <Avatar src={image} />
        ) : (
          <Avatar icon={<UserCircle size={24} />} />
        ),
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
    },
    {
      title: "Data de Nascimento",
      dataIndex: "birthDate",
      key: "birthDate",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: IEmployee) => (
        <Space>
          <Button
            type="text"
            icon={<PencilSimple size={20} />}
            onClick={() => showEditModal(record)}
          >
            Editar
          </Button>
          <Button
            type="text"
            danger
            icon={<TrashSimple size={20} />}
            onClick={() => showDeleteConfirm(record)}
          >
            Excluir
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>Funcionários</h1>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
          Adicionar Funcionário
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={companyEmployees || []}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingEmployee ? "Editar Funcionário" : "Novo Funcionário"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleFormSubmit}
        okText={editingEmployee ? "Salvar Alterações" : "Cadastrar"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true, message: "Insira o nome" }]}
          >
            <Input />
          </Form.Item>

          {!editingEmployee && (
            <>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[{ required: true, message: "Insira o e-mail" }]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Senha"
                rules={[{ required: true, message: "Insira a senha" }]}
              >
                <Input.Password />
              </Form.Item>
            </>
          )}

          <Form.Item
            name="cpf"
            label="CPF"
            rules={[{ required: true, message: "Insira o CPF" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="birthDate"
            label="Data de Nascimento"
            rules={[{ required: true, message: "Insira a data de nascimento" }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item name="image" label="URL da Imagem">
            <Input />
          </Form.Item>

          {editingEmployee && (
            <Form.Item
              name="vacation"
              label="Férias"
              valuePropName="checked"
            >
              <Switch checkedChildren="Sim" unCheckedChildren="Não" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  )
}

export default CompanyEmployees
