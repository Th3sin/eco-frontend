import React, { useState, useEffect } from 'react';
import HeaderGerador from "../../../components/Header/Gerador/HeaderGerador";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../../components/Layout/Footer";
import ecoTitulo from "../../../img/ecotitulo.png";
import ColetaForm from "../../Coleta/ColetaForm";
import DownloadApp from "../../../components/Layout/DownloadApp";
import ODSSection from "../../../components/Visual/ODSsection";
import "../../Home/home.css"

function HomeGerador() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkCadastro = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const api = axios.create({
          headers: { Authorization: `Bearer ${token}` },
        });

        const res = await api.get("/api/v1/usuario/verificar-cadastro-geradora");
        setMostrarAviso(!res.data);
      } catch (err) {
        console.error("Erro ao verificar cadastro:", err);
      }
    };
    checkCadastro();
  }, []);

  return (
    <div className="container-home">
      <HeaderGerador />

      {mostrarAviso && (
        <div className="aviso-cadastro-incompleto" role="alert">
          Por favor, complete os dados da sua empresa para continuar. <Link to="/CadastroGerador" className="link-cadastro">Clique aqui</Link>
        </div>
      )}

      <nav className="navegacao-usuario">
        <Link to="/solicitar-coleta">Solicitar Coleta</Link>
        <Link to="/historico-coletas">Histórico de Coletas</Link>
        <Link to="/configuracoes">Configurações</Link>
        <Link to="/manual-gerador">Manual do Gerador</Link>
        <Link to="/logout">Sair</Link>
      </nav>

      <section className="secao-formulario">
        <ColetaForm />
      </section>

      <section className="secao-ods">
        <ODSSection />
      </section>

      <section className="app-download">
        <DownloadApp />
      </section>

      <Footer />
    </div>
  );
}

export default HomeGerador;