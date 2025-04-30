import React, { useState } from 'react';
import styles from '../Destinadora/empresaDestinadora.module.css'
// import InformacoesPessoais from '../../../components/Formularios/InformacoesPessoais';
// import Endereco from '../../../components/Formularios/Endereco';

const EmpresaDestinadoraCadastro = () => {
  
  return (
    <div className={styles.formularioColetora}>
      <h2>Informações</h2>
      <form>

        <div className={styles.camposColetora}>
          <label>Nome da Empresa</label>
          <input type="text" name="nome" placeholder="Digite o nome da empresa" required />
        </div>

        <div className={styles.camposColetora}>
          <label>CNPJ</label>
          <input type="text" name="cnpj" placeholder="Digite o CNPJ da empresa" required />
        </div>

        <div className={styles.camposColetora}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder='Digite o e-mail' required />
        </div>

        <div className={styles.camposColetora}>
          <label>Senha</label>
          <input type="password" name="senha" placeholder="Digite a senha" />
        </div>

        <div className={styles.camposColetora}>
          <label>Resíduo Aceito</label>
          <select name="classeResiduo">
            <option value="">Selecione</option>
            <option value="perigosos">Perigosos</option>
            <option value="não perigosos">Não Perigosos</option>
          </select>
        </div>

        <h3>Endereço</h3>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default EmpresaDestinadoraCadastro;