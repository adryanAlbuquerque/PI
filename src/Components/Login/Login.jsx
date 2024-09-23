import { Link } from 'react-router-dom';

import { FaUser, FaLock } from 'react-icons/fa';

import { useState } from 'react';

import './Login.css';

// Componente de login com React Hooks
const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    alert ("Enviando os dados:" + username + "-" + password);
  };

  return (
    <div className="Container">
      <form onSubmit={handleSubmit}>
        <h1 id="MedioTec">MedioTec</h1>
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
          onChange={(e) => setPassword (e.target.value)}
          />
          <FaLock className="icon"></FaLock>
        </div>
        
        {/* Elemento de lembar de mim */}
        <div id="recal-forget"> 
          <label id="label">
          <input id="Checkbox" type="checkbox"/> 
            <p id="Lembre">Lembre-me de mim</p>
          </label>
          <a href="#" id="Esqueceu">Esqueci minha senha</a>
        </div>
          
        <button id="button">LOGIN</button>
        
        <div className='signup-link'>
          <p>
            Não possui uma conta? <Link to="/cadastro">Crie uma agora</Link>
          </p>
        </div>

      </form>
    </div>
  );
};

export default Login;
