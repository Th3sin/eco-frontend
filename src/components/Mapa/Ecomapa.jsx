import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import axios from "axios";
import HeaderGerador from "../Header/Gerador/HeaderGerador";
import "./buscaMapa.css";

const Ecomapa = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cep: "",
    distancia: "3",
    classe: "",
    residuoId: "",
  });

  const [tipoUsuario, setTipoUsuario] = useState("");
  const [todosResiduos, setTodosResiduos] = useState([]);
  const [destinadoras, setDestinadoras] = useState([]);
  const [loadingDest, setLoadingDest] = useState(false);
  const [residuosPorDest, setResiduosPorDest] = useState({});

  // Recupera tipo do usuário e controla acesso
  // useEffect(() => {
  //   const tipo = localStorage.getItem("tipoUsuario");
  //   console.log("tipoUsuario do localStorage:", tipo);

  //   if (!tipo) {
  //     console.log("Tipo de usuário não encontrado. Redirecionando para /login");
  //     navigate("/login");
  //     return;
  //   }

  //   setTipoUsuario(tipo);

  //   if (tipo !== "REPRESENTANTECOLETORA") {
  //     console.log("Usuário não é REPRESENTANTECOLETORA. Redirecionando para /Home");
  //     navigate("/Home");
  //   } else {
  //     console.log("Usuário REPRESENTANTECOLETORA, acesso liberado.");
  //   }
  // }, [navigate]);

  // Carrega resíduos
  useEffect(() => {
    const fetchResiduos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token não encontrado.");

        const response = await axios.get("http://localhost:8080/api/v1/residuo", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTodosResiduos(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar resíduos:", error);
        alert("Erro ao buscar lista de resíduos.");
      }
    };

    fetchResiduos();
  }, []);

  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: apiKey });
  const mapContainerStyle = { width: "100%", height: "500px" };
  const defaultCenter = { lat: -23.5123429, lng: -46.889781 };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    if (!formData.classe || !formData.residuoId) {
      alert("Por favor, selecione a Classe e o Resíduo.");
      return;
    }

    try {
      setLoadingDest(true);
      setDestinadoras([]);
      setResiduosPorDest({});

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Usuário não autenticado. Faça login novamente.");
        setLoadingDest(false);
        return;
      }

      const response = await axios.get("http://localhost:8080/api/v1/destinadora/buscar", {
        params: {
          classe: formData.classe,
          residuoId: formData.residuoId,
        },
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data || [];
      setDestinadoras(data);

      const residuosMap = {};
      await Promise.all(
        data.map(async (dest) => {
          try {
            const res = await axios.get(
              `http://localhost:8080/api/v1/destinadora/${dest.id}/residuos`,
              {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            residuosMap[dest.id] = res.data || [];
          } catch (err) {
            console.error(`Erro ao buscar resíduos da destinadora ${dest.id}:`, err);
            residuosMap[dest.id] = [];
          }
        })
      );

      setResiduosPorDest(residuosMap);
    } catch (error) {
      console.error("Erro ao buscar destinadoras:", error);
      alert("Erro ao buscar destinadoras.");
    } finally {
      setLoadingDest(false);
    }
  };

  return (
    <div className="container-mapa">
      <HeaderGerador />
      <div className="busca-section">
        <div className="form-area">
          <h2 className="section-title">Buscar Destinadoras</h2>
          <p className="section-description">
            Preencha os dados abaixo para localizar empresas destinadoras de resíduos.
          </p>

          <div className="form-fields">
            <div className="form-group">
              <label>CEP</label>
              <InputMask
                mask="99999-999"
                value={formData.cep}
                onChange={handleChange}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="text"
                    name="cep"
                    placeholder="_____-___"
                    className="input-text"
                  />
                )}
              </InputMask>
            </div>

            <div className="form-group">
              <label>Distância</label>
              <select name="distancia" value={formData.distancia} onChange={handleChange}>
                {[3, 7, 10, 15, 20, 25, 30].map((dist) => (
                  <option key={dist} value={dist}>
                    {dist} km
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Classe</label>
              <select name="classe" value={formData.classe} onChange={handleChange}>
                <option value="" disabled>
                  Selecione a classe
                </option>
                <option value="PERIGOSO">Classe I (Perigoso)</option>
                <option value="NAO_PERIGOSO">Classe II (Não Perigoso)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Resíduo</label>
              <select name="residuoId" value={formData.residuoId} onChange={handleChange}>
                <option value="" disabled>
                  Selecione o resíduo
                </option>
                {todosResiduos.map((residuo) => (
                  <option key={residuo.id} value={residuo.id}>
                    {residuo.descricao || residuo.nome || `Resíduo ${residuo.id}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            className="search-button"
            onClick={handleSearch}
            disabled={loadingDest}
            type="button"
          >
            {loadingDest ? "Buscando..." : "Buscar"}
          </button>
        </div>

        <div className="map-area">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={defaultCenter}
              zoom={10}
            />
          ) : (
            <div>Carregando Mapa...</div>
          )}
        </div>
      </div>

      <div className="result-section">
        <h3 className="result-title">Destinadoras Encontradas</h3>

        {loadingDest ? (
          <p>Carregando destinadoras...</p>
        ) : destinadoras.length > 0 ? (
          <div className="card-list">
            {destinadoras.map((dest) => (
              <div key={dest.id} className="card-result">
                <div className="card-header">
                  <h4>{dest.nome}</h4>
                  <span className="status-dot" />
                </div>
                <p><strong>Telefone:</strong> {dest.telefone || "N/A"}</p>
                <p><strong>Endereço:</strong> {dest.logradouro}, {dest.numero} - {dest.bairro}, {dest.cidade}</p>

                <p><strong>Resíduos aceitos:</strong></p>
                {dest.residuosAceitos && dest.residuosAceitos.length > 0 ? (
                  <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                    {dest.residuosAceitos.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Nenhum resíduo listado</p>
                )}

                
                  <button
  className="btn-coleta"
  onClick={() =>
    navigate(
      `/FormularioColeta?destinadoraId=${dest.id}&residuoId=${formData.residuoId}`
    )
  }
>
  Fazer Pedido
</button>

                
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma destinadora encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default Ecomapa;
