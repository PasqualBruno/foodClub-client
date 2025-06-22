import { App, Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import loginImage from '../../../../assets/SignUp/girl-background.svg'
import styles from './Login.module.scss'
import authRepository from '../../../repositories/auth/authRepository'
import { useRestaurantStore } from '@/Entities/Restaurant/store/RestaurantStore'
import { useCompanyStore } from '@/Entities/Company/store/CompanyStore'
import { useEmployeeStore } from '@/Entities/Employee/store/EmployeeStore'
import { useAuthStore } from '@/shared/store/AuthStore'
import { UserType, type IUser } from '../../../interfaces/sharedInterfaces'
import type { IRestaurantBasicInfo } from '@/Entities/Restaurant/interfaces/RestaurantInterfaces'
import type { ICompany } from '@/Entities/Company/interfaces/CompanyInterfaces'
import type { IEmployee } from '@/Entities/Employee/interfaces/employeeInterfaces'

export default function Login() {
  const { message } = App.useApp()
  const navigate = useNavigate()

  const { setRestaurant } = useRestaurantStore()
  const { setEmployee } = useEmployeeStore()
  const { setCompany } = useCompanyStore()
  const { updateUser } = useAuthStore()

  const [loading, setLoading] = useState(false)

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setLoading(true)
      const response = await authRepository.login(values.email, values.password)
      const userData = response.userDetails

      const user: IUser = {
        userType: userData.userType,
        id:
          userData.userType === UserType.Restaurant
            ? userData.restaurant.id
            : userData.userType === UserType.Company
              ? userData.company.id
              : userData.employee?.id,
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
      message.error('Falha no login. ' + error.response?.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <Form
        className={styles.loginForm}
        layout="vertical"
        onFinish={onFinish}
      >
        <h2 className={styles.title}>Bem-vindo de volta</h2>
        <p className={styles.subtitle}>Faça login na sua conta</p>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }]}
          hasFeedback
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="password"
          rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          className={styles.loginButton}
        >
          Entrar
        </Button>

        <Button
          type="dashed"
          block
          className={styles.registerButton}
          onClick={() => navigate('/registrar')}
        >
          Criar conta
        </Button>
      </Form>

      <div className={styles.loginImage}>
        <img src={loginImage} alt="Ilustração de Login" />
      </div>
    </div>
  )
}
