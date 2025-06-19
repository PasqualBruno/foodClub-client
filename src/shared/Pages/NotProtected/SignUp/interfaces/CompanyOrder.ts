import type { OrderStatus } from "../enums/enums";
import type { IDish } from "./Dish";
import type { IIndividualOrder } from "./IndividualOrder";

export interface ICompanyOrder {
	id: string;
	dishes: IDish[];
	company: string;
	collaboratorsOrders: IIndividualOrder[];
	createdAt: string;
	status: OrderStatus;
	restaurant: string;
	code: string;
}