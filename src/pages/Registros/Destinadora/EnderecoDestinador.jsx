import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../Css/cadastro.css";
import MinimalistHeader from "../../../components/Header/HeaderMinimalist";

const EnderecoDestinador = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Pega o destinadoraId passado pelo state na navegação anterior
  const destinadoraId = location.state?.destinadoraId;

  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [numero, setNumero] = useState("");

  useEffect(() => {
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
          } else {
            alert("CEP não encontrado.");
            setLogradouro("");
            setBairro("");
            setCidade("");
            setUf("");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar CEP:", error);
          alert("Erro ao buscar endereço. Verifique o CEP.");
          setLogradouro("");
          setBairro("");
          setCidade("");
          setUf("");
        });
    } else {
      setLogradouro("");
      setBairro("");
      setCidade("");
      setUf("");
    }
  }, [cep]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!destinadoraId) {
      alert("Destinadora não identificada. Volte ao registro da destinadora.");
      navigate("/CadastroDestinador");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/usuario/destinadora/${destinadoraId}`,
        {
          cep,
          logradouro,
          bairro,
          cidade,
          uf,
          num: numero,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Endereço cadastrado com sucesso!");
      console.log("Endereço cadastrado com sucesso:", response.data);

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
    <div className="pagina-cadastro">
      <MinimalistHeader />

      <div className="texto-introducao">
        <h1>
          Cadastro quase concluído! Insira o endereço da sua empresa para
          habilitar as funcionalidades de coletas.
        </h1>
      </div>

      <div className="container-formulario">
        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label>CEP</label>
            <input
              type="text"
              value={cep}
              onChange={(e) => {
                const valor = e.target.value.replace(/\D/g, "").slice(0, 8);
                setCep(valor);
              }}
              required
              placeholder="Digite o CEP"
            />
          </div>

          <div className="campo">
            <label>Logradouro</label>
            <input type="text" value={logradouro} readOnly placeholder="Logradouro" />
          </div>

          <div className="campo">
            <label>Bairro</label>
            <input type="text" value={bairro} readOnly placeholder="Bairro" />
          </div>

          <div className="campo">
            <label>Cidade</label>
            <input type="text" value={cidade} readOnly placeholder="Cidade" />
          </div>

          <div className="campo">
            <label>UF</label>
            <input type="text" value={uf} readOnly placeholder="UF" />
          </div>

          <div className="campo">
            <label>Número</label>
            <input
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
              placeholder="Número"
            />
          </div>

          <button type="submit">Finalizar Cadastro</button>
        </form>
      </div>

      <div className="faixa-copyright-clara">
        <p>© {new Date().getFullYear()} eco+. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default EnderecoDestinador;