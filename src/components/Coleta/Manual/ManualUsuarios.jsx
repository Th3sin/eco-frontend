import React from "react";
import "./manualUsuarios.css";
import Footer from "../../Layout/Footer";

function ManualUsuarios() {
  return (
    <>
      <div className="manual-wrapper">
        {/* Banner lateral com links de navegação */}
        <div className="banner-lateral">
          <h1 className="banner-titulo">Instruções de Uso do Sistema de Coleta de Resíduos</h1>
          <div className="banner-card">
            <div className="card-conteudo">
              <h2>O que você encontra aqui?</h2>
              <ul>
                <li><a href="#sobre-sistema">O que é o sistema?</a></li>
                <li><a href="#quem-pode">Quem pode utilizar?</a></li>
                <li><a href="#glossario">Glossário do Sistema</a></li>
                <li><a href="#servicos">Quais são os serviços?</a></li>
                <li><a href="#como-funciona">Como funciona?</a></li>
                <li><a href="#manual-geradores">Manual para Geradores</a></li>
                <li><a href="#manual-destinadores">Manual para Destinadores</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <main className="manual-container">
          <section id="sobre-sistema">
            <h2>Sistema Web e Mobile para Gerenciamento de Resíduos Sólidos</h2>
            <p>
              Seja bem-vindo(a) ao manual do usuário do nosso sistema de
              gerenciamento de resíduos sólidos! Este manual foi criado para ajudar
              você a entender o que o sistema faz, como usá-lo e
              como aproveitar ao máximo suas funcionalidades, seja na plataforma
              web ou no aplicativo móvel.
            </p>
            <p>
              Nosso objetivo é facilitar o descarte correto dos resíduos, 
              conectando geradoras de resíduos a empresas especializadas (destinadoras),
              para que possam contribuir com a sustentabilidade e cumprir as
              normas ambientais vigentes.
            </p>
          </section>

          <section id="quem-pode">
            <h2>Quem pode utilizar?</h2>
            <p>Este sistema é destinado a empresas geradoras de resíduos sólidos e empresas destinadoras especializadas que querem facilitar a gestão dos resíduos.</p>
          </section>

          <section id="glossario">
            <h2>Glossário do Sistema</h2>
            <p>Para facilitar a compreensão dos termos usados no sistema, veja abaixo o significado dos principais conceitos:</p>
            <dl>
              <dt><strong>Resíduo Sólido</strong></dt>
              <dd>Material ou objeto descartado que pode ser reciclado, reutilizado ou descartado de forma adequada.</dd>

              <dt><strong>Empresa Geradora</strong></dt>
              <dd>Empresa que produz resíduos sólidos e necessita de serviços de coleta e destinação.</dd>

              <dt><strong>Empresa Destinadora</strong></dt>
              <dd>Empresa especializada em receber, reciclar ou dar destinação correta aos resíduos sólidos.</dd>

              <dt><strong>Coleta</strong></dt>
              <dd>Serviço de recolhimento dos resíduos gerados pela empresa para transporte até a destinadora.</dd>

              <dt><strong>Solicitação</strong></dt>
              <dd>Pedido formal realizado no sistema para agendar coleta ou destinação de resíduos.</dd>

              <dt><strong>Status</strong></dt>
              <dd>Estado atual da solicitação ou processo, como Pendente, Aceito, Em Andamento ou Concluído.</dd>

              <dt><strong>Mapa Interativo</strong></dt>
              <dd>Ferramenta visual que permite localizar empresas destinadoras e traçar rotas para coleta.</dd>
            </dl>
          </section>

          <section id="servicos">
            <h2>Quais são os serviços?</h2>
            <p>
              Nosso sistema conecta empresas que geram resíduos às empresas que podem recebê-los para reciclagem ou descarte correto.
            </p>
            <ul>
              <li>Solicitação de coleta de resíduos</li>
              <li>Acompanhamento do status das solicitações</li>
              <li>Consulta a pontos de coleta próximos via mapa interativo</li>
              <li>Relatórios e histórico das coletas realizadas</li>
            </ul>
          </section>

          <section id="como-funciona">
            <h2>Como funciona?</h2>
            <p>
              Para usar o sistema, cadastre sua empresa, faça login e acesse as funcionalidades conforme seu perfil. Empresas geradoras solicitam coletas e destinadoras aceitam os pedidos para realizar o serviço.
            </p>
          </section>

          <section id="manual-geradores">
            <h2>Manual para Geradores</h2>
            <p>
              Aqui você aprende como cadastrar resíduos, solicitar coletas, acompanhar pedidos e atualizar seus dados no sistema.
            </p>
          </section>

          <section id="manual-destinadores">
            <h2>Manual para Destinadores</h2>
            <p>
              Instruções para empresas destinadoras gerenciarem solicitações, confirmarem coletas, registrar dados e emitir relatórios.
            </p>
          </section>
        </main>
      </div>

      <section>
        <Footer />
      </section>
        
    </>
  );
}

export default ManualUsuarios;