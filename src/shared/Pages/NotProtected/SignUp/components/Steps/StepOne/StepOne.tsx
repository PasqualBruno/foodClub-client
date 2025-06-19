import { Form } from "antd";
import empresaIcon from '../../../../../../../assets/SignUp/icons/empresa.svg';
import restauranteIcon from '../../../../../../../assets/SignUp/icons/restaurante.svg';
import styles from './StepOne.module.scss';
import TextContainer from "../../TextContainer/TextContainer";
import type { IStepProps } from "../../../interfaces/Signup";
import { useState } from "react";

export default function StepOne({ formData }: IStepProps) {
  //const value = formData.userType || "company";
  const [value, setValue] = useState(formData.userType || "company");

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
        <div className={styles.radioCardGroup}>
          <label className={`${styles.radioCard} ${value === "company" ? styles.active : ""}`}>
            <input
              type="radio"
              name="userType"
              value="company"
              checked={value === "company"}
              onChange={() => setValue("company")} // ou setFormData
              className={styles.hiddenRadio}
            />
            <img src={empresaIcon} alt="Empresa" />
            <p>Empresa</p>
          </label>

          <label className={`${styles.radioCard} ${value === "restaurant" ? styles.active : ""}`}>
            <input
              type="radio"
              name="userType"
              value="restaurant"
              checked={value === "restaurant"}
              onChange={() => setValue("restaurant")}
              className={styles.hiddenRadio}
            />
            <img src={restauranteIcon} alt="Restaurante" />
            <p>Restaurante</p>
          </label>
        </div>

      </Form.Item>
    </>
  );
}
