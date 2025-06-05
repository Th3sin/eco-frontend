/* API CEP */
/* Arquivo de serviço que faz a requisição ao backend */
/* RODAR NO TERMINAL COM COMANDO "npx json-server --watch enderecos.json --port 3001" */

export async function buscarEnderecoPorCEP(cep) {
  // Valida o formato do CEP antes de fazer a requisição
  if (!/^\d{8}$/.test(cep)) {
    return { error: "Formato de CEP inválido!" }; // Retorna erro se o CEP não for válido
  }

  try {
    // Faz a requisição à API do backend (ou ao servidor local)
    const response = await Promise.race([
      fetch(`http://localhost:3001/cep/${cep}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Tempo de resposta excedido")), 5000) // Timeout após 5 segundos
      ),
    ]);

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Se a API ViaCEP retornar erro, trata-se aqui
    if (data.erro) {
      throw new Error("CEP não encontrado!");
    }

    return data; // Retorna os dados do endereço se tudo ocorrer bem
  } catch (error) {
    // Captura os erros e trata de maneira adequada
    console.error("Erro ao buscar CEP:", error);

    // Erros específicos de rede
    if (error.message === "Failed to fetch") {
      return { error: "Erro de rede. Tente novamente mais tarde." };
    }

    // Caso o erro seja de timeout
    if (error.message === "Tempo de resposta excedido") {
      return { error: "A requisição demorou muito. Tente novamente." };
    }

    // Caso o erro seja de outros tipos
    return { error: error.message };
  }
}