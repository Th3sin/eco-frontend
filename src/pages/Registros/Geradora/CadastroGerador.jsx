import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { tipoResiduo } from '../../../data/materiais';
import '../Css/cadastro.css';

function CadastroGerador() {
  // hook do React Router para acessar dados passados pela navegação anterior (ID usuário)
const location = useLocation();

// hook do React Router para redirecionar o usuário para outra rota
const navigate = useNavigate();

// eecupera o ID do usuário passado via navegação (após o registro)
const usuario_id = location.state?.usuario_id;

// estado do componente que armazena os dados preenchidos no formulário
const [formData, setFormData] = useState({

  telefone: '',   
  cnpj: '',             
  ramo: '',                 
  residuoAceito: [],    // Armazena os resíduos aceitos (array, para múltiplos selecionados)

});

// função que lida com alterações nos campos do formulário (exceto checkboxes)
// atualiza o estado formData conforme o usuário digita/seleciona
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev, [name]: value,
  }));
};

// função que lida com alterações nos checkboxes de resíduos aceitos
// adiciona ou remove o item do array `residuoAceito` conforme o checkbox é marcado ou desmarcado
const handleCheckboxChange = (e, tipo) => {
  const updated = e.target.checked
    ? [...formData.residuoAceito, tipo]                             // marcado, adiciona ao array
    : formData.residuoAceito.filter(item => item !== tipo);        // desmarcado, remove do array

  setFormData(prev => ({
    ...prev,
    residuoAceito: updated,
  }));

};

// envia os dados preenchidos para o backend via requisição POST
const handleSubmit = async (e) => {
  e.preventDefault();  // Impede o comportamento padrão de recarregar a página

  // verifica se o ID do usuário está presente 
  if (!usuario_id) {
    alert("Usuário não identificado.");
    navigate("/Registro"); // redireciona para tela inicial se o ID não existir
    return;
  }

  try {

    // faz a requisição para o backend enviando os dados do formulário
    const response = await axios.post("http://localhost:8080/api/v1/usuario/gerador", {
      usuarioId: usuario_id,   // Envia ID do usuário associado
      ...formData              // Envia dados do formulário
    }, 
    {
      headers: {
        "Content-Type": "application/json", // tipo de conteúdo como JSON
      },
    });

    // exibe uma mensagem de sucesso e redireciona para a próxima etapa (cadastro de endereço)
    alert("Cadastro de gerador realizado com sucesso.");
    console.log("Resposta do servidor:", response.data);
    navigate("/EnderecoGerador", { state: { usuarioId: usuario_id } });

  } catch (error) 
  {
    // caso ocorra um erro na requisição exibe um alert e o erro no console
    alert("Erro ao cadastrar dados do gerador.");
    console.error("Erro ao enviar dados:", error.response ? error.response.data : error.message);
  }
};

  return (
    <div className='container-formulario'>
      <form onSubmit={handleSubmit}>
        <h2>Complete suas informações</h2>

        <div className="campo">
          <label htmlFor="tel">Telefone:</label>
          <InputMask mask="(99) 99999-9999" id="tel" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Digite seu telefone"
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
            required >
            <option value="">Selecione o ramo de atividade</option>
            <option value="industrial">Industrial</option>
            <option value="comercial">Comercial</option>
            <option value="servicos">Serviços</option>
          </select>
        </div>

        <div className="campo">
          <label>Resíduo Gerado:</label>
          <div className="checkbox-group">

          {/* chama todos os tipos de resíduos definidos em tipoResiduo */}
            {tipoResiduo.map((tipo, idx) => (

              <label key={idx}>
                <input type="checkbox" name="residuoAceito" value={tipo} //valor do checkbox (tipo de resíduo)
                checked={formData.residuoAceito.includes(tipo)} onChange={(e) => handleCheckboxChange(e, tipo)}
                />
                {tipo} {/* nome do resíduo exibido ao lado do checkbox */}
              </label> 
            ))}

          </div>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CadastroGerador;