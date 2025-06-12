import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { tipoResiduo } from '../../../data/materiais';
import '../Css/cadastro.css';

function CadastroDestinador() {
  // hook do React Router para acessar dados passados pela navegação anterior (ID usuário)
  const location = useLocation();
  // hook do React Router para redirecionar o usuário para outra rota
  const navigate = useNavigate();
  // eecupera o ID do usuário passado via navegação (após o registro)
  const usuario_id = location.state?.usuario_id;

  const [formData, setFormData] = useState({
    telefone: '',
    cnpj: '',
    residuoAceito: [],

  });

  // Adicionando a função handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev, [name]: value
    }));
  };

  const handleCheckboxChange = (e, tipo) => {
    const updatedResiduos = e.target.checked
      ? [...formData.residuoAceito, tipo]                     // marcado, adiciona ao array o residuo selecionado
      : formData.residuoAceito.filter(item => item !== tipo); // desmarcado, remove do array o residuo selecionado

    setFormData(prev => ({
      ...prev,
      residuoAceito: updatedResiduos
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

// verifica se o ID do usuário está presente 
    if (!usuario_id) {
      alert("Usuário não identificado. Volte ao registro.");
      navigate("/Registro"); // redireciona para tela inicial se o ID não existir
      return;
    }

    try {
      // faz a requisição para o backend enviando os dados do formulário
      const response = await axios.post("http://localhost:8080/api/v1/usuario/destinador", 
      {
        usuarioId: usuario_id,
        ...formData
      }, 
      {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Cadastro de destinador realizado com sucesso.");
      console.log("Resposta do servidor:", response.data);
      navigate("/EnderecoDestinador", { state: { usuarioId: usuario_id } });

    } catch (error) {
      alert("Erro ao cadastrar dados do destinador.");
      console.error("Erro ao enviar dados:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='container-formulario'>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="cnpj">CNPJ:</label>
          <InputMask mask="99.999.999/9999-99" id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} placeholder="Digite o CNPJ"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="tel">Telefone:</label>
          <InputMask mask="(99) 99999-9999" id="tel" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Digite seu Telefone"
            required
          />
        </div>

        <div className="campo">
          <label>Resíduo Aceito:</label>
          <div className="checkbox-group">
            {tipoResiduo.map((tipo, idx) => (

              <label key={idx}>
                <input type="checkbox" name="residuoAceito" value={tipo} checked={formData.residuoAceito.includes(tipo)} onChange={(e) => handleCheckboxChange(e, tipo)} />
                {tipo}
              </label> 
            ))}

          </div>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CadastroDestinador;