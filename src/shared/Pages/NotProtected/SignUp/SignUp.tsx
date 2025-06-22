import { Button, Flex, Form, Progress, Tabs, message } from "antd";
import { useState } from "react";
import StepOne from "./components/Steps/StepOne/StepOne";
import StepTwo from "./components/Steps/StepTwo/StepTwo";
import StepThree from "./components/Steps/StepThree/StepThree";
import StepFour from "./components/Steps/StepFour/StepFour";
import StepFive from "./components/Steps/StepFive/StepFive";
import signupImage from "../../../../assets/SignUp/girl-background.svg";
import styles from "./SignUp.module.scss";
import type { RegisterPayload } from "./interfaces/Signup";
import { useSignUp } from "./hooks/useSignUp";
import { useNavigate } from "react-router-dom";



export default function SignUp() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<RegisterPayload>({
    userType: "company",
    name: "",
    email: "",
    password: "",
    cnpj: "",
    profileImage: "",
    company: {
      name: "",
      cep: "",
      number: "",
    },
  });

  const { register, isLoading } = useSignUp();
  const isLastStep = currentStep === 5;
  const progress = Math.round((currentStep / 5) * 100);
  const labels = ["Tipo", "Conta", "Dados", "Logo", "Finalização"];

  const handleValuesChange = (_: any, allValues: any) => {
    const { userType, name, email, password, cnpj, cep, number } = allValues;
    const entity = { name, cep, number };
    const profileImage = formData.profileImage || "";

    const payload: RegisterPayload =
      userType === "restaurant"
        ? {
            userType,
            name,
            email,
            password,
            cnpj,
            profileImage,
            restaurant: entity,
          }
        : {
            userType,
            name,
            email,
            password,
            cnpj,
            profileImage,
            company: entity,
          };

    setFormData(payload);
  };

  const handleImageChange = (image: string) => {
    setFormData((prev) => ({
      ...prev,
      profileImage: image,
    }));
  };

  const handleFinish = async () => {
    try {
      await register(formData);
      message.success("Cadastro realizado com sucesso!");
      navigate('/entrar')
    } catch {
      message.error("Erro ao cadastrar. Verifique os dados.");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <Form
        className={styles.signupForm}
        initialValues={{ userType: "company" }}
        onValuesChange={handleValuesChange}
      >
        <Tabs
          className={styles.signupTabs}
          activeKey={String(currentStep)}
          onChange={(key) => setCurrentStep(Number(key))}
          centered
          items={Array.from({ length: 5 }).map((_, i) => {
            const id = String(i + 1);
            const stepProps = { formData };

            const content =
              id === "1" ? (
                <StepOne {...stepProps} />
              ) : id === "2" ? (
                <StepTwo {...stepProps} />
              ) : id === "3" ? (
                <StepThree {...stepProps} />
              ) : id === "4" ? (
                <StepFour {...stepProps} onImageChange={handleImageChange} />
              ) : (
                <StepFive {...stepProps} />
              );

            return { label: labels[i], key: id, children: content };
          })}
        />

        <Flex className={styles.progressButtonsContainer} gap="small" vertical>
          <div className={styles.signupButtons}>
            {currentStep > 1 && (
              <Button
                type="default"
                className={styles.backButton}
                onClick={() =>
                  setCurrentStep((prev) => Math.max(prev - 1, 1))
                }
              >
                Voltar
              </Button>
            )}

            <Button
              type="primary"
              className={styles.signupButton}
              loading={isLoading}
              htmlType="button"
              onClick={
                isLastStep
                  ? handleFinish
                  : () => setCurrentStep((prev) => Math.min(prev + 1, 5))
              }
            >
              {isLastStep ? "Finalizar" : "Próximo"}
            </Button>
          </div>

          <Progress
            strokeColor="#7D0000"
            percent={progress}
            showInfo={false}
          />
        </Flex>
      </Form>

      <div className={styles.signupImage}>
        <img src={signupImage} alt="Imagem de Cadastro" />
      </div>
    </div>
  );
}
