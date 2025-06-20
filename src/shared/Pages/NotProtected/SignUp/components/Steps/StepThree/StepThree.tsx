import { Col, Form, Input, Row, message } from "antd";
import TextContainer from "../../TextContainer/TextContainer";
import type { IStepProps } from "../../../interfaces/Signup";
import { getAddressByCep } from "../../../utils/getAdressByCep";
import { debounce } from "lodash";
import { useEffect } from "react";

export default function StepThree({ formData }: IStepProps) {
  const form = Form.useFormInstance(); // 👈 usa o contexto do form do SignUp
  const userType = formData.userType || "company";
  const subtitle = `Informações ${userType === "restaurant" ? "do restaurante" : "da empresa"}`;

  const handleCepChange = debounce(async (cep: string) => {
    try {
      if (cep && cep.replace(/\D/g, "").length === 8) {
        const address = await getAddressByCep(cep);
        form.setFieldsValue({
          street: address.street,
          city: address.city,
          state: address.state,
          complement: address.complement,
        });
      }
    } catch (err: any) {
      message.warning(err.message || "Erro ao buscar endereço");
    }
  }, 800);

  useEffect(() => {
    form.setFieldsValue(formData); // Preenche com os dados iniciais
  }, [formData]);

  return (
    <>
      <TextContainer
        title={userType === "restaurant" ? "Restaurante" : "Empresa"}
        subtitle={subtitle}
      />

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            labelCol={{ span: 24 }}
            name="name"
            label="Nome"
            rules={[{ required: true, message: "Informe o nome." }]}
          >
            <Input placeholder="Nome da empresa ou restaurante" size="large" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            labelCol={{ span: 24 }}
            name="cnpj"
            label="CNPJ"
            rules={[{ required: true, message: "Informe o CNPJ." }]}
          >
            <Input placeholder="00.000.000/0001-00" size="large" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            labelCol={{ span: 24 }}
            name="cep"
            label="CEP"
            rules={[{ required: true, message: "Informe o CEP." }]}
          >
            <Input
              placeholder="00000-000"
              size="large"
              onChange={(e) => handleCepChange(e.target.value)}
            />
          </Form.Item>
        </Col>

        <Col span={16}>
          <Form.Item
            labelCol={{ span: 24 }}
            name="street"
            label="Rua"
            rules={[{ required: true, message: "Informe a rua." }]}
          >
            <Input size="large" disabled />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }}
            name="number"
            label="Número"
            rules={[{ required: true, message: "Informe o número." }]}
          >
            <Input size="large" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            labelCol={{ span: 24 }}
            name="city"
            label="Cidade"
            rules={[{ required: true, message: "Informe a cidade." }]}
          >
            <Input size="large" disabled />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            labelCol={{ span: 24 }}
            name="state"
            label="Estado"
            rules={[{ required: true, message: "Informe o estado." }]}
          >
            <Input size="large" disabled />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="complement"
            label="Complemento"
            labelCol={{ span: 24 }}
          >
            <Input size="large" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
