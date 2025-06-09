import React from "react";
import "./Css/manualEmpresas.css"

function ManualGerador() {
  return (
    <main className="manual-container">
      <h1>Manual do Usuário</h1>
      <h2>Empresas Geradoras de Resíduos</h2>

      <section>
        <h3>1. Introdução</h3>
        <p>
          Este manual foi desenvolvido para ajudar empresas geradoras a utilizar o sistema
          de gerenciamento de resíduos sólidos, seja na versão web ou móvel. Nosso objetivo é
          facilitar o processo de descarte responsável, conectando você a empresas destinadoras
          qualificadas.
        </p>
      </section>

      <section>
        <h3>2. Primeiros Passos</h3>
        <ol>
          <li>Acesse a plataforma web ou baixe o aplicativo móvel.</li>
          <li>Crie sua conta preenchendo os dados da empresa.</li>
          <li>Faça login e complete o cadastro com o endereço, CNPJ, tipo de resíduo etc.</li>
        </ol>
      </section>

      <section>
        <h3>3. Funcionalidades Principais</h3>
        <ul>
          <li>Buscar empresas destinadoras no mapa por tipo de resíduo e localização.</li>
          <li>Solicitar coletas diretamente pelo aplicativo móvel.</li>
          <li>Acompanhar o status das coletas em tempo real.</li>
          <li>Visualizar histórico e relatórios de descarte.</li>
          <li>Receber notificações sobre movimentações das coletas.</li>
        </ul>
      </section>

      <section>
        <h3>4. Como Solicitar uma Coleta</h3>
        <ol>
          <li>No app, vá em <strong>"Solicitar Coleta"</strong>.</li>
          <li>Preencha os dados do resíduo e do local de coleta.</li>
          <li>Confirme o envio.</li>
          <li>Acompanhe pela aba <strong>"Monitoramento"</strong>.</li>
        </ol>
      </section>

      <section>
        <h3>5. Dicas e Boas Práticas</h3>
        <ul>
          <li>Classifique corretamente o resíduo (ex: perigoso, não inerte).</li>
          <li>Informe sempre a quantidade estimada com precisão.</li>
          <li>Mantenha o cadastro atualizado para evitar falhas na coleta.</li>
        </ul>
      </section>

      <section>
        <h3>6. Suporte</h3>
        <p>
          Dúvidas? Acesse a área de <strong>Ajuda</strong> ou entre em contato via:
          <br />
          📧 suporte@seusistema.com
          <br />
          📞 (XX) XXXX-XXXX
        </p>
      </section>
    </main>
  );
}
 
export default ManualGerador;