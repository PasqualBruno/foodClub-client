export async function getAddressByCep(cep: string) {
  const cleanedCep = cep.replace(/\D/g, '');

  if (cleanedCep.length !== 8) {
    throw new Error("CEP inválido");
  }

  const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);

  if (!response.ok) {
    throw new Error("Erro ao buscar endereço");
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP não encontrado");
  }

  return {
    street: data.logradouro,
    city: data.localidade,
    state: data.uf,
    complement: data.complemento,
  };
}
