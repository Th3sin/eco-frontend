import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import "../Css/cadastro.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MinimalistHeader from "../../../components/Header/HeaderMinimalist";

function CadastroDestinador() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [todosResiduos, setTodosResiduos] = useState([]);

  const [formData, setFormData] = useState({
    telefone: "",
    nome: "",
    cnpj: "",
    residuoAceito: [],
  });

  // 🔹 Buscar usuário logado
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token não encontrado");

        const response = await axios.get(
          "http://localhost:8080/api/v1/usuario/logado",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUsuario(response.data);
        console.log("Usuário logado:", response.data);
      } catch (error) {
        console.error("Erro ao buscar o usuário logado:", error);
      }
    };

    fetchUsuario();
  }, []);

  // 🔹 Buscar lista de resíduos
  useEffect(() => {
    const fetchResiduos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token não encontrado");

        const response = await axios.get(
          "http://localhost:8080/api/v1/residuo",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTodosResiduos(response.data);
      } catch (error) {
        console.error("Erro ao buscar resíduos:", error);
        alert("Erro ao buscar lista de resíduos.");
      }
    };

    fetchResiduos();
  }, []);

  // 🔸 Manipulação dos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResiduoChange = (e) => {
    const valueId = Number(e.target.value);
    const { checked } = e.target;

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        residuoAceito: [...prev.residuoAceito, valueId],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        residuoAceito: prev.residuoAceito.filter((id) => id !== valueId),
      }));
    }
  };

  // 🔸 Submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario) {
      alert("Usuário não carregado. Aguarde e tente novamente.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Sessão expirada. Faça login novamente.");
      navigate("/login");
      return;
    }

    const cnpjLimpo = formData.cnpj.replace(/\D/g, "");

    try {
      // 🔸 Verificar se CNPJ já está cadastrado
      const busca = await axios.get(
        `http://localhost:8080/api/v1/destinadora/buscar/cnpj?cnpj=${cnpjLimpo}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (busca.data.length > 0) {
        alert("CNPJ já cadastrado.");
        return;
      }

      // 🔸 Payload para cadastro da destinadora
      const payload = {
        telefone: formData.telefone,
        nome: formData.nome,
        cnpj: cnpjLimpo,
      };

      const destinadoraResponse = await axios.post(
        "http://localhost:8080/api/v1/usuario/destinadora",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const destinadoraId = destinadoraResponse.data.id;

      // 🔸 Cadastrar resíduos aceitos
      const promises = formData.residuoAceito.map((residuoId) =>
        axios.post(
          "http://localhost:8080/api/v1/destinadora/residuo_destinadora",
          {
            destinadora: { id: destinadoraId },
            residuo: { id: residuoId },
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      );
      await Promise.all(promises);

      alert("Empresa Destinadora cadastrada com sucesso!");

      navigate("/EnderecoDestinador", { state: { destinadoraId } });
    } catch (error) {
      console.error("Erro ao cadastrar destinadora:", error);
      const msg =
        error.response?.data?.mensagemErro ||
        error.response?.data?.message ||
        error.message ||
        "Erro ao cadastrar. Tente novamente.";
      alert(msg);
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
            <label htmlFor="telefone">Telefone:</label>
            <InputMask
              mask="(99) 99999-9999"
              id="telefone"
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
              id="cnpj"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              placeholder="Digite o CNPJ"
              required
            />
          </div>
          <div className="campo">
            <label>Resíduos Aceitos:</label>
            {todosResiduos.length === 0 ? (
              <p>Carregando resíduos...</p>
            ) : (
              <div className="checkbox-group">
                {todosResiduos.map((residuo) => (
                  <label key={residuo.id}>
                    <input
                      type="checkbox"
                      name="residuoAceito"
                      value={residuo.id}
                      checked={formData.residuoAceito.includes(residuo.id)}
                      onChange={handleResiduoChange}
                    />
                   {residuo.grupo} 
                  </label>
                ))}
              </div>
            )}
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

export default CadastroDestinador;
