import { FaUser, FaLock, FaTimes } from 'react-icons/fa'; // Importando FaTimes para o ícone de X
import { useState } from 'react';
import './LoginProf.css';

const LoginProf = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para autenticar professores
    alert("Login Professor: " + username + " - " + password);
  };

  const handleGoHome = () => {
    // Lógica para redirecionar para a página inicial
    window.location.href = '/';  // Redireciona para a página inicial
  };

  return (
    <div className="Container">
      <div id="LoginBox">
        {/* Ícone X no canto superior direito */}
        <FaTimes className="closeIcon" onClick={handleGoHome} />

        <div id="LogoProf">
          <img src="/img/logo.png" alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1 id="MedioTec">LOGIN DO PROFESSOR</h1>

          <div className="input-field">
            <input
              type="email"
              placeholder="Digite seu Email"
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="icon" />
          </div>

          <div className="input-field">
            <input
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
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

          <button id="button">LOGIN</button>

          {/* Botão para voltar à Home */}
          <button type="button" id="homeButton" onClick={handleGoHome}>
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginProf;