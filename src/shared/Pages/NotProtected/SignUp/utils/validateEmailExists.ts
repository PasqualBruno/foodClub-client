import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const validateEmailExists = async (_: any, value: string) => {
  if (!value) return Promise.resolve();

  try {
    const response = await axios.get(`${apiUrl}/user/check-email/${value}`);
    const exists = response.data.exists;

    if (exists) {
      return Promise.reject("Este email já está cadastrado");
    }

    return Promise.resolve();
  } catch (err) {
    console.error("Erro na validação do email:", err);
    return Promise.reject("Erro ao validar email. Tente novamente.");
  }
};

