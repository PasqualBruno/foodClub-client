export interface ISignUp {
  userType: "company" | "restaurant";
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  cnpj: string;
  cep: string;
  street: string;
  city: string;
  state: string;
  complement?: string;
  number?: string;
  image?: string; // Não sei ainda
}

export interface IStepProps {
  formData: ISignUp;
}