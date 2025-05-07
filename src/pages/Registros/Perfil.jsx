import { useNavigate } from "react-router-dom";

export default function EscolhaPerfil() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Escolha seu perfil</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/cadastro/gerador")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-2xl shadow"
        >
          Sou Gerador
        </button>
        
        <button
          onClick={() => navigate("/cadastro/destinador")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-2xl shadow"
        >
          Sou Destinador
        </button>
      </div>
    </div>
  );
}