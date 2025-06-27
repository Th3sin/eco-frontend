import React, { useState, useEffect } from 'react';
import HeaderGerador from "../../../components/Header/Gerador/HeaderGerador";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../../components/Layout/Footer";
import ColetaForm from "../../Coleta/ColetaForm";
import DownloadApp from "../../../components/Layout/DownloadApp";
import ServicosGerador from '../../../components/Servicos/ServicosGerador';
import "../../Home/home.css";

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

        // Primeiro, buscar o usuário logado
        const resUsuario = await api.get("/api/v1/usuario/logado");
        const user = resUsuario.data;
        setUsuario(user);

        // Verificar cadastro se for REPRESENTANTECOLETORA
        if (user.role === "REPRESENTANTECOLETORA") {
          const res = await api.get("/api/v1/usuario/verificar-cadastro-geradora");
          setMostrarAviso(!res.data); // true = mostrar aviso
        }
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
          Por favor, complete os dados da sua empresa para continuar.{" "}
          <Link to="/CadastroGerador" className="link-cadastro">Clique aqui</Link>
        </div>
      )}

      <section className="servicos-usuarios">
        <ServicosGerador />
      </section>

      <section className="secao-formulario">
        <ColetaForm />
      </section>

      <section className="app-download">
        <DownloadApp />
      </section>

      <Footer />
    </div>
  );
}

export default HomeGerador;
