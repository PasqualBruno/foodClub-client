import { Col, Descriptions, Form, Row } from "antd";
import TextContainer from "../../TextContainer/TextContainer";
import type { IStepProps } from "../../../interfaces/Signup";
import styles from "./StepFive.module.scss";

export default function StepFive({ formData }: IStepProps) {
  const entity = formData.userType === "restaurant"
    ? formData.restaurant
    : formData.company;

  return (
    <Form.Item>
      <TextContainer
        title="Finalização"
        subtitle="Revise as informações e finalize o cadastro"
      />

      <Row gutter={[16, 16]} className={styles.reviewContainer}>
        <Col span={24}>
          <Descriptions
            bordered
            column={1}
            size="small"
            className={styles.reviewTable}
          >
            <Descriptions.Item label="Tipo de Cadastro">
              {formData.userType === "restaurant" ? "Restaurante" : "Empresa"}
            </Descriptions.Item>
            <Descriptions.Item label="Nome">{formData.name}</Descriptions.Item>
            <Descriptions.Item label="CNPJ">{formData.cnpj}</Descriptions.Item>
            <Descriptions.Item label="Email">{formData.email}</Descriptions.Item>
            <Descriptions.Item label="CEP">{entity?.cep}</Descriptions.Item>
            {/*<Descriptions.Item label="Rua">{formData.street}</Descriptions.Item>*/}
            <Descriptions.Item label="Número">{entity?.number}</Descriptions.Item>
            {/*<Descriptions.Item label="Complemento">{formData.complement}</Descriptions.Item>*/}
            {/*<Descriptions.Item label="Cidade">{formData.city}</Descriptions.Item>*/}
            {/*<Descriptions.Item label="Estado">{formData.state}</Descriptions.Item>*/}
          </Descriptions>
        </Col>
      </Row>
    </Form.Item>
  );
}
