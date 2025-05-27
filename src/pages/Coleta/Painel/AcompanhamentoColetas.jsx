import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'; //npm install @react-google-maps/api
import './acompColeta.css'

const containerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = {
  lat: -23.55052,
  lng: -46.633308,
};

const mockColetas = [
  {
    id: 1,
    empresa: "Destinadora A",
    status: "Em andamento",
    position: { lat: -23.551, lng: -46.634 },
    endereco: "Rua Exemplo, 123",
    dataColeta: "2025-05-27 10:00",
    tipoResiduo: "Plástico",
    quantidade: "150 kg",
  },
  {
    id: 2,
    empresa: "Destinadora B",
    status: "Pendente",
    position: { lat: -23.549, lng: -46.631 },
    endereco: "Av. Teste, 456",
    dataColeta: "2025-05-28 14:30",
    tipoResiduo: "Metal",
    quantidade: "75 kg",
  }
];

function AcompanhamentoColetas() {
  const [coletas, setColetas] = useState([]);
  const [selectedColeta, setSelectedColeta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setColetas(mockColetas);
      setLoading(false);
    }, 1000); // simula 1s de delay
  }, []);

  const atualizarStatus = (id) => {
    setColetas((prev) =>
      prev.map((coleta) =>
        coleta.id === id
          ? { ...coleta, status: coleta.status === "Pendente" ? "Em andamento" : "Concluído" }
          : coleta
      )
    );
    setSelectedColeta(null); 
  };

  if (loading) return <p>Carregando coletas...</p>;

  return (
    <div className='pagina-acompanhamento-coletas'>
        <h1>Acompanhe o andamento da coleta</h1>
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={14}
      >
        {coletas.map((coleta) => (
          <Marker
            key={coleta.id}
            position={coleta.position}
            onClick={() => setSelectedColeta(coleta)}
            title={`${coleta.empresa} - ${coleta.status}`}
          />
        ))}

        {selectedColeta && (
          <InfoWindow
            position={selectedColeta.position}
            onCloseClick={() => setSelectedColeta(null)}
          >
            <div style={{ maxWidth: 250 }}>
              <h3>{selectedColeta.empresa}</h3>
              <p><b>Status:</b> {selectedColeta.status}</p>
              <p><b>Endereço:</b> {selectedColeta.endereco}</p>
              <p><b>Data/Hora da Coleta:</b> {selectedColeta.dataColeta}</p>
              <p><b>Tipo de Resíduo:</b> {selectedColeta.tipoResiduo}</p>
              <p><b>Quantidade:</b> {selectedColeta.quantidade}</p>
              <button onClick={() => atualizarStatus(selectedColeta.id)} >
                Atualizar Status
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
    </div>
  );
}

export default React.memo(AcompanhamentoColetas);