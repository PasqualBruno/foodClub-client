//import type { UserType } from "../enums/enums";

/*
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
*/

export interface IStepProps {
  formData: RegisterPayload;
}

interface EntityData {
  name: string;
  cep: string;
  number: string;
}

export interface RegisterRestaurantPayload {
  name: string;
  email: string;
  password: string;
  userType: 'restaurant';
  profileImage?: string;
  cnpj: string;
  restaurant: EntityData;
}

export interface RegisterCompanyPayload {
  name: string;
  email: string;
  password: string;
  userType: 'company';
  profileImage?: string;
  cnpj: string;
  company: EntityData;
}

export type RegisterPayload = RegisterRestaurantPayload | RegisterCompanyPayload;