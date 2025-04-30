/* API CEP */
/* Arquivo de serviço que faz a requisição ao backend */
/* RODAR NO TERMINAL COM COMANDO "npx json-server --watch enderecos.json --port 3001" */

export async function buscarEnderecoPorCEP(cep) {
  try {
    const response = await fetch(`http://localhost:3001/cep/${cep}`, {

      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Se a API ViaCEP retorna um erro, tratar aqui
    if (data.erro) {
      throw new Error("CEP não encontrado!");
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return { error: error.message }; // Retorna um objeto com a mensagem de erro
  }
}