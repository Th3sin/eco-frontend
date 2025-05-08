import React, { useState } from 'react';
import '../Css/cadastro.css';

const CadastroDestinador = () => {
  
  return (
    <div className='container-formulario'>
      <h2>Informações</h2>
      <form>

        <div className="campo">
          <label>Nome da Empresa</label>
          <input type="text" name="nome" placeholder="Digite o nome da empresa" required />
        </div>

        <div className="campo">
          <label>CNPJ</label>
          <input type="text" name="cnpj" placeholder="Digite o CNPJ da empresa" required />
        </div>

        <div className="campo">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder='Digite o e-mail' required />
        </div>

        <div className="campo">
          <label>Senha</label>
          <input type="password" name="senha" placeholder="Digite a senha" />
        </div>

        <div className="campo">
          <label htmlFor="classeResiduo">Resíduo Aceito</label>
          <select id="classeResiduo" name="classeResiduo">
            <option value="">Selecione</option>
            <option value="perigosos">Perigosos</option>
            <option value="não perigosos">Não Perigosos</option>
          </select>
        </div>

        {/* <h3>Endereço</h3> */}

        <button type="submit">Cadastrar Destinador</button>
      </form>
    </div>
  );
};

export default CadastroDestinador;