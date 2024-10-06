import { FaUser, FaLock, FaTimes } from 'react-icons/fa'; // Importando FaTimes para o ícone de X
import { useState } from 'react';
import './LoginAluno.css';

const LoginAluno = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleGoHome = () => {
    window.location.href = '/';  
  };

  const handleLogin = () => {
    window.location.href = '/HomeAluno';  
  };

  return (
    <div className="Container">
      <div id="LoginBox">
        {/* Ícone X no canto superior direito */}
        <FaTimes className="closeIcon" onClick={handleGoHome} />

        <div id="LogoAluno">
          <img src="/img/logo.png" alt="Logo" />
        </div>

        <form>
          <h1 id="MedioTec">LOGIN DO ALUNO</h1>

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

          {/* Transformar o botão de login em um link para outra aba */}
          <button type="button" id="button" onClick={handleLogin}>
            LOGIN
          </button>

          {/* Botão para voltar à Home */}
          <button type="button" id="homeButton" onClick={handleGoHome}>
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAluno;
