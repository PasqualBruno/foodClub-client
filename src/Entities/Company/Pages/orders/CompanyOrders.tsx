import { useEmployeeStore } from "@/Entities/Employee/store/EmployeeStore"
import { Button, Card, Image, Table, Tag, Tooltip } from "antd"
import { useCompanyStore } from "../../store/CompanyStore"
import { useEffect } from "react"
import { ClockCircleOutlined } from "@ant-design/icons"

const CompanyOrders = () => {
  const { getEmployeeByCompany, companyEmployees } = useEmployeeStore()
  const { company } = useCompanyStore()

  useEffect(() => {
    if (company) {
      getEmployeeByCompany(company.id)
    }
  }, [company])

  const columns = [
    {
      title: "Imagem",
      dataIndex: "image",
      key: "image",
      render: (image: string | undefined) => (
        <Image
          src={
            image ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          width={40}
          height={40}
          preview={false}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          alt="Foto do funcionário"
        />
      ),
    },
    {
      title: "Código",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Funcionário",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Data de Nascimento",
      dataIndex: "birthDate",
      key: "birthDate",
    },
    {
      title: "Status",
      dataIndex: "vacation",
      key: "vacation",
      render: (vacation: boolean) =>
        vacation ? (
          <Tag color="orange">Férias</Tag>
        ) : (
          <Tag color="green">Presente</Tag>
        ),
    },
    {
      title: "Pedido Realizado",
      key: "ordered",
      render: () => (
        <Tooltip title="Aguardando pedido">
          <ClockCircleOutlined size={20} style={{ color: "#faad14" }} />
        </Tooltip>
      ),
    },
  ]

  return (
    <div>
      <h1>Pedidos da empresa</h1>
      <Card style={{ border: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="primary" style={{ marginBottom: 16 }}>
            Novo pedido
          </Button>
          <Button type="primary" style={{ marginBottom: 16 }}>
            Enviar pedido
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={companyEmployees}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  )
}

export default CompanyOrders
