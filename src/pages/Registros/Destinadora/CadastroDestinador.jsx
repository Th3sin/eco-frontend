import React, { useState } from 'react';
import InputMask from 'react-input-mask'; // npm install react-input-mask
import axios from 'axios'; 
import '../Css/cadastro.css';

const CadastroDestinador = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    email: '',
    senha: '',
    residuoAceito: '',
    confirmarSenha: '', 
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se as senhas coincidem
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      // Envia os dados para o backend
      const response = await axios.post("http://localhost:5000/api", {
        nome: formData.nome,
        cnpj: formData.cnpj,
        email: formData.email,
        senha: formData.senha,
        residuoAceito: formData.residuoAceito,
      });

      alert("Destinadora cadastrada com sucesso!");
      console.log("Destinadora cadastrada com sucesso:", response.data);

      // Limpar o formulário após sucesso
      setFormData({
        nome: '',
        cnpj: '',
        email: '',
        senha: '',
        residuoAceito: '',
        confirmarSenha: '', 
      });
      
    } catch (error) {
      alert("Erro ao cadastrar destinadora. Verifique todos os campos!");
      console.log("Erro ao cadastrar destinadora:", error);
    }
};


  return (
    <div className='container-formulario'>
      <form onSubmit={handleSubmit}>

        <div className="campo">
          <label htmlFor="cnpj">CNPJ:</label>
          <InputMask mask="99.999.999/9999-99" id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} placeholder="Digite o CNPJ" required />
        </div>

         <div className="campo">
          <label htmlFor="tel"> Telefone: </label>
          <InputMask mask="(99) 99999-9999" id="tel" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Digite seu Telefone" required />
        </div>

        <div className="campo">
          <label htmlFor="classeResiduo">Resíduo Aceito</label>
          <select id="residuoAceito" name="residuoAceito" value={formData.residuoAceito} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="perigosos">Perigosos</option>
            <option value="não perigosos">Não Perigosos</option>
          </select>
        </div>

        <button type="submit">Cadastrar Destinador</button>
      </form>
    </div>
  );
};

export default CadastroDestinador;