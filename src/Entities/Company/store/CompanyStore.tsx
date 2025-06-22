import { create } from "zustand"
import type { ICompany } from "../interfaces/CompanyInterfaces"
import companyRepository from "../repository/companyRepository"

interface ICompanyStore {
  company: ICompany | null
  getCompany: (companyId: number) => void
  updateCompany: (companyId: number, data: Partial<ICompany>) => Promise<void>
  setCompany: (company: ICompany) => void
}

export const useCompanyStore = create<ICompanyStore>((set) => ({
  company: null,

  setCompany: (company: ICompany) => {
    set({ company })
  },
  getCompany: async (companyId: number) => {
    try {
      const response = await companyRepository.getCompanyById(companyId)
      console.log({ response })
      set({ company: response })
    } catch (error) {
      console.error("Erro ao buscar empresa:", error)
    }
  },

  updateCompany: async (companyId: number | undefined, data: Partial<ICompany>) => {
    try {
      const response = await companyRepository.updateCompany(companyId, data)
      console.log(response)
      set({ company: response })
    } catch (error) {
      console.error("Erro ao atualizar empresa:", error)
    }
  }
}))
