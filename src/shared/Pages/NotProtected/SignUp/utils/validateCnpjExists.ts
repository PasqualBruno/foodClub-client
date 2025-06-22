// utils/validateCnpj.ts
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export async function validateCnpjExists(cnpj: string): Promise<boolean> {
  try {
    const [companiesResponse, restaurantsResponse] = await Promise.all([
      axios.get(`${apiUrl}/company`),
      axios.get(`${apiUrl}/restaurant`)
    ]);

    const cnpjNormalized = cnpj.replace(/\D/g, "");

    const existsInCompany = companiesResponse.data.some((company: any) => {
      return company.cnpj.replace(/\D/g, "") === cnpjNormalized;
    });

    const existsInRestaurant = restaurantsResponse.data.some((restaurant: any) => {
      return restaurant.cnpj.replace(/\D/g, "") === cnpjNormalized;
    });

    return existsInCompany || existsInRestaurant;

  } catch (error) {
    console.error("Erro ao verificar CNPJ:", error);
    return false;
  }
}
