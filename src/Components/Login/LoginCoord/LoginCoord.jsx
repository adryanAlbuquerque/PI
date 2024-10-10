import { FaUser, FaLock, FaTimes } from 'react-icons/fa'; // Importando FaTimes para o ícone de X
import { useState } from 'react';
import { Link } from 'react-router-dom'; // Certifique-se de importar Link
import './LoginCoord.css';

const LoginCoordenador = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para autenticar
    alert("Login Professor: " + username + " - " + password);
  };

  const handleGoHome = () => {
    // Lógica para redirecionar para a página inicial
    window.location.href = '/'; // Redireciona para a página inicial
  };

  return (
    <div className="Container">
      <div id="LoginBox">
        {/* Ícone X no canto superior direito */}
        <FaTimes className="closeIcon" onClick={handleGoHome} />

        <div id="LogoCoord">
          <img src="/img/logo.png" alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1 id="MedioTec">LOGIN DO COORDENADOR</h1>

          <div className="input-field">
            <input
              type="email"
              placeholder="Digite seu Email"
              onChange={(e) => setUsername(e.target.value)}
              required // Adicionei required para validar o campo
            />
            <FaUser className="icon" />
          </div>

          <div className="input-field">
            <input
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
              required // Adicionei required para validar o campo
            />
            <FaLock className="icon" />
          </div>

          <div id="recal-forget">
            <label id="label">
              <input id="Checkbox" type="checkbox" />
              <p id="Lembre">Lembre-se de mim</p>
            </label>
            <a href="#" id="Esqueceu">
              Esqueci minha senha
            </a>
          </div>

          {/* Usando Link para redirecionar */}
          <Link to="/HomeCoordenacao">
            <button type="submit" id="button">LOGIN</button>
          </Link>

          {/* Botão para voltar à Home */}
          <button type="button" id="homeButton" onClick={handleGoHome}>
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCoordenador;
