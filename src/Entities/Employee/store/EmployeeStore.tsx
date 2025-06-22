import { create } from "zustand";
import type { IEmployee } from "../interfaces/employeeInterfaces";
import employeeRepository from "@/Entities/Company/repository/employeeRepository";

interface IEmployeeStore {
  employee: IEmployee | null;
  companyEmployees: IEmployee[] | null;
  setEmployee: (employee: IEmployee) => void;
  getEmployeeByCompany: (companyId: number) => Promise<IEmployee[]>;
  deleteEmployee: (id: number) => Promise<void>;
  updateEmployee: (id: number, data: Partial<IEmployee>) => Promise<IEmployee>;
  createEmployee: (data: Partial<IEmployee>, companyId: number) => Promise<IEmployee>;
}

export const useEmployeeStore = create<IEmployeeStore>((set) => ({
  employee: null,
  companyEmployees: null,

  setEmployee: (employee) => set({ employee }),

  getEmployeeByCompany: async (companyId: number) => {
    try {
      const response = await employeeRepository.getEmployeeByCompanyIdTemp(companyId);
      console.log(response);
      set({ companyEmployees: response });
      return response; // agora está retornando corretamente um IEmployee[]
    } catch (error) {
      console.error("Erro ao buscar funcionários da empresa:", error);
      throw error;
    }
  },

  deleteEmployee: async (id: number) => {
    try {
      const response = await employeeRepository.deleteEmployee(id);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
      throw error;
    }
  },

  updateEmployee: async (id: number, data: Partial<IEmployee>) => {
    try {
      const response = await employeeRepository.updateEmployee(id, data);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      throw error;
    }
  },

  createEmployee: async (data: Partial<IEmployee>) => {
    try {
      const response = await employeeRepository.createEmployee(data);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Erro ao criar funcionário:", error);
      throw error;
    }
  }
}));
