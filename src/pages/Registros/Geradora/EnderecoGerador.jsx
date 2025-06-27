import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../Css/cadastro.css";
import MinimalistHeader from "../../../components/Header/Minimal/HeaderMinimalist";

const EnderecoGerador = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const geradoraId = location.state?.geradoraId;

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
            // Preenche os campos com os dados da API, mas permite edição manual
            setLogradouro(data.logradouro || "");
            setBairro(data.bairro || "");
            setCidade(data.localidade || "");
            setUf(data.uf || "");
          } else {
            alert("CEP não encontrado.");
            // Limpa para que usuário possa preencher manualmente
            setLogradouro("");
            setBairro("");
            setCidade("");
            setUf("");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar CEP:", error);
          alert("Erro ao buscar endereço. Você pode preencher manualmente.");
          setLogradouro("");
          setBairro("");
          setCidade("");
          setUf("");
        });
    } else {
      // Limpa os campos se o CEP estiver incompleto
      setLogradouro("");
      setBairro("");
      setCidade("");
      setUf("");
    }
  }, [cep]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!geradoraId) {
      alert("Empresa não identificada.");
      navigate("/CadastroGerador");
      return;
    }

    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      alert("CEP inválido. Deve conter 8 dígitos numéricos.");
      return;
    }

    if (!numero) {
      alert("Número é obrigatório.");
      return;
    }


    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/api/v1/usuario/geradora/${geradoraId}`,
        {
          cep: cepLimpo,
          logradouro,
          bairro,
          cidade,
          uf,
          numero,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          validateStatus: (status) =>
            (status >= 200 && status < 300) || status === 204,
        }
      );

      alert("Cadastro feito com sucesso!");
      navigate("/Home");

      setCep("");
      setLogradouro("");
      setBairro("");
      setCidade("");
      setUf("");
      setNumero("");
    } catch (error) {
      const msg =
        error.response?.data?.mensagemErro ||
        error.response?.data?.message ||
        error.message ||
        "Erro ao cadastrar o endereço.";
      alert(msg);
      console.error("Erro ao cadastrar endereço:", error.response || error.message);
    }
  };

  return (
    <div className="pagina-cadastro">
      <MinimalistHeader />
      <div className="texto-introducao">
        <h1>
          Cadastro quase concluído! Insira o endereço da sua empresa para habilitar as solicitações de coleta.
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
            {/* Agora editável, sem readOnly */}
            <input
              type="text"
              value={logradouro}
              onChange={(e) => setLogradouro(e.target.value)}
              placeholder="Logradouro"
            />
          </div>
          <div className="campo">
            <label>Bairro</label>
            <input
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              placeholder="Bairro"
            />
          </div>
          <div className="campo">
            <label>Cidade</label>
            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Cidade"
            />
          </div>
          <div className="campo">
            <label>UF</label>
            <input
              type="text"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              placeholder="UF"
              maxLength={2}
            />
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

export default EnderecoGerador;