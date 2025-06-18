import React from 'react'
import { App, Button, Card, Form, Input, Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import authRepository from '../../../repositories/auth/authRepository' // ajuste o caminho se necessário

const { Option } = Select

const SignUp = () => {
  const { message } = App.useApp()
  const navigate = useNavigate()

  const onFinish = async (values: { userType: string; email: string; password: string }) => {
    try {
      const response = await authRepository.register(values)
      console.log(response)
      if (response.status === 201) {
        message.success('Cadastro realizado com sucesso!')
        navigate('/entrar')
      }
    } catch (error: any) {
      message.error('Erro ao cadastrar: ' + error.response?.data?.message || error.message)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div style={styles.container}>
      <Card title="Cadastro" style={styles.card}>
        <Form
          name="signup"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="userType"
            label="Tipo de Usuário"
            rules={[{ required: true, message: 'Por favor, selecione o tipo de usuário!' }]}
          >
            <Select placeholder="Selecione o tipo">
              <Option value="company">Empresa</Option>
              <Option value="restaurant">Restaurante</Option>
              <Option value="employee">Funcionário</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { required: true, message: 'Por favor, insira seu e-mail!' },
              { type: 'email', message: 'E-mail inválido!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Senha"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Cadastrar
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type='dashed' onClick={() => navigate('/entrar')} block>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div >
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
    width: 400,
  },
}

export default SignUp
