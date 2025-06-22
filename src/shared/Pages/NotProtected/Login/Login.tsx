import React from 'react'
import { App, Button, Card, Form, Input } from 'antd'
import authRepository from '../../../repositories/auth/authRepository'
import { useNavigate } from 'react-router-dom'
import { useRestaurantStore } from '@/Entities/Restaurant/store/RestaurantStore'
import { useCompanyStore } from '@/Entities/Company/store/CompanyStore'
import { useEmployeeStore } from '@/Entities/Employee/store/EmployeeStore'
import { UserType } from '../../../interfaces/sharedInterfaces'

const Login = () => {
  const { message } = App.useApp()
  const navigate = useNavigate()
  const { setRestaurant } = useRestaurantStore()
  const { setEmployee } = useEmployeeStore()
  const { setCompany } = useCompanyStore()

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await authRepository.login(values.email, values.password)
      const userData = response.userDetails
      const userType: UserType = userData.dataValues.userType
      const commonProps = { userType }

      const actions = {
        [UserType.Restaurant]: () =>
          setRestaurant({ ...userData.restaurant, ...commonProps }),

        [UserType.Employee]: () =>
          setEmployee({ ...userData.employee, image: userData.employee.image || '', ...commonProps }),

        [UserType.Company]: () =>
          setCompany({ ...userData.company, image: userData.company.image || '', ...commonProps })
      }

      actions[userType]?.()

      localStorage.setItem('foodClubToken', response.token)
      message.success('Login realizado com sucesso!')
      navigate('/inicio')
    } catch (error: any) {
      message.error('Falha no login. ' + error.response?.data.message)
    }
  }

  return (
    <div style={styles.container}>
      <Card title="Login" style={styles.card}>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={err => console.log('Failed:', err)}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Entrar
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="dashed" onClick={() => navigate('/registrar')} block>
              Registrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  card: {
    width: 350,
  },
}

export default Login
