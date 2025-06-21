import image from "antd/es/image"

export const UserType = {
  Company: 'company',
  Restaurant: 'restaurant',
  Employee: 'employee',
} as const

export type UserType = (typeof UserType)[keyof typeof UserType]

export interface IUser {
  id: number | undefined
  name: string
  userType: UserType | undefined
  image: string
}