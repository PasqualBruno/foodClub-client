export interface ICompany {
  cep: string;
  cnpj: string;
  name: string;
  id: number;
  number: string;
  userId: number
  image?: string
  restaurantId: number
}


export interface ICompanyBasicInfo extends ICompany {
  userType: 'company'
}