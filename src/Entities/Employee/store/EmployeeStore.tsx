import { create } from "zustand";
import type { IEmployee, IWeeklyOrder } from "../interfaces/employeeInterfaces";
import employeeRepository from "@/Entities/Employee/repository/employeeRepository";


interface IEmployeeStore {
  employee: IEmployee | null;
  companyEmployees: IEmployee[] | null;
  employeeWeeklyOrders: IWeeklyOrder[] | null;
  setEmployee: (employee: IEmployee) => void;
  getEmployeeByCompany: (companyId: number) => Promise<IEmployee[]>;
  deleteEmployee: (id: number) => Promise<void>;
  updateEmployee: (id: number, data: Partial<IEmployee>) => Promise<IEmployee>;
  createEmployee: (data: Partial<IEmployee>, companyId: number) => Promise<IEmployee>;
  createWeeklyOrder: (data: IWeeklyOrder) => Promise<IWeeklyOrder>;
  getWeeklyOrdersByEmployee: (id: number) => Promise<IWeeklyOrder[]>
}

export const useEmployeeStore = create<IEmployeeStore>((set, get) => ({
  employee: null,
  companyEmployees: null,
  employeeWeeklyOrders: null,

  setEmployee: (employee) => set({ employee }),
  setEmployeeWeeklyOrders: (orders: IWeeklyOrder[]) => set({ employeeWeeklyOrders: orders }),

  getEmployeeByCompany: async (companyId: number) => {
    try {
      const response = await employeeRepository.getEmployeeByCompanyIdTemp(companyId);
      set({ companyEmployees: response });
      return response;
    } catch (error) {
      console.error("Erro ao buscar funcionários da empresa:", error);
      throw error;
    }
  },

  deleteEmployee: async (id: number) => {
    try {
      const response = await employeeRepository.deleteEmployee(id);
      return response;
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
      throw error;
    }
  },

  updateEmployee: async (id: number, data: Partial<IEmployee>) => {
    try {
      const response = await employeeRepository.updateEmployee(id, data);
      return response;
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      throw error;
    }
  },

  createEmployee: async (data: Partial<IEmployee>, companyId: number) => {
    try {
      const response = await employeeRepository.createEmployee(data, companyId);
      return response;
    } catch (error) {
      console.error("Erro ao criar funcionário:", error);
      throw error;
    }
  },

  createWeeklyOrder: async (data: IWeeklyOrder) => {
    try {
      const response = await employeeRepository.createWeeklyOrder(data);
      // Após criar o pedido, chame a função de busca para atualizar a store
      const { getWeeklyOrdersByEmployee } = get();
      await getWeeklyOrdersByEmployee(data.employeeId);
      return response;
    } catch (error) {
      console.error("Erro ao criar funcionário:", error);
      throw error;
    }
  },

  getWeeklyOrdersByEmployee: async (id: number) => {
    try {
      const response = await employeeRepository.getWeeklyOrdersByEmployee(id);
      set({ employeeWeeklyOrders: response });
      return response;
    } catch (error) {
      console.error("Erro ao buscar pedidos semanais do funcionário:", error);
      throw error;
    }
  },
}));