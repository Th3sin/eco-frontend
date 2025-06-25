import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import axios from 'axios';
import './coletaForm.css';

function ColetaForm() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ nome: '', email: '', telefone: '' });
  const [residuoSelecionado, setResiduoSelecionado] = useState('');

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/v1/usuario/logado", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario({
          nome: response.data.nome || '',
          email: response.data.email || '',
          telefone: response.data.telefone || '',
        });
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        alert("Erro ao buscar informações do usuário logado.");
      }
    };

    fetchUsuario();
  }, []);

  const handleSubmit = () => {
    if (!residuoSelecionado) {
      alert("Selecione um resíduo antes de enviar.");
      return;
    }
    // Passa o resíduo como parâmetro para o mapa
    navigate(`/Ecomapa?residuo=${encodeURIComponent(residuoSelecionado)}`);
  };

  return (
    <div className="informacoes-formulario">
      <div className="area-centralizada">
        <section className="formulario-coleta">
          <form>
            <div className="resumo-coleta-form-group">
              <label>Gerador(a)</label>
              <input type="text" name="nome" value={usuario.nome} readOnly />
            </div>

            <div className="resumo-coleta-form-group">
              <label>E-mail</label>
              <input type="email" name="email" value={usuario.email} readOnly />
            </div>

            <div className="resumo-coleta-form-group">
              <label>Telefone</label>
              <InputMask
                mask="(99) 99999-9999"
                value={usuario.telefone}
                readOnly
              >
                {(inputProps) => <input {...inputProps} type="tel" />}
              </InputMask>
            </div>

            <div className="resumo-coleta-form-group">
              <label htmlFor="nomeResiduo">Resíduo</label>
              <select
                name="nomeResiduo"
                id="nomeResiduo"
                value={residuoSelecionado}
                onChange={(e) => setResiduoSelecionado(e.target.value)}
              >
                <option value="">Selecione</option>
                <option>Orgânico</option>
                <option>Eletrônico</option>
                <option>Hospitalar</option>
                <option>Entulhos</option>
                <option>Têxteis</option>
                <option>Perfurocortante</option>
                <option>Químico</option>
                <option>Radioativo</option>
                <option>Plástico</option>
                <option>Vidro</option>
                <option>Metais</option>
                <option>Papel</option>
                <option>Agroindustrial</option>
                <option>Inerte</option>
                <option>Tóxico</option>
                <option>Inflamável</option>
                <option>Vegetal</option>
                <option>Pilhas e Baterias</option>
                <option>Medicamentos</option>
                <option>Madeira</option>
                <option>Borracha</option>
                <option>Alumínio</option>
                <option>Isopor</option>
                <option>Óleos</option>
                <option>Resíduos de Construção Civil</option>
                <option>Perigosos</option>
                <option>Recicláveis</option>
              </select>
            </div>

            <div className="resumo-botoes-solicitacao">
              <button type="button" onClick={handleSubmit}>Enviar pedido</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default ColetaForm;
