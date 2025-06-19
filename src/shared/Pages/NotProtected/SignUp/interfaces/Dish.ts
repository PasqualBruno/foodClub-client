export interface IRating {
	userId: string;
	rating: number;
}

export interface IDish {
	_id: string;
	name: string;
	description: string;
	price: number;
	image: string | null;
	ratings: IRating[];
}
