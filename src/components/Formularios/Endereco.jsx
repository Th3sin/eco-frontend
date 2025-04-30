import React, { useState, useEffect } from "react";
import { buscarEnderecoPorCEP } from '../../services/viacep.service'; //import do serviço API
import "./endereco.css";

function Endereco() {

  //useState armazena os valores de endereço

  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  
  const formatarCEP = (cep) => {
    const numeros = cep.replace(/\D/g, '').slice(0, 8); 
    return numeros.length > 5 ? numeros.replace(/(\d{5})(\d{1,3})/, '$1-$2') : numeros;
  };

  //useEffect faz a requisição quando o cep é PREENCHIDO (8 digitos)
  useEffect(() => {
    if (/^\d{8}$/.test(cep)) {
      buscarEnderecoPorCEP(cep).then(data => {
        if (data && !data.error) {
          console.log("Dados da API: ", data);

          setLogradouro(data.logradouro);
          setBairro(data.bairro);
          setCidade(data.localidade);
          setEstado(data.uf);

          console.log(`Campos preenchidos:
            - Logradouro: ${data.logradouro}
            - Bairro: ${data.bairro}
            - Cidade: ${data.localidade}
            - Estado: ${data.uf}
            - Número: ${numero}`);

        } else {

          alert("CEP não encontrado!");
        }

      }).catch(error => console.error("Erro ao buscar CEP:", error));
    }

  }, [cep]);

  return (
    <div className="container-endereco">
      <h3>Endereço</h3>
      <p>Digite o CEP para que os campos sejam preenchidos:</p>
      <br />

      <div>
        <label>CEP:</label>
        <input 
          type="text" 
          value={formatarCEP(cep)} 
          onChange={(e) => setCep(e.target.value)} 
          maxLength="9" 
          placeholder="Digite seu CEP"
        />
      </div>

      <div>
        <label>Logradouro:</label>
        <input type="text" value={logradouro} readOnly />
      </div>

      <div>
        <label>Número:</label>
        <input 
          type='number' 
          value={numero} 
          onChange={(e) => setNumero(e.target.value)} 
        />
      </div>

      <div>
        <label>Complemento</label>
        <input 
          type="text" 
          name="complemento" 
          placeholder="Digite o complemento (opcional)" 
          value={complemento} 
          onChange={(e) => setComplemento(e.target.value)} 
        />
      </div>

      <div>
        <label>Bairro/Distrito:</label>
        <input type="text" value={bairro} readOnly />
      </div>

      <div>
        <label>Cidade:</label>
        <input type="text" value={cidade} readOnly />
      </div>

      <div>
        <label>Estado:</label>
        <input type="text" value={estado} readOnly />
      </div>
    </div>
  );
}

export default Endereco;

// RESUMO DO FLUXO:

/* 1. O usuário digita um CEP no frontend React. 
   2️. O React chama a função buscarEnderecoPorCEP(cep) dentro de viacep.service.js. 
   3️. Essa função faz uma requisição para o backend (localhost:3001/cep/{cep}). 
   4️. O backend consulta a API ViaCEP, verifica se há erro e retorna um JSON. 
   5. O service manipula os dados e os entrega para o React. 
   6️ O React preenche os campos ou exibe um erro caso o CEP seja inválido. */