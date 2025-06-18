import { create } from "zustand";
import type { IEmployeeBasicInfo } from "../interfaces/employeeInterfaces";

interface IEmployeeStore {
  employee: IEmployeeBasicInfo | null;
  setEmployee: (employee: IEmployeeBasicInfo) => void;
}

export const useEmployeeStore = create<IEmployeeStore>((set) => ({
  employee: null,
  setEmployee: (employee) => set({ employee }),
}))