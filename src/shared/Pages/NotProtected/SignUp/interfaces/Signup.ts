import type { UserType } from "../enums/enums";

export interface ISignUp {
  userType: UserType;
  email: string;
  password: string;
  confirmPassword?: string;
  name: string;
  cnpj: string;
  cep: string;
  street: string;
  city: string;
  state: string;
  complement?: string;
  number?: string;
  image: string; // Não sei ainda
}

export interface IStepProps {
  formData: ISignUp;
}