import { FaUser, FaLock, FaTimes } from 'react-icons/fa'; // Importando FaTimes para o ícone de X
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para redirecionamento
import './LoginCoord.css';

const LoginCoordenador = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializando useNavigate

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para autenticar
    alert('Login Coordenador: ' + username + ' - ' + password);

    // Se a autenticação for bem-sucedida, redireciona
    navigate('/HomeCoordenacao');
  };

  const handleGoHome = () => {
    // Lógica para redirecionar para a página inicial
    navigate('/'); // Usando useNavigate para redirecionar
  };

  return (
    <div className="coord-container">
      <div className="coord-login-box">
        {/* Ícone X no canto superior direito */}
        <FaTimes className="coord-close-icon" onClick={handleGoHome} />

        <div className="coord-logo">
          <img src="/img/logo.png" alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1 className="coord-title">LOGIN DO COORDENADOR</h1>

          <div className="coord-input-field">
            <input
              type="email"
              placeholder="Digite seu Email"
              onChange={(e) => setUsername(e.target.value)}
              required // Adicionando required para validar o campo
            />
            <FaUser className="coord-icon" />
          </div>

          <div className="coord-input-field">
            <input
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
              required // Adicionando required para validar o campo
            />
            <FaLock className="coord-icon" />
          </div>

          <div className="coord-recall-forget">
            <label className="coord-label">
              <input className="coord-checkbox" type="checkbox" />
              <p className="coord-remember">Lembre-se de mim</p>
            </label>
            <a href="#" className="coord-forgot">
              Esqueci minha senha
            </a>
          </div>

          {/* Botão de login */}
          <button type="submit" className="coord-button">
            LOGIN
          </button>

          {/* Botão para voltar à Home */}
          <button
            type="button"
            className="coord-home-button"
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
