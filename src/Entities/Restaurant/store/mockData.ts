import type { ICompanyOrder } from "@/Entities/Company/interfaces/CompanyInterfaces";

export const mockCompanyOrders: ICompanyOrder[] = [
  {
    id: 1,
    code: 'COD123',
    totalPrice: 85.5, // soma dos pratos dos funcionários abaixo
    status: 'Preparando',
    restaurantId: 101,
    company: {
      id: 10,
      name: 'Tech Solutions LTDA',
      image: 'https://www.zarla.com/images/logo-design/50-famous-brand-logos-to-inspire-you-p1.png',
    },
    employeeOrders: [
      {
        id: 1,
        status: 'Preparando',
        employee: {
          id: 201,
          name: 'Ana Souza',
          image: 'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
        },
        dish: {
          id: 301,
          name: 'Strogonoff de Frango',
          image: 'https://www.shutterstock.com/image-photo/chicken-stroganoff-rice-cucumber-pickles-260nw-2170949216.jpg',
          restaurantId: 101,
          price: 28.0,
        },
      },
      {
        id: 2,
        status: 'Concluido',
        employee: {
          id: 202,
          name: 'Carlos Oliveira',
          image: 'https://www.istockphoto.com/photo/portrait-of-handsome-latin-man-gm1348275658-426107383',
        },
        dish: {
          id: 302,
          name: 'Lasanha Bolonhesa',
          image: 'https://www.shutterstock.com/image-photo/lasagna-bolognese-baked-oven-traditional-260nw-2282294318.jpg',
          restaurantId: 101,
          price: 32.5,
        },
      },
      {
        id: 3,
        status: 'Preparando',
        employee: {
          id: 203,
          name: 'Fernanda Lima',
          image: 'https://www.shutterstock.com/image-photo/young-beautiful-woman-isolated-white-background-2089850974',
        },
        dish: {
          id: 303,
          name: 'Salada Caesar com Frango',
          image: 'https://www.istockphoto.com/photo/chicken-caesar-salad-gm173003029-2391038',
          restaurantId: 101,
          price: 25.0,
        },
      },
    ],
  },
  {
    id: 2,
    code: 'COD456',
    totalPrice: 45.0,
    status: 'Entregue',
    restaurantId: 102,
    company: {
      id: 11,
      name: 'Global Solutions',
      image: 'https://www.nicepng.com/png/full/96-968984_logo-company-logo-png.png',
    },
    employeeOrders: [
      {
        id: 4,
        status: 'Concluido',
        employee: {
          id: 204,
          name: 'Ricardo Silva',
          image: 'https://www.shutterstock.com/image-photo/handsome-young-man-isolated-white-260nw-639783309.jpg',
        },
        dish: {
          id: 304,
          name: 'Pizza Margherita',
          image: 'https://www.shutterstock.com/image-photo/fresh-italian-pizza-margherita-on-260nw-598974891.jpg',
          restaurantId: 102,
          price: 45.0,
        },
      },
    ],
  },
  {
    id: 3,
    code: 'COD789',
    totalPrice: 70.0,
    status: 'Cancelado',
    restaurantId: 103,
    company: {
      id: 12,
      name: 'InovaTech',
      image: 'https://www.logomaker.net/images/uploads/blog/top-company-logos-2.jpg',
    },
    employeeOrders: [
      {
        id: 5,
        status: 'Preparando',
        employee: {
          id: 205,
          name: 'Isabela Costa',
          image: 'https://www.shutterstock.com/image-photo/young-beautiful-woman-isolated-white-260nw-1042738202.jpg',
        },
        dish: {
          id: 305,
          name: 'Hamburguer Clássico',
          image: 'https://www.shutterstock.com/image-photo/classic-hamburger-isolated-on-white-260nw-1029229068.jpg',
          restaurantId: 103,
          price: 35.0,
        },
      },
      {
        id: 6,
        status: 'Concluido',
        employee: {
          id: 206,
          name: 'Pedro Almeida',
          image: 'https://www.shutterstock.com/image-photo/young-bearded-man-isolated-white-260nw-166336332.jpg',
        },
        dish: {
          id: 306,
          name: 'Sushi Variado',
          image: 'https://www.shutterstock.com/image-photo/sushi-set-different-types-rolls-260nw-796853209.jpg',
          restaurantId: 103,
          price: 35.0,
        },
      },
    ],
  },
]
