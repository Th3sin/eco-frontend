import { Link } from 'react-router-dom';
import "./servicos.css"; // CSS exclusivo desta seção

const ServicosGerador = () => {
  return (
    <section className="servicos-entity" id="servicos-entity">
      <h3 className="servicos-entity__titulo">Funcionalidades</h3>

      <div className="servicos-entity__cards">
        <div className="servicos-entity__card">
          <h4>Busca por Empresas Destinadoras</h4>
          <p>Localize rapidamente empresas certificadas para tratamento e destinação de resíduos.</p>
          <Link to="/Ecomapa" className="servicos-entity__link">Acessar mapa →</Link>
        </div>

        <div className="servicos-entity__card">
          <h4>Manual de Solicitação de Coleta</h4>
          <p>Guia rápido e prático para solicitar a coleta de resíduos com segurança.</p>
          <Link to="/manual-entity" className="servicos-entity__link">Acessar manual →</Link>
        </div>

        <div className="servicos-entity__card">
          <h4>Ferramenta de Classificação de Resíduos</h4>
          <p>Classifique corretamente seus resíduos conforme a NBR 10004.</p>
          <Link to="/classificacao" className="servicos-entity__link">Usar ferramenta →</Link>
        </div>

        <div className="servicos-entity__card">
          <h4>Transporte de Resíduos Perigosos</h4>
          <p>Encontre empresas licenciadas para transportar resíduos Classe I (perigosos).</p>
          <Link to="/residuos" className="servicos-entity__link">Saiba mais →</Link>
        </div>
      </div>
    </section>
  );
};

export default ServicosGerador;
