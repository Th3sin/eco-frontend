import React, { useState } from 'react';
import styles from "./cadastroEmpresa.module.css";
import InformacoesPessoais from '../../../components/Formularios/Informacoes';
import Endereco from '../../../components/Formularios/Endereco';

const CadastroEmpresa = () => {
const [formData, setFormData] = useState({ nome: "", cnpj: "", email: "", telefone: "", senha: "", confirmarSenha: "", ramo: "", tipoEmpresa: "",

  endereco: { cep: "", logradouro: "", bairro: "", cidade: "", estado: "",
}
});

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Dados enviados:", formData);
};

  return (
    <div className={styles.formularioEmpresa}>
      <h2>Informações</h2>
      <form onSubmit={handleSubmit}>

        <Informacoes
          formData={formData}
          handleInputChange={handleInputChange} />

        <Endereco
          formData={formData}
          handleInputChange={handleInputChange} />

        <div>
          <button type="submit">Cadastrar</button>
        </div>

      </form>
    </div>
  );
};

export default CadastroEmpresa;