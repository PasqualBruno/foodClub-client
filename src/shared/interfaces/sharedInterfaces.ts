export const UserType = {
  Company: 'company',
  Restaurant: 'restaurant',
  Employee: 'employee',
} as const

export type UserType = (typeof UserType)[keyof typeof UserType]
