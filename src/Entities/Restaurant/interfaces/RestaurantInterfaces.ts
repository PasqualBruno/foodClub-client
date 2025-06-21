import type { UserType } from "@/shared/interfaces/sharedInterfaces";

export interface IDish {
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  image: string;
  averageRating: number;
  ratings: IDishRating[];
}


export interface IDishRating {
  id: number;
  dishId: number;
  userId: number;
  rating: number;
}

export interface IRestaurant {
  id: number;
  name: string;
  userId: number;
  cep: string;
  cnpj: string;
  number: string;
  image: string;
  averageRating?: number;
  restaurantRatings?: IDishRating[]

}

export interface IRestaurantBasicInfo extends IRestaurant {
  userType: UserType
}