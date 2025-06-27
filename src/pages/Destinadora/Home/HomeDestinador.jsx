// HomeDestinador.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderDestinador from "../../../components/Header/Destinador/HeaderDestinador";
import Footer from "../../../components/Layout/Footer";
import DownloadApp from "../../../components/Layout/DownloadApp";
import "../../Home/home.css";

function HomeDestinador() {
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkCadastro = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const api = axios.create({
          baseURL: "http://localhost:8080", // ajuste a baseURL conforme necessário
          headers: { Authorization: `Bearer ${token}` },
        });

        const res = await api.get("/api/v1/usuario/verificar-cadastro-destinadora");
        setMostrarAviso(!res.data);
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
        <div className="aviso-cadastro">
          <p>Complete seu cadastro para acessar todas as funcionalidades.</p>
        </div>
      )}

      <section className="app-download">
        <DownloadApp />
      </section>

      <Footer />
    </div>
  );
}

export default HomeDestinador;
