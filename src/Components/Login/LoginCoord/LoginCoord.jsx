import { FaUser, FaLock, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Themes/themesLogin.css';

const LoginCoordenador = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Login Coordenador: ' + username + ' - ' + password);
    navigate('/HomeCoordenacao');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <FaTimes className="close-icon" onClick={handleGoHome} />
        <div className="logo-container">
          <img src="/img/logo.png" alt="Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1 className="login-title">LOGIN DO COORDENADOR</h1>
          <div className="input-field">
            <input
              type="email"
              placeholder="Digite seu Email"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className="input-icon" />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="input-icon" />
          </div>
          <div className="recall-forget">
            <label className="checkbox-label">
              <input className="checkbox" type="checkbox" />
              <p className="remember">Lembre-se de mim</p>
            </label>
            <a href="#" className="forgot">Esqueci minha senha</a>
          </div>
          <button type="submit" className="login-button">LOGIN</button>
          <button
            type="button"
            className="home-button"
            onClick={handleGoHome}
          >
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCoordenador;
