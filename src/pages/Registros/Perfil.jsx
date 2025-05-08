import { useNavigate } from "react-router-dom";

export default function EscolhaPerfil() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Escolha seu perfil</h1>
      <div>
        <button
          onClick={() => navigate("/CadastroGerador")}>
          Sou Gerador
        </button>
        
        <button
          onClick={() => navigate("/CadastroDestinador")}>
          Sou Destinador
        </button>
      </div>
    </div>
  );
}