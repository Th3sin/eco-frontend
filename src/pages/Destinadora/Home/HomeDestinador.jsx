import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderDestinador from "../../../components/Header/Destinador/HeaderDestinador";
import Footer from "../../../components/Layout/Footer";
import "../../Css/homeClientes.css"

function HomeDestinador() {
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

        if (user.role === "REPRESENTANTEDESTINADORA") {
          const res = await api.get("/api/v1/usuario/verificar-cadastro-destinadora");
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
      <HeaderDestinador />

      {mostrarAviso && (
        <div className="aviso-cadastro-incompleto" role="alert">
          Por favor, complete os dados da sua empresa para continuar.{" "}
          <Link to="/CadastroDestinador" className="link-cadastro">Clique aqui</Link>
        </div>
      )}

      <section className="servicos-entity" id="servicos-entity">
        <div className="servicos-entity__cards">
          <div className="servicos-entity__card">
            <h4>Acompanhar Coletas</h4>
            <p>Veja as coletas aceitas por sua empresa e acompanhe o andamento.</p>
            <div
              className="servicos-entity__link"
              onClick={() => bloquearSeIncompleto(() => navigate("/PainelColeta"))}
            >Acessar →</div>
          </div>

          <div className="servicos-entity__card">
            <h4>Pedidos Recebidos</h4>
            <p>Gerencie os pedidos de coleta recebidos de empresas geradoras.</p>
            <div
              className="servicos-entity__link"
              onClick={() => bloquearSeIncompleto(() => navigate("/PedidosRecebidos"))}
            >Ver pedidos →</div>
          </div>

          <div className="servicos-entity__card">
            <h4>Relatórios e Certificações</h4>
            <p>Gere comprovantes e relatórios ambientais das coletas realizadas.</p>
            <div
              className="servicos-entity__link"
              onClick={() => bloquearSeIncompleto(() => navigate("/relatorios"))}
            >Emitir relatórios →</div>
          </div>
        </div>
      </section>

      <section className='resumo-operacoes'>
        <div className='item-operacao'>
          <h3>Solicitações disponíveis</h3>
          <p>0</p>
        </div>

        <div className='item-operacao'>
          <h3>Coletas em andamento</h3>
          <p>0</p>
        </div>

        <div className='item-operacao'>
          <h3>Resíduos recebidos</h3>
          <p>0kg</p>
        </div>

        <div className='item-operacao'>
          <h3>Empresas atendidas</h3>
          <p>0</p>
        </div>
      </section>
          
      <section className='conteudo-regulatorio'>
        <h3>Novas normas de transporte de resíduos perigosos</h3>
        <p>
          Informe-se sobre as últimas mudanças nas regulamentações para o transporte seguro de resíduos perigosos. 
          Acompanhe as exigências legais atualizadas.
        </p>
        <a href='#' className='link-regulatorio'>Leia mais</a>
      </section>
          
      <section className='gerenciar-residuos-aceitos'>
        <h3>Gerenciar Resíduos Aceitos</h3>
        <p>
          Atualize os tipos de resíduos que sua empresa aceita receber para coleta e tratamento.
        </p>
        <button className='btn-editar-residuos' onClick={() => bloquearSeIncompleto(() => navigate("/EditarResiduos"))}>
          Editar
        </button>
      </section>

      <Footer />
    </div>
  );
}

export default HomeDestinador;
