import React from "react";
import "./Css/manualEmpresas.css";

function ManualDestinador() {
  return (
    <main className="manual-container">
      <h1>Manual do Usuário</h1>
      <h2>Empresas Destinadoras de Resíduos</h2>

      <section>
        <h3>1. Introdução</h3>
        <p>
          Este manual foi elaborado para orientar empresas destinadoras no uso da plataforma
          web e do aplicativo móvel. Aqui você encontrará instruções para receber, aceitar,
          monitorar e concluir solicitações de coletas de resíduos geradas por outras empresas.
        </p>
      </section>

      <section>
        <h3>2. Cadastro e Acesso</h3>
        <ol>
          <li>Crie seu cadastro com CNPJ, dados da empresa e áreas de atuação.</li>
          <li>Informe os resíduos que sua empresa está habilitada a coletar.</li>
          <li>Acesse o sistema regularmente para acompanhar novas solicitações.</li>
        </ol>
      </section>

      <section>
        <h3>3. Funcionalidades</h3>
        <ul>
          <li>Visualizar lista de solicitações de coleta pendentes.</li>
          <li>Aceitar coletas e planejar rotas via mapa interativo.</li>
          <li>Atualizar status da solicitação (aceita, em andamento, finalizada).</li>
          <li>Registrar observações e feedbacks da coleta.</li>
          <li>Emitir relatórios e consultar histórico.</li>
        </ul>
      </section>

      <section>
        <h3>4. Como Gerenciar uma Coleta</h3>
        <ol>
          <li>Acesse <strong>"Solicitações de Coleta"</strong>.</li>
          <li>Selecione uma solicitação e clique em <strong>"Aceitar"</strong>.</li>
          <li>Visualize no mapa o local da coleta e planeje o deslocamento.</li>
          <li>Após a coleta, marque como <strong>"Finalizada"</strong> e envie um resumo.</li>
        </ol>
      </section>

      <section>
        <h3>5. Recomendações</h3>
        <ul>
          <li>Utilize o mapa com filtros para facilitar o planejamento das rotas.</li>
          <li>Verifique os dados do resíduo antes da coleta para segurança e conformidade.</li>
          <li>Mantenha comunicação com a empresa geradora, se necessário.</li>
        </ul>
      </section>

      <section>
        <h3>6. Suporte</h3>
        <p>
          Para qualquer dúvida ou suporte técnico, entre em contato:
          <br />
          📧 suporte@seusistema.com
          <br />
          📞 (XX) XXXX-XXXX
        </p>
      </section>
    </main>
  );
}
export default ManualDestinador;