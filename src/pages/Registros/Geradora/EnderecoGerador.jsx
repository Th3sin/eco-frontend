import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../Css/cadastro.css";

const GeradorEndereco = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const usuarioId = location.state?.usuarioId;

  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [numero, setNumero] = useState("");

  useEffect(() => {

    /* ------------------ api de cep ------------------ */
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length === 8) {

      axios
        .get(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        .then((response) => {
          const data = response.data;
          if (!data.erro) {
            setLogradouro(data.logradouro || "");
            setBairro(data.bairro || "");
            setCidade(data.localidade || "");
            setUf(data.uf || "");

          } else 
          {
            alert("CEP não encontrado.");
            limparEndereco();
          }
        })

        .catch((error) => {
          console.error("Erro ao buscar CEP:", error);
          alert("Erro ao buscar endereço. Verifique o CEP.");
          limparEndereco();

        });

    } 
    else {
      limparEndereco();
    }

  }, [cep]);

  const limparEndereco = () => {
    setLogradouro("");
    setBairro("");
    setCidade("");
    setUf("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioId) {
      alert("Usuário não identificado. Volte ao registro.");
      navigate("/Registro");
      return;
    }

    try {
        // faz a requisição para o backend enviando os dados do formulário
      const response = await axios.post(
        "http://localhost:8080/api/v1/usuario/geradora",
        {
          usuarioId,
          cep,
          logradouro,
          bairro,
          cidade,
          uf,
          numero,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Endereço cadastrado com sucesso!");
      console.log("Endereço cadastrado:", response.data);

      // Redirecionar e limpar
      navigate("/Login");
      setCep("");
      setLogradouro("");
      setBairro("");
      setCidade("");
      setUf("");
      setNumero("");

    } catch (error) {

      alert("Erro ao cadastrar o endereço. Insira um CEP válido.");
      console.error(
        "Erro ao cadastrar endereço:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container-formulario">
      <form className="formulario-cadastro" onSubmit={handleSubmit}>
        <h2>Endereço</h2>

        <div className="campo">
          <label>CEP</label>
          <input type="text" value={cep} onChange={(e) => 
          {
            const valor = e.target.value.replace(/\D/g, "").slice(0, 8);
            setCep(valor);
          }}

        required
          />
        </div>

        <div className="campo">
          <label>Logradouro</label>
          <input type="text" value={logradouro} onChange={(e) => setLogradouro(e.target.value)}
        readOnly
          />
        </div>

        <div className="campo">
          <label>Bairro</label>
          <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} 
          readOnly
          />
        </div>

        <div className="campo">
          <label>Cidade</label>
          <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)}
        readOnly
          />
        </div>

        <div className="campo">
          <label>UF</label>
          <input type="text" value={uf} onChange={(e) => setUf(e.target.value)} maxLength={2}
        readOnly
          />
        </div>

        <div className="campo">
          <label>Número</label>
          <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)}
        required
          />
        </div>

        <button type="submit">Finalizar Cadastro</button>
      </form>
    </div>
  );
};

export default GeradorEndereco;