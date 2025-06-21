import React from 'react'
import { App, Button, Card, Form, Input } from 'antd'
import authRepository from '../../../repositories/auth/authRepository'
import { useNavigate } from 'react-router-dom'
import { useRestaurantStore } from '@/Entities/Restaurant/store/RestaurantStore'
import { useCompanyStore } from '@/Entities/Company/store/CompanyStore'
import { useEmployeeStore } from '@/Entities/Employee/store/EmployeeStore'
import { UserType, type IUser } from '../../../interfaces/sharedInterfaces'
import { useAuthStore } from '@/shared/store/AuthStore'
import type { IRestaurantBasicInfo } from '@/Entities/Restaurant/interfaces/RestaurantInterfaces'
import type { ICompany } from '@/Entities/Company/interfaces/CompanyInterfaces'
import type { IEmployee } from '@/Entities/Employee/interfaces/employeeInterfaces'

const Login = () => {
  const { message } = App.useApp()
  const navigate = useNavigate()
  const { setRestaurant } = useRestaurantStore()
  const { setEmployee } = useEmployeeStore()
  const { setCompany } = useCompanyStore()
  const { updateUser } = useAuthStore()

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await authRepository.login(values.email, values.password)
      const userData = response.userDetails

      const user: IUser = {
        userType: userData.userType,
        id:
          userData.userType === UserType.Restaurant
            ? userData.restaurant.id
            : userData.userType === UserType.Company
              ? userData.company.id
              : userData.userType === UserType.Employee
                ? userData.employee.id
                : undefined,
        name: userData.name,
        image: userData.profileImage,
      }


      if (user.id) {
        setRestaurant({} as IRestaurantBasicInfo)
        setCompany({} as ICompany)
        setEmployee({} as IEmployee)


        if (user.userType === UserType.Restaurant) setRestaurant(userData.restaurant)
        if (user.userType === UserType.Company) setCompany(userData.company)
        if (user.userType === UserType.Employee) setEmployee(userData.employee)
      }

      updateUser(user)
      localStorage.setItem('foodClubToken', response.token)
      message.success('Login realizado com sucesso!')
      navigate('/inicio')
    } catch (error: any) {
      console.log(error)
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
