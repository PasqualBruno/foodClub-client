
import { create } from "zustand"
import type { IUser, UserType } from "../interfaces/sharedInterfaces"


interface IAuthStore {
  user: IUser
  auth: boolean
  userType: UserType | undefined
  setUserType: (userType: UserType) => void
  updateUser: (user: IUser) => void
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: {} as IUser,
  auth: false,
  userType: undefined,
  setUserType: (userType: UserType) => set({ userType }),
  updateUser: (user: IUser) => {
    set({ user, auth: true })
  },
}),
)