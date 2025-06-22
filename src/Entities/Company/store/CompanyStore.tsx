import { create } from "zustand"
import type { ICompanyBasicInfo } from "../interfaces/CompanyInterfaces"

interface ICompanyStore {
  company: ICompanyBasicInfo | null
  setCompany: (company: ICompanyBasicInfo) => void
}

export const useCompanyStore = create<ICompanyStore>((set) => ({
  company: null,
  setCompany: (company) => set({ company }),
}))