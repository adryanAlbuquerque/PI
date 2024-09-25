import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import './LoginProf.css';

const LoginProfessor = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para autenticar professores
    alert ("Login Professor: " + username + "-" + password);
  };

  return (
    <div className="Container">
      <form onSubmit={handleSubmit}>
        <h1 id="MedioTec">Login Professor</h1>
        <div className='input-field'>
          <input type="email" 
          placeholder="Digite seu Email" 
          onChange={(e) => setUsername(e.target.value)} 
          />
          <FaUser className="icon"></FaUser>
        </div>

        <div className='input-field'>
          <input type="password" 
          placeholder="Digite sua senha" 
          onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon"></FaLock>
        </div>
        
        <button id="button">LOGIN</button>
      </form>
    </div>
  );
};

export default LoginProfessor;
