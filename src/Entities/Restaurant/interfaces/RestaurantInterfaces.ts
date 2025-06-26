import { IDish } from './RestaurantInterfaces';
import type { UserType } from "@/shared/interfaces/sharedInterfaces";

export interface IDish {
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  image: string;
  averageRating: number;
  ratings: IDishRating[];
  id: number
}

export interface IDishBasicInfo {
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  image: string;
}


export interface IDishRating {
  id: number;
  dishId: number;
  userId: number;
  rating: number;
  name: string,
  profileImage: string
  description: string
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
  profileImage: string
  ratingCount: number

}

export interface IRestaurantBasicInfo extends IRestaurant {
  userType: UserType
}