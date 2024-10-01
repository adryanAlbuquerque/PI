import { FaUser, FaLock, FaTimes, FaEnvelope  } from 'react-icons/fa'; // Importando FaTimes para o ícone de X
import { useState } from 'react';
import './CadastroAluno.css';

const CadastroAluno = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar lógica para autenticar alunos
    alert ("Enviando os dados:" + email + "-" + username + "-" + password);
  };

  const handleGoHome = () => {
    // Lógica para redirecionar para a página inicial
    window.location.href = '/';  // Redireciona para a página inicial
  };

  return (
    <div className="Container">
      <div id="CadAlunoBox">
        {/* Ícone X no canto superior direito */}
        <FaTimes className="closeIcon" onClick={handleGoHome} />

        <div id="LogoCadAluno">
          <img src="/img/logo.png" alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1 id="MedioTec">CADASTRO</h1>

          <div className="input-field">
            <input
              type="username"
              placeholder="Nome Completo"
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          
          <div className="input-field">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope  className="icon" />
          </div>

          <div className="input-field">
            <input
              type="password"
              placeholder="Matrícula"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>

          <button id="button">CADASTRAR</button>

          {/* Botão para voltar à Home */}
          <button type="button" id="homeButton" onClick={handleGoHome}>
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroAluno;
