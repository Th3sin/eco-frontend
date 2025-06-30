import React, { useState, useEffect } from 'react';
import HeaderGerador from "../../../components/Header/Gerador/HeaderGerador";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../../components/Layout/Footer";
import "../../Css/homeClientes.css"

function HomeGerador() {

  const [usuario, setUsuario] = useState(null);
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [cadastroCompleto, setCadastroCompleto] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkCadastro = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const api = axios.create({
          headers: { Authorization: `Bearer ${token}` },
        });

        const resUsuario = await api.get("/api/v1/usuario/logado");
        const user = resUsuario.data;
        setUsuario(user);

        if (user.role === "REPRESENTANTECOLETORA") {
          const res = await api.get("/api/v1/usuario/verificar-cadastro-geradora");
          setCadastroCompleto(res.data);
          setMostrarAviso(!res.data); // true = mostrar aviso
          console.log("Cadastro completo?", res.data);
          console.log("Mostrar aviso?", !res.data);

        }
      } catch (err) {
        console.error("Erro ao verificar cadastro:", err);
      }
    };

    checkCadastro();
  }, []);

  const bloquearSeIncompleto = (callback) => {
    if (!cadastroCompleto) {
      alert("Complete os dados da sua empresa para acessar esta funcionalidade.");
    } else {
      callback();
    }
  };

  return (

    <div className="container-home-clientes">

      <HeaderGerador /> 
      {mostrarAviso && (
        <div className="aviso-cadastro-incompleto" role="alert">
         Por favor, complete os dados da sua empresa para continuar.{" "}
         <Link to="/CadastroGerador" className="link-cadastro">Clique aqui</Link>
        </div> )}

      {/* SERVIÇOS DO GERADOR */}
      <section className="servicos-entity" id="servicos-entity">
        <div className="servicos-entity__cards">
          <div className="servicos-entity__card">
            <h4>Busca por Empresas Destinadoras</h4>
            <p>Localize rapidamente empresas certificadas para tratamento e destinação de resíduos.</p>
            <div
              className="servicos-entity__link"
              onClick={() => bloquearSeIncompleto(() => navigate("/Ecomapa"))}
            >Acessar mapa →</div>
          </div>

          <div className="servicos-entity__card">
            <h4>Manual de Solicitação de Coleta</h4>
            <p>Guia rápido e prático para solicitar a coleta de resíduos com segurança.</p>
            <div
              className="servicos-entity__link"
              onClick={() => bloquearSeIncompleto(() => navigate("/ManualGerador"))}
            >Acessar manual →</div>
          </div>
  
          <div className="servicos-entity__card">
            <h4>Transporte de Resíduos Perigosos</h4>
            <p>Encontre empresas licenciadas para transportar resíduos Classe I (perigosos).</p>
            <div
              className="servicos-entity__link"
              onClick={() => bloquearSeIncompleto(() => navigate("/Aviso"))}
            >Saiba mais →</div>
          </div>
        </div>
      </section>

      <section className='dashboard-gerador'>
        <div className='card-dashboard'>
          <h3>Coletas realizadas</h3>
          <p>0</p>
        </div>
        <div className='card-dashboard'>
          <h3>Última coleta</h3>
          <p>-</p>
        </div>
        <div className='card-dashboard'>
          <h3>Resíduos enviados</h3>
          <p>0 kg</p>
        </div>
        <div className='card-dashboard'>
          <h3>Impacto ambiental</h3>
          <p>🌱 +0.0 pontos</p>
        </div>
      </section>

      <section className='atalhos-gerador'>
        <button className='botao-atalho' onClick={() => bloquearSeIncompleto(() => navigate("/NovaSolicitacao"))}>Nova Solicitação</button>
        <button className='botao-atalho' onClick={() => bloquearSeIncompleto(() => navigate("/HistoricoColetas"))}>Histórico de Coletas</button>
        <button className='botao-atalho' onClick={() => bloquearSeIncompleto(() => navigate("/ConfigGerador"))}>Editar Perfil</button>
      </section>


      <section className='manual-rapido'>
        <h3>Manual Rápido</h3>
        <p>
          Veja como usar o sistema em poucos passos. Ideal para novos usuários ou para revisão rápida.
        </p>
        <a className='link-manual' href='/Aviso'>Acessar Manual</a>
      </section>

      <Footer />
    </div>
  );
}

export default HomeGerador;
