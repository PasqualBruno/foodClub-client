import { Col, Form, Input, Row, message } from "antd";
import { useEffect } from "react";
import TextContainer from "../../TextContainer/TextContainer";
import type { IStepProps } from "../../../interfaces/Signup";
import { getAddressByCep } from "../../../utils/getAdressByCep";
import { debounce } from "lodash";
import { maskCNPJ, maskCEP } from "../../../utils/masks";
import { validateCnpjExists } from "../../../utils/validateCnpjExists"; // ✅ função reutilizada

export default function StepThree({ formData }: IStepProps) {
  const form = Form.useFormInstance();
  const userType = formData.userType || "company";

  const subtitle = `Informações ${
    userType === "restaurant" ? "do restaurante" : "da empresa"
  }`;

  // 🏠 Preenche endereço ao digitar o CEP
  const handleCepChange = debounce(async (cep: string) => {
    try {
      const cleanedCep = cep.replace(/\D/g, "");
      if (cleanedCep.length === 8) {
        const address = await getAddressByCep(cleanedCep);
        form.setFieldsValue({
          street: address.street,
          city: address.city,
          state: address.state,
          complement: address.complement,
        });
      }
    } catch (err) {
      console.log(err);
      message.warning("Erro ao buscar endereço");
    }
  }, 800);

  // Sincroniza dados com `formData`
  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  return (
    <>
      <TextContainer
        title={userType === "restaurant" ? "Restaurante" : "Empresa"}
        subtitle={subtitle}
      />

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Nome"
            labelCol={{ span: 24 }}
            name="name"
            rules={[{ required: true, message: "Informe o nome." }]}
          >
            <Input size="large" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="CNPJ"
            labelCol={{ span: 24 }}
            name="cnpj"
            validateTrigger="onBlur"
            normalize={maskCNPJ}
            rules={[
              { required: true, message: "Informe o CNPJ." },
              {
                validator: async (_, value) => {
                  const cleaned = value?.replace(/\D/g, "");
                  if (!cleaned || cleaned.length !== 14) {
                    return Promise.reject("CNPJ incompleto");
                  }

                  const exists = await validateCnpjExists(cleaned);
                  if (exists) {
                    return Promise.reject("CNPJ Indisponível");
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input size="large" placeholder="00.000.000/0001-00" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="CEP"
            labelCol={{ span: 24 }}
            name="cep"
            normalize={maskCEP}
            rules={[{ required: true, message: "Informe o CEP." }]}
          >
            <Input
              size="large"
              placeholder="00000-000"
              onChange={(e) => handleCepChange(e.target.value)}
            />
          </Form.Item>
        </Col>

        <Col span={16}>
          <Form.Item
            label="Rua"
            labelCol={{ span: 24 }}
            name="street"
            rules={[{ required: true, message: "Informe a rua." }]}
          >
            <Input size="large" disabled />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Número"
            labelCol={{ span: 24 }}
            name="number"
            rules={[{ required: true, message: "Informe o número." }]}
          >
            <Input size="large" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Cidade"
            labelCol={{ span: 24 }}
            name="city"
            rules={[{ required: true, message: "Informe a cidade." }]}
          >
            <Input size="large" disabled />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Estado"
            labelCol={{ span: 24 }}
            name="state"
            rules={[{ required: true, message: "Informe o estado." }]}
          >
            <Input size="large" disabled />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Complemento"
            labelCol={{ span: 24 }}
            name="complement"
          >
            <Input size="large" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
