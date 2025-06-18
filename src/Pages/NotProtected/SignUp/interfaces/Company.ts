import type { IEmployee } from "./Employee";
import type { IUser } from "./User";

export interface ICompany extends IUser {
	name: string;
	cnpj: string;
	cep: string;
	number: string;
	street: string;
	city: string;
	state: string;
	complement: string;
	image: string;
	affiliateRestaurants: string[]; // IDs dos restaurantes afiliados
	employees: IEmployee[]; // IDs dos funcionários
}