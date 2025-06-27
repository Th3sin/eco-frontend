import { Link } from 'react-router-dom';
import "./servicos.css"; 

const ServicosDestinador = () => {
  return (
    <section className="servicos-entity" id="servicos-entity">
      <h3 className="servicos-entity__titulo">Funcionalidades</h3>

      <div className="servicos-entity__cards">
        <div className="servicos-entity__card">
          <h4>Acompanhar Coletas</h4>
          <p>Veja as coletas aceitas por sua empresa e acompanhe o andamento.</p>
          <Link to="/PainelColeta" className="servicos-entity__link">Acessar →</Link>
        </div>

        <div className="servicos-entity__card">
          <h4>Pedidos Recebidos</h4>
          <p>Gerencie os pedidos de coleta recebidos de empresas geradoras.</p>
          <Link to="/PedidosRecebidos" className="servicos-entity__link">Ver pedidos →</Link>
        </div>

        <div className="servicos-entity__card">
          <h4>Relatórios e Certificações</h4>
          <p>Gere comprovantes e relatórios ambientais das coletas realizadas.</p>
          <Link to="/relatorios" className="servicos-entity__link">Emitir relatórios →</Link>
        </div>
      </div>
    </section>
  );
};

export default ServicosDestinador;
