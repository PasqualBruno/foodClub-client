import { Form, Radio } from "antd";
import empresaIcon from '../../../../../../assets/SignUp/icons/empresa.svg';
import restauranteIcon from '../../../../../../assets/SignUp/icons/restaurante.svg';
import './StepOne.scss';
import TextContainer from "../../TextContainer/TextContainer";
import type { IStepProps } from "../../../interfaces/Signup";

export default function StepOne({ formData }: IStepProps) {
  const value = formData.userType || "company";

  return (
    <>
      <TextContainer 
        title="Você quer se cadastrar como"
        subtitle="Escolha o tipo de cadastro desejado"
      />

      <Form.Item 
        name="userType"
        rules={[{ required: true, message: "Por favor, selecione o tipo de cadastro" }]}
      >
        <Radio.Group className="radio-card-group">
          <Radio
            value="company"
            className={`radio-card ${value === "company" ? "active" : ""}`}
          >
            <img src={empresaIcon} alt="Empresa" />
            <p>Empresa</p>
          </Radio>

          <Radio
            value="restaurant"
            className={`radio-card ${value === "restaurant" ? "active" : ""}`}
          >
            <img src={restauranteIcon} alt="Restaurante" />
            <p>Restaurante</p>
          </Radio>
        </Radio.Group>
      </Form.Item>
    </>
  );
}
