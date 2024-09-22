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
        <h1>Login</h1>
        <div className='input-field'>
          <input type="email" 
          placeholder="E-mail" 
          onChange={(e) => setUsername(e.target.value)} 
          />
          <FaUser className="icon"></FaUser>
        </div>

        <div className='input-field'>
          <input type="password" 
          placeholder="Senha" 
          onChange={(e) => setPassword (e.target.value)}
          />
          <FaLock className="icon"></FaLock>
        </div>
        
        {/* Elemento de lembar de mim */}
        <div className="recall-forget"> 
          <label>
            <input type="checkbox" /> 
            Lembre-me de mim
          </label>
          <a href="#">Esqueceu a senha?</a>
        </div>
          
        <button>Entrar</button>
        
        <div className='signup-link'>
          <p>
            Não possui uma conta? <a href="#">Crie uma agora</a>
          </p>
      
        </div>
      </form>
    </div>
  );
};

export default Login;
