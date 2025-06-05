import React, { useState, useEffect } from "react";
import { buscarEnderecoPorCEP } from '../../services/viacep.service'; // Importa o serviço API

function Endereco() {
  // useState armazena os valores de endereço
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [erro, setErro] = useState('');  // Estado de erro

  // Função para formatar o CEP (exibição)
  const formatarCEP = (cep) => {
    const numeros = cep.replace(/\D/g, '').slice(0, 8); 
    return numeros.length > 5 ? numeros.replace(/(\d{5})(\d{1,3})/, '$1-$2') : numeros;
  };

  // useEffect faz a requisição quando o CEP é PREENCHIDO (8 dígitos)
  useEffect(() => {
    if (/^\d{8}$/.test(cep)) {
      buscarEnderecoPorCEP(cep).then(data => {
        if (data && !data.error) {
          console.log("Dados da API: ", data);

          setLogradouro(data.logradouro);
          setBairro(data.bairro);
          setCidade(data.localidade);
          setEstado(data.uf);
          setErro('');  // Limpar erro se o CEP for válido
        } else {
          setErro("CEP não encontrado!");  // Atualizando o erro
        }
      }).catch(error => {
        console.error("Erro ao buscar CEP:", error);
        setErro("Erro ao buscar o CEP. Tente novamente.");  // Caso ocorra erro na requisição
      });
    }
  }, [cep]);

  return (
    <div className="container-endereco">

      <div className="coleta-form-group">
        <label>CEP:</label>
        <input 
          type="text" 
          value={formatarCEP(cep)} 
          onChange={(e) => setCep(e.target.value)} 
          maxLength="9" 
          placeholder="Digite seu CEP"
        />
      </div>

      {erro && <div style={{color: 'red', marginBottom: '10px'}}>{erro}</div>} {/* Exibe o erro */}

      <div className="coleta-form-group">
        <label>Logradouro:</label>
        <input type="text" value={logradouro} readOnly />
      </div>

      <div className="coleta-form-group">
        <label>Número:</label>
        <input 
          type="number" 
          value={numero} 
          onChange={(e) => setNumero(e.target.value)} 
        />
      </div>

      <div className="coleta-form-group">
        <label>Complemento</label>
        <input 
          type="text" 
          name="complemento" 
          placeholder="Digite o complemento (opcional)" 
          value={complemento} 
          onChange={(e) => setComplemento(e.target.value)} 
        />
      </div>

      <div className="coleta-form-group">
        <label>Bairro/Distrito:</label>
        <input type="text" value={bairro} readOnly />
      </div>

      <div className="coleta-form-group">
        <label>Cidade:</label>
        <input type="text" value={cidade} readOnly />
      </div>

      <div className="coleta-form-group">
        <label>Estado:</label>
        <input type="text" value={estado} readOnly />
      </div>
    </div>
  );
}

export default Endereco;
