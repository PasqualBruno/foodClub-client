import type { UserType } from "../enums/enums";
import type { IUser } from "./User";

export interface IEmployee extends IUser {
	name: string;
	email: string;
	password: string;
	orders: string[]; // IDs das ordens associadas ao funcionário
	company: string; // ID da empresa à qual o funcionário pertence
	image: string;

	weeklyOrders: {
		Monday: string | null;
		Tuesday: string | null;
		Wednesday: string | null;
		Thursday: string | null;
		Friday: string | null;
		Saturday: string | null;
		Sunday: string | null;
	};
	UserType: UserType; // O tipo de usuário (deve ser 'EMPLOYEE')
}