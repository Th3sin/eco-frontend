import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from './components/Header/Header'; 
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import CadastroDestinador from './pages/Registros/Destinadora/CadastroDestinador';
import CadastroGerador from './pages/Registros/Geradora/CadastroGerador';
import Endereco from "./components/Formularios/Endereco";
import HistoricoSolicitacoes from "./pages/Coleta/Historico/HistoricoSolicitacoes";
import ColetaForm from "./pages/Coleta/Pedidos/ColetaForm";
import SolicitarColeta from "./components/Coleta/Solicitacao/SolicitarColeta";
import PainelColeta from "./pages/Coleta/Painel/PainelColeta";
import CadastroResiduo from "./pages/Registros/Material/CadastroResiduo"
import ManualUsuarios from "./components/Coleta/Manual/ManualUsuarios";
import Registro from "./pages/Registros/Registro";
import Ecomapa from "./components/Mapa/Ecomapa";
import ManualDestinador from "./components/Coleta/Manual/ManualEmpresas/ManualDestinador";
import ManualGerador from "./components/Coleta/Manual/ManualEmpresas/ManualGerador";
import Admin from "./pages/Admin/AdminPage";
import Residuos from "./pages/Blog/Conteudos/Residuos";
import Sobre from "./pages/Blog/Sobre";

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
            "/CadastroResiduo",
            "/Admin"
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
                    <Route path="/ColetaForm" element={<ColetaForm />} />
                    <Route path="/HistoricoSolicitacoes" element={<HistoricoSolicitacoes />} />
                    <Route path="/SolicitarColeta" element={<SolicitarColeta />} />
                    <Route path="/PainelColeta" element={<PainelColeta />} />
                    <Route path="/ManualUsuarios" element={<ManualUsuarios />} />
                    <Route path="/ManualGerador" element={<ManualGerador />} />
                    <Route path="/ManualDestinador" element={<ManualDestinador />} />
                    <Route path="/Residuos" element={<Residuos />} />
                    <Route path="/Sobre" element={<Sobre />} />

                    {/* Páginas sem Header */}
                    <Route path="/Registro" element={<Registro />} />
                    <Route path="/CadastroDestinador" element={<CadastroDestinador />} />
                    <Route path="/CadastroGerador" element={<CadastroGerador />} />
                    <Route path="/Endereco" element={<Endereco />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/CadastroResiduo" element={<CadastroResiduo />} />
                    <Route path="/Admin" element={<Admin />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;