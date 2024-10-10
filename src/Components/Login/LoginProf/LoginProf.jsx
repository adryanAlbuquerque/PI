import { FaUser, FaLock, FaTimes } from 'react-icons/fa'; // Importando FaTimes para o ícone de X
import { useState } from 'react';
import './LoginProf.css';

const LoginProf = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para autenticar professores
    alert('Login Professor: ' + username + ' - ' + password);
  };

  const handleGoHome = () => {
    // Lógica para redirecionar para a página inicial
    window.location.href = '/'; // Redireciona para a página inicial
  };

  return (
    <div className="loginPROF-container">
      <div className="login-box">
        {/* Ícone X no canto superior direito */}
        <FaTimes className="profclose-icon" onClick={handleGoHome} />

        <div className="logo-container">
          <img src="/img/logo.png" alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1 className="login-title">LOGIN DO PROFESSOR</h1>

          <div className="input-field">
            <input
              type="email"
              placeholder="Digite seu Email"
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="input-icon" />
          </div>

          <div className="input-field">
            <input
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="input-icon" />
          </div>

          <div className="remember-forget">
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox-input" />
              <p className="remember-text">Lembre-se de mim</p>
            </label>
            <a href="#" className="forget-password-link">
              Esqueci minha senha
            </a>
          </div>

          <button
            className="login-button"
            onClick={() => (window.location.href = '/HomeProf')}
          >
            LOGIN
          </button>

          {/* Botão para voltar à Home */}
          <button type="button" className="home-button" onClick={handleGoHome}>
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginProf;
