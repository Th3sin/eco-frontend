import React from "react";
import "./instrucoes.css";
import BannerInstrucoes from "./Banner/BannerInstrucoes"

const Instrucoes = () => {
  return (
    <div className="instrucoes-container">
      <BannerInstrucoes />
      <h1 className="instrucoes-title">Instruções de Uso do Sistema de Coleta de Resíduos</h1>

      <section className="instrucoes-section">
        <h2 className="instrucoes-subtitle">1. Cadastro da Empresa Geradora</h2>
        <p>Para começar a usar o sistema, sua empresa precisa estar cadastrada.</p>
        <ul>
          <li>Acesse a opção <strong>“Cadastrar”</strong> no menu inicial;</li>
          <li>Preencha as informações da empresa: razão social, CNPJ, endereço, e-mail e telefone;</li>
          <li>Crie um login com e-mail e senha.</li>
        </ul>
        <p>Após o cadastro, você poderá acessar o painel do sistema.</p>
      </section>

      <section className="instrucoes-section">
        <h2 className="instrucoes-subtitle">2. Solicitar Coleta de Resíduos</h2>
        <p>Com a conta ativa, você poderá registrar pedidos de coleta.</p>
        <ul>
          <li>Acesse a aba <strong>“Solicitar Coleta”</strong>;</li>
          <li>Preencha o formulário com:
            <ul>
              <li>Tipo e quantidade do resíduo;</li>
              <li>Classe do resíduo (ex: Classe I, IIA, IIB);</li>
              <li>Endereço de coleta;</li>
              <li>Observações (se necessário);</li>
            </ul>
          </li>
          <li>Envie o formulário para registro.</li>
        </ul>
      </section>

      <section className="instrucoes-section">
        <h2 className="instrucoes-subtitle">3. Acompanhar Minhas Solicitações</h2>
        <p>Você pode visualizar, editar ou cancelar os pedidos na aba <strong>“Minhas Solicitações”</strong>:</p>
        <ul>
          <li>Cada solicitação mostra o status atual:
            <ul>
              <li><strong>Pendente</strong>: aguardando aceitação de uma empresa destinadora;</li>
              <li><strong>Aceito</strong>: uma empresa destinadora aceitou o pedido;</li>
              <li><strong>Concluído</strong>: o processo de coleta foi finalizado.</li>
            </ul>
          </li>
          <li>Clique em uma solicitação para ver detalhes ou atualizá-la, se ainda estiver pendente.</li>
        </ul>
      </section>

      <section className="instrucoes-section">
        <h2 className="instrucoes-subtitle">4. Destinadora Responsável</h2>
        <p>Quando uma empresa <strong>destinadora</strong> aceitar seu pedido, você poderá ver:</p>
        <ul>
          <li>Nome da empresa;</li>
          <li>Dados de contato;</li>
          <li>Data estimada para a coleta.</li>
        </ul>
      </section>

      <section className="instrucoes-section">
        <h2 className="instrucoes-subtitle">Dicas Importantes</h2>
        <ul>
          <li>Mantenha seus dados atualizados para facilitar o contato.</li>
          <li>Descreva o resíduo com o máximo de clareza para agilizar o processo.</li>
          <li>Acompanhe o status de seus pedidos com frequência.</li>
        </ul>
      </section>
    </div>
  );
};

export default Instrucoes;