// Importando hooks do React e bibliotecas necessárias
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { tipoResiduo } from '../../../data/materiais';
import '../Css/cadastro.css';

function CadastroGerador() {
  // useLocation é usado para acessar dados passados pela navegação anterior
  const location = useLocation();
  const navigate = useNavigate();

  // Pegando o ID do usuário que foi cadastrado anteriormente
  const usuario_id = location.state?.usuario_id;

  // Estado local para armazenar os dados do formulário
  const [formData, setFormData] = useState({

    telefone: '',
    cnpj: '',
    ramo: '',
    residuoGerado: '',

  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // função chamada ao submeter o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // verifica se o usuário está autenticado ou identificado
    if (!usuario_id) {
      alert("Usuário não identificado. Volte ao registro.");
      navigate("/Registro");
      return;
    }

    try {
      // Enviando os dados do gerador para o backend
      const response = await axios.post("http://localhost:8080/api/v1/usuario/gerador", {
        usuarioId: usuario_id, // Enviando o ID do usuário associado ao cadastro
        ...formData
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Exibe mensagem de sucesso e redireciona para cadastro de endereço
      alert("Cadastro de gerador realizado com sucesso!");
      console.log("Resposta do servidor:", response.data);

      // Redireciona para cadastro do endereço do gerador
      navigate("/EnderecoGerador", { state: { usuarioId: usuario_id } });

    } catch (error) {
      //  mensagem no console
      alert("Erro ao cadastrar dados do gerador.");
      console.error("Erro ao enviar dados:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='container-formulario'>
      <form onSubmit={handleSubmit}>
        <h2>Cadastro de Empresa Geradora</h2>

        {/* Campo de telefone com máscara */}
        <div className="campo">
          <label htmlFor="tel">Telefone:</label>
          <InputMask mask="(99) 99999-9999" id="tel" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Digite seu telefone"
          required
          />
        </div>

        {/* Campo de CNPJ com máscara */}
        <div className="campo">
          <label htmlFor="cnpj">CNPJ:</label>
          <InputMask mask="99.999.999/9999-99" id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} placeholder="Digite o CNPJ"
          required
          />
        </div>

        {/* Campo de seleção do ramo de atividade da empresa */}
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
          <label htmlFor="residuoGerado">Resíduo Gerado:</label>
          <select name="residuoGerado" id="residuoGerado" value={formData.residuoGerado} onChange={handleChange} 
          required>
            <option value="">Selecione um tipo</option>
            {tipoResiduo.map((tipo, index) => (
              <option key={index} value={tipo}>
                {tipo}
              </option>

            ))}
          </select>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CadastroGerador;