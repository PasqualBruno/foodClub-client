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

export interface IEmployeeBasicInfo extends IEmployee {
  userType: UserType

}