import React from 'react';
import './sobre.css';
import Footer from '../../components/Layout/Footer';

const Sobre = () => {
  return (
    <div className='pagina-sobre'>
    <div className="saiba-mais-container">
      <h1 className="titulo-sobre">Saiba Mais</h1>
      <p className="descricao-sobre">
        Nosso sistema foi desenvolvido para facilitar o gerenciamento de resíduos sólidos,
        conectando empresas geradoras a empresas destinadoras especializadas.
      </p>

      <section className="secao-sobre">
        <h2>O que é o sistema?</h2>
        <p>
          É uma plataforma digital que permite o registro, solicitação, acompanhamento e conclusão de coletas de resíduos.
        </p>
      </section>

      <section className="secao-sobre">
        <h2>Quem pode usar?</h2>
        <p>
          Empresas geradoras de resíduos e empresas licenciadas para coleta, transporte e destinação ambientalmente adequada.
        </p>
      </section>

      <section className="secao-sobre">
        <h2>Como funciona?</h2>
        <ol>
          <li>Cadastre sua empresa.</li>
          <li>Registre ou aceite solicitações de coleta.</li>
          <li>Acompanhe o status em tempo real.</li>
          <li>Receba comprovantes e mantenha o histórico atualizado.</li>
        </ol>
      </section>

      <footer className="rodape-sobre">
        <p>Entre em contato conosco para mais informações.</p>
      </footer>
    </div>
    <Footer />
    </div>
  );
};

export default Sobre;