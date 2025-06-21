import { create } from "zustand";
import type { IEmployee } from "../interfaces/employeeInterfaces";

interface IEmployeeStore {
  employee: IEmployee | null;
  setEmployee: (employee: IEmployee) => void;
}

export const useEmployeeStore = create<IEmployeeStore>((set) => ({
  employee: null,
  setEmployee: (employee) => set({ employee }),
}))