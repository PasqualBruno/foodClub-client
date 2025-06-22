export interface IIndividualOrder {
	_id: string;
	order: {
		dishId: string;
		quantity: number;
	};
	employee: string;
	companyOrder: string;
}
