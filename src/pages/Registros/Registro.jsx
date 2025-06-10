import React, { useState } from "react";
import "./registro.css";
import { Link } from "react-router-dom"; // npm install react-router-dom
import axios from "axios"; // npm install axios
//import { buscarEnderecoPorCEP } from '../../services/viacep.service'; // Importa o serviço API
import InputMask from 'react-input-mask'; // npm install react-input-mask

const Registro = () => {
  const [etapa, setEtapa] = useState(1);
  const [usuarioId, setUsuarioId] = useState(null);

  // Etapa 1 USUARIO
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [perfil, setPerfil] = useState("REPRESENTANTEDESTINADORA");

  // Etapa 2 CAMPOS RESTANTES + ENDERECO
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [numero, setNumero] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/register", {
        nome: nome,
        email: email,
        password: password,
        role: perfil,
      });

      const novoUsuario = response.data;
      setUsuarioId(novoUsuario.id); // salva o id do usuário
      setEtapa(2); // vai para a próxima etapa
    } catch (error) {
      alert("Erro ao cadastrar usuário.");
      console.error(error);
    }
  };

  const handleEmpresaSubmit = async (e) => {
    e.preventDefault();

    const dadosEmpresa = {
      cnpj,
      nome,
      email,
      cep,
      num: numero,
      telefone,
      logradouro,
      bairro,
      cidade,
      uf,
      senha: password,
      id_usuario: usuarioId,
      cod_status: 1,
    };

    const url =
      perfil === "REPRESENTANTEDESTINADORA"
        ? "http://localhost:8080/api/v1/destinadora"
        : "http://localhost:8080/api/v1/geradora";

    try {
      await axios.post(url, dadosEmpresa);
      alert("Cadastro finalizado com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar empresa.");
      console.error(error);
    }
  };

   // 🔽 Busca de endereço por CEP
  useEffect(() => {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        .then((response) => {
          const data = response.data;

          if (!data.erro) {
            setLogradouro(data.logradouro || "");
            setBairro(data.bairro || "");
            setCidade(data.localidade || "");
            setUf(data.uf || "");
          } 
          else 
          {
            alert("CEP não encontrado.");
          }
        })

        .catch((error) => {
          console.error("Erro ao buscar CEP:", error);
          alert("Erro ao buscar endereço. Verifique o CEP.");
        });
    }
  }, [cep]);

  return (
    <div className="registro-container">
      <div className="formulario-cadastro" id="formulario-cadastro">
        <h2>Crie uma conta</h2>

        <form onSubmit={etapa === 1 ? handleSubmit : handleEmpresaSubmit}>
          {etapa === 1 ? (
            <>
              <label htmlFor="nome">Nome</label>
              <input type="text" id="nome" placeholder="Digite o nome da sua empresa" value={nome} onChange={(e) => setNome(e.target.value)}
                required />

              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" placeholder="Digite o seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)}
                required />

              <label htmlFor="perfil">Escolha seu perfil</label>
              <select id="perfil" value={perfil} onChange={(e) => setPerfil(e.target.value)}
                required >

                <option value="REPRESENTANTECOLETORA">Gerador</option>
                <option value="REPRESENTANTEDESTINADORA">Destinador</option>

              </select>

              <label htmlFor="senha">Senha</label>
              <div className="input-container">
                <input id="senha" type={showPassword ? "text" : "password"} placeholder="Crie uma senha" value={password} onChange={(e) => setSenha(e.target.value)}
                  required />

                <i
                  className={`fas fa-eye${showPassword ? "-slash" : ""} eyeIcon`}
                  onClick={togglePasswordVisibility}
                >
                </i>

              </div>

              <label htmlFor="confirmPassword">Confirmar senha</label>
              <div className="input-container">
                <input id="confirmPassword" type={showPassword ? "text" : "password"} placeholder="Confirme a sua senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)}
                  required />

                <i
                  className={`fas fa-eye${showPassword ? "-slash" : ""} eyeIcon`}
                  onClick={togglePasswordVisibility}
                >
                </i>

              </div>

              <div className="form-group">
                <button type="submit">Avançar</button>
              </div>
            </>
          ) : (
            <>
              <h3>Informações da Empresa</h3>

              <label>CNPJ</label>
              <InputMask mask="99.999.999/9999-99" value={cnpj} onChange={(e) => setCnpj(e.target.value)} 
              required >
              {(inputProps) => <input {...inputProps} type="text" placeholder="00.000.000/0000-00" />}
              </InputMask>

              <label>Telefone</label>
              <InputMask mask="(99) 99999-9999" name="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)}    placeholder="(00) 00000-0000" 
              required >
              {(inputProps) => <input {...inputProps} type="tel" />}
              </InputMask>

              <label>CEP</label>
              <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} required />

              <label>Logradouro</label>
              <input type="text" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} readOnly />

              <label>Bairro</label>
              <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} readOnly />

              <label>Cidade</label>
              <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} readOnly />

              <label>UF</label>
              <input type="text" value={uf} onChange={(e) => setUf(e.target.value)} readOnly />

              <label>Número</label>
              <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} required />

              <div className="form-group">
                <button type="submit">Finalizar Cadastro</button>
              </div>
            </>
          )}

          <div className="sign-in-link">
            <p>
              Já possui uma conta? <Link to="/Login">Faça login</Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Registro;
