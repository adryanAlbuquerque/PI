import { FaUser, FaLock, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para redirecionamento
import '../../Themes/themesLogin.css';

const LoginProf = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializando useNavigate

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para autenticar
    alert('Login Professor: ' + username + ' - ' + password);

    // Se a autenticação for bem-sucedida, redireciona
    navigate('/HomeProf');
  };

  const handleGoHome = () => {
    // Lógica para redirecionar para a página inicial
    navigate('/'); // Usando useNavigate para redirecionar
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Ícone X no canto superior direito */}
        <FaTimes className="close-icon" onClick={handleGoHome} />

        <div className="logo-container">
          <img src=".././img/logo.png" alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1 className="login-title">LOGIN DO PROFESSOR</h1>

          <div className="input-field">
            <input
              type="email"
              placeholder="Digite seu Email"
              onChange={(e) => setUsername(e.target.value)}
              required // Adicionando required para validar o campo
            />
            <FaUser className="input-icon" />
          </div>

          <div className="input-field">
            <input
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
              required // Adicionando required para validar o campo
            />
            <FaLock className="input-icon" />
          </div>

          <div className="recall-forget">
            <label className="checkbox-label">
              <input className="checkbox" type="checkbox" />
              <p className="remember">Lembre-se de mim</p>
            </label>
            <a href="#" className="forgot">
              Esqueci minha senha
            </a>
          </div>

          {/* Botão de login */}
          <button type="submit" className="login-button">
            LOGIN
          </button>

          {/* Botão para voltar à Home */}
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

export default LoginProf;
