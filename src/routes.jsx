import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from './components/Header/Header'; 
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Ecomapa from './components/Mapa/Ecomapa';
import Registro from './pages/Registros/Registro';
import Perfil from "./pages/Registros/Perfil";
import CadastroDestinador from './pages/Registros/Destinadora/CadastroDestinador';
import CadastroGerador from './pages/Registros/Geradora/CadastroGerador';
import Endereco from "./components/Formularios/Endereco";
import Infectante from "./pages/Descarte/Grupos/Infectante";
import Quimico from "./pages/Descarte/Grupos/Quimico";
import Radioativo from "./pages/Descarte/Grupos/Radioativo";
import Perfurocortante from "./pages/Descarte/Grupos/Perfurocortante";
import Comum from "./pages/Descarte/Grupos/Comum";
import Informativo from "./pages/Descarte/Informativo";
import HistoricoSolicitacoes from "./pages/Coleta/Historico/HistoricoSolicitacoes";
import ColetaForm from "./pages/Coleta/Pedidos/ColetaForm";
import SolicitarColeta from "./components/Coleta/Solicitacao/SolicitarColeta";
import PainelColeta from "./pages/Coleta/Painel/PainelColeta";
import CadastroResiduo from "./pages/Registros/Material/CadastroResiduo"
import AcompanhamentoColetas from "./pages/Coleta/Painel/AcompanhamentoColetas";
import Instrucoes from "./components/Coleta/Manual/Instrucoes";

function Layout() {
    const location = useLocation();
    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {
        const noHeaderRoutes = [
            "/Login",
            "/Registro",
            "/Perfil",
            "/CadastroDestinador",
            "/CadastroGerador",
            "/CadastroResiduo"
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
                    <Route path="/ColetaForm" element={<ColetaForm />} />
                    <Route path="/HistoricoSolicitacoes" element={<HistoricoSolicitacoes />} />
                    <Route path="/SolicitarColeta" element={<SolicitarColeta />} />
                    <Route path="/PainelColeta" element={<PainelColeta />} />
                    <Route path="/AcompanhamentoColetas" element={<AcompanhamentoColetas />} />
                    <Route path="/Instrucoes" element={<Instrucoes />} />

                    {/* Páginas sem Header */}
                    <Route path="/Registro" element={<Registro />} />
                    <Route path="/Perfil" element={<Perfil />} />
                    <Route path="/CadastroDestinador" element={<CadastroDestinador />} />
                    <Route path="/CadastroGerador" element={<CadastroGerador />} />
                    <Route path="/Endereco" element={<Endereco />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/CadastroResiduo" element={<CadastroResiduo />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;