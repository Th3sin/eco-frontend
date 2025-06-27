import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import HomeGerador from "./pages/Geradora/Home/HomeGerador";
import HomeDestinador from "./pages/Destinadora/Home/HomeDestinador";
import Header from "./components/Header/Header"
import Login from "./pages/Login/Login";
import ColetaForm from "./pages/Coleta/ColetaForm";
import PainelColeta from "./pages/Destinadora/Painel/PainelColeta";
import CadastroResiduo from "./pages/Registros/Material/CadastroResiduo"
import ManualUsuarios from "./components/Coleta/Manual/ManualUsuarios";
import Registro from "./pages/Registros/Registro";
import Ecomapa from "./components/Mapa/Ecomapa";
import ManualDestinador from "./components/Coleta/Manual/ManualEmpresas/ManualDestinador";
import ManualGerador from "./components/Coleta/Manual/ManualEmpresas/ManualGerador";
import Admin from "./pages/Admin/AdminPage";
import Residuos from "./pages/Blog/Conteudos/Residuos";
import Sobre from "./pages/Blog/Sobre";
import EnderecoGerador from "./pages/Registros/Geradora/EnderecoGerador";
import CadastroGerador from "./pages/Registros/Geradora/CadastroGerador";
import EnderecoDestinador from "./pages/Registros/Destinadora/EnderecoDestinador"
import CadastroDestinador from './pages/Registros/Destinadora/CadastroDestinador';
import PedidosRecebidos from "./pages/Destinadora/Pedidos/PedidosRecebidos";
import Configuracoes from "./pages/Configuracoes/Configuracoes";
import HistoricoSolicitacoes from "./pages/Geradora/Painel/HistoricoSolicitacoes";
import FormularioColeta from "./components/Coleta/Solicitacao/FormularioColeta";

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
            "/Admin",
            "/EnderecoGerador",
            "/EnderecoDestinador",
            "/Configuracoes",
            "/FormularioColeta",
           
        ];

        setShowHeader(!noHeaderRoutes.includes(location.pathname));
    }, [location.pathname]);

    return (
        <>
            {showHeader && <Header />} {/* controle renderização do Header */}
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
            
            {/* ROTAS FORA DO LAYOUT - sem Header */}
            <Route path="/" element={<Registro />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Registro" element={<Registro />} />
            <Route path="/CadastroDestinador" element={<CadastroDestinador />} />
            <Route path="/CadastroGerador" element={<CadastroGerador />} />
            <Route path="/CadastroResiduo" element={<CadastroResiduo />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/EnderecoGerador" element={<EnderecoGerador />} />
            <Route path="/EnderecoDestinador" element={<EnderecoDestinador />} />
            <Route path="/Configuracoes" element={<Configuracoes />} />
            <Route path="/FormularioColeta" element={<FormularioColeta />} />

            {/* ROTAS COM LAYOUT (com Header) */}
            <Route element={<Layout />}>
              <Route path="/Home" element={<Home />} />
              <Route path="/HomeGerador" element={<HomeGerador />} />
              <Route path="/HomeDestinador" element={<HomeDestinador />} />
              <Route path="/Ecomapa" element={<Ecomapa />} />
              <Route path="/ColetaForm" element={<ColetaForm />} />
              <Route path="/PainelColeta" element={<PainelColeta />} />
              <Route path="/ManualUsuarios" element={<ManualUsuarios />} />
              <Route path="/ManualGerador" element={<ManualGerador />} />
              <Route path="/ManualDestinador" element={<ManualDestinador />} />
              <Route path="/Residuos" element={<Residuos />} />
              <Route path="/Sobre" element={<Sobre />} />
              <Route path="/PedidosRecebidos" element={<PedidosRecebidos />} />
              <Route path="/HistoricoSolicitacoes" element={<HistoricoSolicitacoes />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;