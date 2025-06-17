import { Button, Flex, Form, Progress, Tabs } from "antd";
import StepOne from "./components/Steps/StepOne/StepOne";
import StepTwo from "./components/Steps/StepTwo/StepTwo";
import StepThree from "./components/Steps/StepThree/StepThree";
import StepFour from "./components/Steps/StepFour/StepFour";
import StepFive from "./components/Steps/StepFive/StepFive";
import signupImage from "../../../assets/SignUp/girl-background.svg";
import "./SingUp.css";
import { useState } from "react";

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1); // controle do step

  const progress = Math.round((currentStep / 5) * 100);
  return (
    <div className="signup-container">
      
      {/* Lado esquerdo - Formulário (1/3) */}
      <Form className="signup-form">
        <Tabs
          activeKey= {String(currentStep)}
          onChange={(key) => setCurrentStep(Number(key))}
          centered
          items={Array.from({ length: 5 }).map((_, i) => {
            const id = String(i + 1);

            let content;
            if (id === '1') content = <StepOne />;
            else if (id === '2') content = <StepTwo />;
            else if (id === '3') content = <StepThree />;
            else if (id === '4') content = <StepFour />;
            else content = <StepFive />;

            return {
              label: `Etapa ${id}`,
              key: id,
              children: content,
            };
          })}
        />
        <Flex gap="small" vertical>
          <Progress 
          percent= {progress} 
          showInfo={false} />

          <div  className="signup-buttons">
            {currentStep > 1 && (
              <Button
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
              >
                Voltar
              </Button>
            )}
            
            {currentStep < 5 ? (
              <Button
                type="primary"
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 5))}
              >
                Próximo
              </Button>
            ) : (
              <Button type="primary" htmlType="submit">
                Finalizar
              </Button>
            )}
          </div>
            
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
