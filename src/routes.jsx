import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from './components/Header/Header'; 
import Footer from './components/Layout/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Ecomapa from './components/Mapa/Ecomapa';
import Registro from './pages/Registros/Registro';
import EmpresaDestinadoraCadastro from './pages/Registros/Destinadora/EmpresaDestinadoraCadastro';
import CadastroEmpresa from './pages/Registros/Geradora/CadastroEmpresa';
import Endereco from "./components/Formularios/Endereco";
import Infectante from "./pages/Descarte/Grupos/Infectante";
import Quimico from "./pages/Descarte/Grupos/Quimico";
import Radioativo from "./pages/Descarte/Grupos/Radioativo";
import Perfurocortante from "./pages/Descarte/Grupos/Perfurocortante";
import Comum from "./pages/Descarte/Grupos/Comum";
import Informativo from "./pages/Descarte/Informativo";
import NovaSolicitacao from "./pages/Coleta/Pedidos/NovaSolicitacao";
import HistoricoSolicitacoes from "./pages/Coleta/Historico/HistoricoSolicitacoes";
import SlideBannerHome from "./components/Layout/SlideBannerHome";

function Layout() {
    const location = useLocation();
    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {
        const noHeaderRoutes = [
            "/Login",
            "/Registro",
            "/CadastroEmpresaColetora",
            "/CadastroEmpresa",
            "/Background"
        ];

        setShowHeader(!noHeaderRoutes.includes(location.pathname));
    }, [location.pathname]);

    return (
        <>
            {showHeader && <Header />} {/* Aqui estamos controlando a renderização do Header */}
            <main>
                <Outlet /> {/* Exibe o conteúdo da página */}
            </main>
        </>
    );
}

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route element={<Layout />}>
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Ecomapa" element={<Ecomapa />} />
                    <Route path="/informativo" element={<Informativo />} />
                    <Route path="/Quimico" element={<Quimico />} />
                    <Route path="/Infectante" element={<Infectante />} />
                    <Route path="/Radioativo" element={<Radioativo />} />
                    <Route path="/Comum" element={<Comum />} />
                    <Route path="/Perfurocortante" element={<Perfurocortante />} />
                    <Route path="/SlideBannerHome" element={<SlideBannerHome />} />

                    {/* Páginas sem Header */}
                    <Route path="/Registro" element={<Registro />} />
                    <Route path="/CadastroEmpresaColetora" element={<EmpresaDestinadoraCadastro />} />
                    <Route path="/Cadastroempresa" element={<CadastroEmpresa />} />
                    <Route path="/Endereco" element={<Endereco />} />
                    <Route path="/HistoricoSolicitacoes" element={<HistoricoSolicitacoes />} />
                    <Route path="/NovaSolicitacao" element={<NovaSolicitacao />} />
                    <Route path="/Login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;