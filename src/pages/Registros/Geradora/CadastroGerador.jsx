import { useState } from 'react';
import InputMask from 'react-input-mask'; // npm install react-input-mask
import axios from 'axios'; 
import { tipoResiduo } from '../../../data/materiais';
import '../Css/cadastro.css'; 

function CadastroGerador() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Exemplo com axios
    // axios.post('/api/gerador', formData)
    //   .then(res => console.log(res.data))
    //   .catch(err => console.error(err));
  };

  return (
    <div className='container-formulario'>
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
          </select>
        </div>

        <div className="campo">
          <label htmlFor="residuoGerado">Resíduo Gerado:</label>
          <select
            name="residuoGerado"
            id="residuoGerado"
            value={formData.residuoGerado}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um tipo</option>
            {tipoResiduo.map((tipo, index) => (
              <option key={index} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">
          Cadastrar Gerador
        </button>
      </form>
    </div>
  );
}

export default CadastroGerador;