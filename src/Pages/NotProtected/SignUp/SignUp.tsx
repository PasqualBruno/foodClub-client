import { Button, Flex, Form, Progress, Tabs } from "antd";
import StepOne from "./components/Steps/StepOne/StepOne";
import StepTwo from "./components/Steps/StepTwo/StepTwo";
import StepThree from "./components/Steps/StepThree/StepThree";
import StepFour from "./components/Steps/StepFour/StepFour";
import StepFive from "./components/Steps/StepFive/StepFive";
import signupImage from "../../../assets/SignUp/girl-background.svg";
import "./SignUp.scss";
import { useState } from "react";
import type { ISignUp } from "./interfaces/Signup";

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1); // controle do step
  const [formData, setFormData] = useState<ISignUp>({
    userType: "company",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    cnpj: "",
    cep: "",
    street: "",
    city: "",
    state: "",
    complement: "",
    number: "",
    image: "",
  });


  const isLastStep = currentStep === 5;

  const progress = Math.round((currentStep / 5) * 100);

  const label = [
    "Tipo",
    "Conta",
    "Dados",
    "Logo",
    "Finalização",
  ]

  console.log(formData)
  
  return (
    <div className="signup-container">
      
      {/* Lado esquerdo - Formulário (1/3) */}
      <Form className="signup-form"
      initialValues={{ formData }}
      onValuesChange={(_, allValues) => {
        setFormData((prev) => ({ ...prev, ...allValues }));
      }}
      >
        <Tabs
          activeKey= {String(currentStep)}
          onChange={(key) => setCurrentStep(Number(key))}
          centered
          items={Array.from({ length: 5 }).map((_, i) => {
            const id = String(i + 1);

            let content;
            if (id === '1') content = <StepOne formData={formData}/>;
            else if (id === '2') content = <StepTwo formData={formData} />;
            else if (id === '3') content = <StepThree formData={formData} />;
            else if (id === '4') content = <StepFour />;
            else content = <StepFive />;

            return {
              label: `${label[i]}`,
              key: id,
              children: content,
            };
          })}
        />
        <Flex className="progress-buttons-container" gap="small" vertical>
          <div  className="signup-buttons">
            {currentStep > 1 && (
              <Button
                type="default"
                className="back-button"
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
              >
                Voltar
              </Button>
            )}
            
            
          <Button
            type="primary"
            className="signup-button"
            onClick={!isLastStep ? () => setCurrentStep((prev) => Math.min(prev + 1, 5)) : undefined}
            htmlType={isLastStep ? "submit" : undefined}
          >
            {isLastStep ? "Finalizar" : "Próximo"}
          </Button>

            
          </div>

          <Progress 
            strokeColor="#7D0000"
            percent= {progress} 
            showInfo={false} 
          />
            
        </Flex>
      </Form>

      {/* Lado direito - Imagem (2/3) */}
      <div className="signup-image">
        <img
          src={signupImage}
          alt="Imagem de Cadastro"
        />
      </div>

    </div>
  );
}
