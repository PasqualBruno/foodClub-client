import type { Dispatch, SetStateAction } from "react";

export interface ISignUp {
  userType: string;
  password: string;
  confirmPassword?: string;
  email: string;
  name: string;
  cnpj: string;
  cep: string;
  street: string;
  city: string;
  state: string;
  complement?: string;
  number?: string;
  image: string;
}

export interface IProps {
  formData: ISignUp;
  setFormData: Dispatch<SetStateAction<ISignUp>>;
}

export interface IStepOneProps {
  formData: ISignUp;
  //setFormData: Dispatch<SetStateAction<ISignUp>>;
}