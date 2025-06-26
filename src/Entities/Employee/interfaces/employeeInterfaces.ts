import type { IDish } from "@/Entities/Restaurant/interfaces/RestaurantInterfaces";
import type { UserType } from "@/shared/interfaces/sharedInterfaces";

export interface IEmployee {
  birthDate: string;
  cpf: string;
  companyId: number;
  id: number;
  name: string;
  userId: number
  image?: string
  vacation: boolean
}

export interface IWeeklyOrder {
  employeeId: number,
  dayOfWeek: string,
  order: {
    dishId: number,
    quantity: number
  }

}

export interface IEmployeeBasicInfo extends IEmployee {
  userType: UserType

}


export interface IWeeklyOrder {
  employeeId: number,
  dayOfWeek: string,
  dish: IDish,
  order: {
    dishId: number,
    quantity: number
  }
}
