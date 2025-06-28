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
  const [cadastroCompleto, setCadastroCompleto] = useState(true);
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const checkCadastro = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("Token não encontrado.");
                setCadastroCompleto(true);
                return;
            }

            const api = axios.create({
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const resUsuario = await api.get("/api/v1/usuario/logado");
            const usuario = resUsuario.data;
            setUsuario(usuario);
            setRole(usuario.role);

            let url = null;
            if (usuario.role === "REPRESENTANTECOLETORA") {
                url = "/api/v1/usuario/verificar-cadastro-geradora";
            } else if (usuario.role === "REPRESENTANTEDESTINADORA") {
                url = "/api/v1/usuario/verificar-cadastro-destinadora";
            } else {
                console.log("Role desconhecida:", usuario.role);
                return;
            }

            

            const res = await api.get(url);
            setCadastroCompleto(res.data);

            if (res.data) {
                setMostrarAviso(false); 
            } else {
                setMostrarAviso(true); 
            }
        } catch (err) {
            console.error("Erro ao buscar usuário ou verificar cadastro:", err);
        }
    };

    useEffect(() => {
        checkCadastro();
    }, []);

    const fecharAviso = () => {
        setMostrarAviso(false);
    };

    const rotaCadastro = () => {
        if (role === "REPRESENTANTECOLETORA") return "/CadastroGerador";
        if (role === "REPRESENTANTEDESTINADORA") return "/CadastroDestinador";
        return "/";
    };
    
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
