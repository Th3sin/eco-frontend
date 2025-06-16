import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { tipoResiduo } from "../../../data/materiais";
import "../Css/cadastro.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MinimalistHeader from "../../../components/Header/HeaderMinimalist";

function CadastroGerador() {
  const location = useLocation();
  const navigate = useNavigate();

  const [representanteColetora, setRepresentanteColetora] = useState({
    geradora: null,
  });

  const [formData, setFormData] = useState({
    telefone: "",
    nome: "",
    cnpj: "",
    ramo: "",
    residuoGerado: "",
  });

  const handleResiduoChange = (e) => {
    setFormData({
      ...formData,
      residuoGerado: e.target.value,
    });
  };

  useEffect(() => {
    try {
      const email = localStorage.getItem("email");
      axios
        .get(`http://localhost:8080/api/v1/usuario?email=${email}`)
        .then((response) => {
          localStorage.setItem("usuario_id", response.data.id);
          setRepresentanteColetora(response.data);
          console.log("Usuário Id:", response.data.id);
        });
    } catch (error) {
      console.error(error);
      alert("Erro em buscar o usuario");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cnpj = formData.cnpj;
    const busca = await axios.get(
      `http://localhost:8080/api/v1/usuario/geradora/buscar-cnpj?cnpj=${cnpj}`
    );
    if (busca.data.length > 0) {
      alert("CNPJ já cadastrado.");
      return;
    }

    try {
      const geradoraResponse = await axios.post(
        "http://localhost:8080/api/v1/usuario/geradora",
        {
          telefone: formData.telefone,
          nome: formData.nome,
          cnpj: formData.cnpj,
          ramo: formData.ramo,
          residuoGerado: formData.residuoGerado,
        }
      );

      representanteColetora.geradora = geradoraResponse.data;

      await axios.put(
        `http://localhost:8080/api/v1/usuario/representante-coletora/${representanteColetora.id}`,
        representanteColetora
      );

      alert("Dados do Gerador cadastrados com sucesso!");
      const geradoraId = geradoraResponse.data.id;

      navigate("/EnderecoGerador", { state: { geradoraId } });
    } catch (error) {
      console.error("Erro ao cadastrar gerador:", error);
      alert("Erro ao cadastrar os dados. Tente novamente.");
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
            <InputMask mask="(99) 99999-9999" id="tel" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Digite seu Telefone"
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" placeholder="Digite o nome da empresa" value={formData.nome} onChange={handleChange}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="cnpj">CNPJ:</label>
            <InputMask mask="99.999.999/9999-99" id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} placeholder="Digite o CNPJ"
              required
            />
          </div>

          <div className="campo">
          <label htmlFor="ramo">Área de Atuação:</label>
          <select name="ramo" id="ramo" value={formData.ramo} onChange={handleChange}
            required
          >
            <option value="">Selecione o ramo de atividade</option>
            <option value="industrial">Industrial</option>
            <option value="comercial">Comercial</option>
            <option value="servicos">Serviços</option>
          </select>
          </div>
    
          <div className="campo">
            <label>Resíduo Gerado:</label>
            <div className="checkbox-group">
              {tipoResiduo.map((tipo, idx) => (
                <label key={idx}>
                  <input type="radio" name="residuoGerado" value={tipo} checked={formData.residuoGerado === tipo} onChange={handleResiduoChange}
                    required
                  />
                  {tipo}
                </label>
              ))}
            </div>
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
