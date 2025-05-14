import { useState } from 'react';
import InputMask from 'react-input-mask'; // npm install react-input-mask
import axios from 'axios'; 
import '../Css/cadastro.css'; 

function CadastroGerador() {
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', cnpj: '', razaoSocial: '', ramo: '', cargo: '', residuoGerado: '', senha: '', confirmarSenha: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // enviar os dados para o backend
    console.log(formData);
  };

  return (
    <div className='container-formulario'>
      <h2>Preencha todos os campos</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="campo">
          <label htmlFor="nome"> Nome: </label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Digite o seu nome" required />
        </div>

        <div className="campo">
          <label htmlFor="email"> Email: </label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Digite o seu e-mail corporativo" required />
        </div>
        
        <div className="campo">
          <label htmlFor="tel"> Telefone: </label>
          <InputMask mask="(99) 99999-9999" id="tel" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Digite seu Telefone" required />
        </div>

        <div className="campo">
          <label htmlFor="cnpj">CNPJ:</label>
          <InputMask mask="99.999.999/9999-99" id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} placeholder="Digite o CNPJ" required />
        </div>
        
        <div className="campo">
          <label htmlFor="razaosocial"> Razão Social: </label>
          <input type="text" id="razaosocial" name="razaoSocial" value={formData.razaoSocial} onChange={handleChange} placeholder="Informe a Razão Social" required />
        </div>
        
        <div className="campo">
          <select name="ramo" value={formData.ramo} onChange={handleChange} required>
            <option value=""> Selecione o ramo de atividade </option>
            <option value="industrial">Industrial</option>
            <option value="comercial">Comercial</option>
            <option value="servicos">Serviços</option>
          </select>
        </div>

        <div className="campo">
          <select name="cargo" value={formData.cargo} onChange={handleChange} required>
            <option value="">Selecione o cargo </option>
            <option value="ceo">CEO</option>
            <option value="presidente">Presidente</option>
            <option value="proprietario">Proprietário</option>
            <option value="representante_ambiental">Representante Ambiental</option>
          </select>
        </div>
       
        <div className="campo">
          <label htmlFor="residuoGerado">Resíduo Gerado:</label>
          <input type="text" id="residuoGerado" name="residuoGerado" value={formData.residuoGerado} onChange={handleChange} placeholder="Tipo de Resíduo Gerado" required />
        </div>
        
        <div className="campo">
          <label htmlFor="senha">Digite sua senha: </label>
          <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} placeholder="Senha" required />
        </div>
        
        <div className="campo">
          <label>Confirme a senha:</label>
          <input type="password" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} placeholder="Confirmar Senha" required />
        </div>

        <button type="submit">
          Cadastrar Gerador
        </button>
      </form>
    </div>
  );
}

export default CadastroGerador;