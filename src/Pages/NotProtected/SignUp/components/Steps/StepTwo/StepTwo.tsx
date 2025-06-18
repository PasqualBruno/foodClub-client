import { Form, Input } from "antd";
import TextContainer from "../../TextContainer/TextContainer";
import type { IStepProps } from "../../../interfaces/Signup";

export default function StepTwo({ formData, } : IStepProps) {
  const userType = formData.userType || 'company'; // Default to "Empresa" if not set

  return (
    <Form.Item>
      <TextContainer
        title={userType === "restaurant" ? "Restaurante" : "Empresa"}
        subtitle="Informações da conta"
      />

      {/* Email */}
      <Form.Item
        label="Email"
        labelCol={{ span: 24 }}
        name="email"
        rules={[
          { required: true, message: 'Por favor, insira seu email' },
          { type: 'email', message: 'Email inválido' }
        ]}
        hasFeedback
      >
        <Input size="large" />
      </Form.Item>

      {/* Senha */}
      <Form.Item
        label="Senha"
        labelCol={{ span: 24 }}
        name="password"
        rules={[
          { required: true, message: 'Por favor, insira sua senha' },
          { min: 6, message: 'A senha deve ter no mínimo 6 caracteres' }
        ]}
        hasFeedback
      >
        <Input.Password size="large"/>
      </Form.Item>

      {/* Confirmar Senha */}
      <Form.Item
        label="Confirmar Senha"
        labelCol={{ span: 24 }}
        name="confirmPassword"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Por favor, confirme sua senha' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('As senhas não coincidem'));
            },
          }),
        ]}
      >
        <Input.Password size="large" />
      </Form.Item>
    </Form.Item>
  );
}