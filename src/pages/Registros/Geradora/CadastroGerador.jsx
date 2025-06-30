import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import "../Css/cadastro.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MinimalistHeader from "../../../components/Header/Minimal/HeaderMinimalist";

function CadastroGerador() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);

  const [formData, setFormData] = useState({
    telefone: "",
    nome: "",
    cnpj: "",
    ramo: "",
  });

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token não encontrado");

        const response = await axios.get("http://localhost:8080/api/v1/usuario/logado", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsuario(response.data);
        console.log("Usuário logado:", response.data);
      } catch (error) {
        console.error("Erro ao buscar o usuário logado:", error);
      }
    };

    fetchUsuario();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario) {
      alert("Usuário não carregado. Aguarde e tente novamente.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const busca = await axios.get(
        `http://localhost:8080/api/v1/usuario/geradora/buscar-cnpj?cnpj=${formData.cnpj.replace(/[^\d]/g, "")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (busca.data.length > 0) {
        alert("CNPJ já cadastrado.");
        return;
      }

      // Payload para cadastro
      const payload = {
        telefone: formData.telefone,
        nome: formData.nome,
        cnpj: formData.cnpj.replace(/[^\d]/g, ""),
        ramo: formData.ramo,
      };

      const geradoraResponse = await axios.post(
        "http://localhost:8080/api/v1/usuario/geradora",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Empresa Geradora cadastrada com sucesso!");

      navigate("/EnderecoGerador", { state: { geradoraId: geradoraResponse.data.id } });
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert("Erro ao cadastrar: " + JSON.stringify(error.response.data));
      } else {
        alert("Erro ao cadastrar. Tente novamente.");
      }
    }
  };

  return (
    <div className="pagina-cadastro">
      <MinimalistHeader />

      <div className="texto-introducao">
        <h1>
          Para ter acesso completo ao sistema, preencha os dados abaixo e comprove que sua empresa está apta a utilizar a plataforma.
        </h1>
      </div>

      <div className="container-formulario">
        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="tel">Telefone:</label>
            <InputMask
              mask="(99) 99999-9999"
              id="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="Digite seu Telefone"
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite o nome da empresa"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="cnpj">CNPJ:</label>
            <InputMask
              mask="99.999.999/9999-99"
              value={formData.cnpj}
              onChange={handleChange}
              required
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  id="cnpj"
                  name="cnpj"
                  placeholder="Digite o CNPJ"
                />
              )}
            </InputMask>
          </div>

          <div className="campo">
            <label htmlFor="ramo">Área de Atuação:</label>
            <select
              name="ramo"
              id="ramo"
              value={formData.ramo}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o ramo de atividade</option>
              <option value="industrial">Industrial</option>
              <option value="comercial">Comercial</option>
              <option value="servicos">Serviços</option>
              <option value="hospitalar">Hospitalar</option>
            </select>
          </div>

          <button type="submit">Avançar</button>
        </form>
      </div>

      <div className="faixa-copyright-clara">
        <p>© {new Date().getFullYear()} eco+. Todos os direitos reservados.</p>
      </div>
    </div>
  );
}

export default CadastroGerador;