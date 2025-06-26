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
      birthDate: employee.birthDate?.split("T")[0],
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
        <Form form={form} layout="vertical" validateTrigger="onChange">
          <Form.Item
            name="name"
            label="Nome"
            hasFeedback
            rules={[
              { required: true, message: "O nome é obrigatório" },
              { min: 3, message: "O nome deve ter no mínimo 3 caracteres" },
              {
                pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
                message: "O nome não pode conter números ou caracteres especiais",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {!editingEmployee && (
            <>
              <Form.Item
                name="email"
                label="E-mail"
                hasFeedback
                rules={[
                  { required: true, message: "O e-mail é obrigatório" },
                  { type: "email", message: "O e-mail não é válido" },
                ]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Senha"
                hasFeedback
                rules={[
                  { required: true, message: "A senha é obrigatória" },
                  { min: 8, message: "A senha deve ter no mínimo 8 caracteres" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </>
          )}

          <Form.Item
            name="cpf"
            label="CPF"
            hasFeedback
            rules={[
              { required: true, message: "O CPF é obrigatório" },
              {
                pattern: /^[0-9]{11}$/,
                message: "O CPF deve conter exatamente 11 números",
              },
            ]}
          >
            <Input maxLength={11} />
          </Form.Item>

          <Form.Item
            name="birthDate"
            label="Data de Nascimento"
            hasFeedback
            rules={[
              { required: true, message: "A data de nascimento é obrigatória" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.resolve()
                  }
                  const year = parseInt(value.substring(0, 4), 10)
                  if (year >= 1900 && year <= 2500) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('O ano deve estar entre 1900 e 2500'))
                },
              }),
            ]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item name="image" label="URL da Imagem" hasFeedback>
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