import React from 'react';
import { useState } from 'react';
import { useFormAction } from 'react-router-dom';

const Informacoes = ({ formData, handleInputChange }) => {
  return (
    <>
      <div>
        <label htmlFor="nome">Nome da Empresa:</label>
        <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleInputChange} required placeholder="Digite o nome da empresa" />
      </div>

      <div>
        <label htmlFor="cnpj">CNPJ:</label>
        <input type="text" id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleInputChange} required placeholder="Digite o CNPJ da empresa" />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Digite o e-mail" />
      </div>

      <div>
        <label htmlFor="telefone">Telefone:</label>
        <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleInputChange} required placeholder="Digite o telefone" />
      </div>

      <div>
        <label htmlFor="senha">Senha:</label>
        <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleInputChange} required placeholder="Digite uma senha" />
      </div>

      <div>
        <label htmlFor="confirmarSenha">Confirmar Senha:</label>
        <input type="password" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleInputChange} required placeholder="Confirme sua senha" />
      </div>

      <div>
        <label htmlFor="ramo">Ramo:</label>
        
        <select id="ramo" name="ramo" value={formData.ramo} onChange={handleInputChange}>
          <option value="">Selecione</option>
          <option value="comercial">Comercial</option>
          <option value="industrial">Industrial</option>
          <option value="serviços">Serviços</option>
        </select>
      </div>

    </>
  );
};

export default Informacoes;