import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import InputMask from "react-input-mask";
import axios from "axios";
import "./buscaMapa.css";
import { tipoResiduo } from "../../data/materiais";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

const Ecomapa = () => {
  const [formData, setFormData] = useState({
    cep: "",
    distancia: "3",
    classe: "",
    grupo: "",
  });

  const [destinadoras, setDestinadoras] = useState([]);
  const [loadingDest, setLoadingDest] = useState(false);

  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: apiKey });
  const mapContainerStyle = { width: "100%", height: "500px" };
  const defaultCenter = { lat: -23.5123429, lng: -46.889781 };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    if (!formData.classe || !formData.grupo) {
      alert("Por favor, selecione classe e grupo do resíduo.");
      return;
    }

    try {
      setLoadingDest(true);
      setDestinadoras([]);

      // URL corrigida para o endpoint correto do backend
      const response = await axios.get(
        "http://localhost:8080/api/v1/destinadora/buscar",
        {
          params: {
            classe: formData.classe,
            grupo: formData.grupo,
          },
          headers: { Accept: "application/json" },
        }
      );

      setDestinadoras(response.data);
    } catch (error) {
      console.error("Erro ao buscar destinadoras:", error);
      setDestinadoras([]);
    } finally {
      setLoadingDest(false);
    }
  };

  return (
    <div className="container">
      <div className="busca-section">
        <div className="form-area">
          <h2 className="section-title">Buscar Destinadoras</h2>
          <p className="section-description">
            Selecione a classe e o grupo (tipo) do resíduo para localizar destinadoras.
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
              <select
                name="distancia"
                value={formData.distancia}
                onChange={handleChange}
              >
                {[3, 7, 10, 15, 20, 25, 30].map((dist) => (
                  <option key={dist} value={dist}>
                    {dist} km
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Classe</label>
              <select
                name="classe"
                value={formData.classe}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Selecione a classe
                </option>
                <option value="perigoso">Classe I (Perigoso)</option>
                <option value="não-perigoso">Classe II (Não Perigoso)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Grupo / Tipo de Resíduo</label>
              <select
                name="grupo"
                value={formData.grupo}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Selecione o grupo do resíduo
                </option>
                {tipoResiduo.map((res, idx) => (
                  <option key={idx} value={res}>
                    {res}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="search-button" onClick={handleSearch}>
            Buscar
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
        ) : destinadoras.length ? (
          <div className="card-list">
            {destinadoras.map((dest, index) => (
              <div key={index} className="card">
                <div className="card-header">
                  <h4>{dest.nome}</h4>
                  <span className="status-dot" />
                </div>
                <p>Telefone: {dest.telefone}</p>
                <p>E-mail: {dest.email}</p>
                <p>
                  Resíduo aceito:{" "}
                  {dest.grupo && dest.classe ? `${dest.grupo} - ${dest.classe}` : "N/A"}
                </p>
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
