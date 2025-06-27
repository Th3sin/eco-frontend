import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderDestinador from "../../../components/Header/Destinador/HeaderDestinador";
import Footer from "../../../components/Layout/Footer";
import DownloadApp from "../../../components/Layout/DownloadApp";
import ServicosDestinador from "../../../components/Servicos/ServicosDestinador";
import "../../Home/home.css";

function HomeDestinador() {
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

        // Buscar dados do usuário logado
        const resUsuario = await api.get("/api/v1/usuario/logado");
        const user = resUsuario.data;
        setUsuario(user);

        // Verificar cadastro apenas se for REPRESENTANTEDESTINADORA
        if (user.role === "REPRESENTANTEDESTINADORA") {
          const res = await api.get("/api/v1/usuario/verificar-cadastro-destinadora");
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
      <HeaderDestinador />

      {mostrarAviso && (
        <div className="aviso-cadastro-incompleto" role="alert">
          Complete os dados da sua empresa para acessar todas as funcionalidades.{" "}
          <Link to="/CadastroDestinador" className="link-cadastro">Clique aqui</Link>
        </div>
      )}

      <section className="servicos-usuarios">
        <ServicosDestinador />
      </section>

      <section className="app-download">
        <DownloadApp />
      </section>

      <Footer />
    </div>
  );
}

export default HomeDestinador;
