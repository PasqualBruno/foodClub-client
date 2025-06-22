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


export interface IEmployeeOrder {
  id: number,
  status: 'Preparando' | 'Concluido',
  employee: {
    name: string,
    id: number
    image: string
  }
  dish: {
    name: string,
    id: number,
    image: string
    restaurantId: number
    price: number
  }
}

export interface ICompanyOrder {
  id: number,
  code: string,
  totalPrice: number,
  status: 'Enviado' | 'Entregue' | 'Cancelado' | 'Preparando' | 'Procurando Entregador',
  restaurantId: number,
  company: {
    name: string,
    id: number
    image: string
  },
  employeeOrders: IEmployeeOrder[]
}