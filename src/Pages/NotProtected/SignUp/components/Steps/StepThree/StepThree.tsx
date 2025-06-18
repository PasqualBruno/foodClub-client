import { Form } from "antd";
import TextContainer from "../../TextContainer/TextContainer";
import type { IStepProps } from "../../../interfaces/Signup";

export default function StepThree ({ formData }: IStepProps) {
  const userType = formData.userType || 'company';

  const subtitle = `Informações ${userType === 'restaurant' ? 'do restaurante' : 'da empresa'}`;

  return (
    <Form.Item>
      <TextContainer
        title={userType === "restaurant" ? "Restaurante" : "Empresa"}
        subtitle={subtitle}
      />
      {/* Add your form or content here */}
    </Form.Item>
  );
}