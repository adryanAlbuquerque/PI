import { FaUser, FaLock } from 'react-icons/fa';

import { useState } from 'react';

import "./Login.css";

// Componente de login com React Hooks
const Login = () => {
  return (
    <div className="Container">
      <form>
        <h1>Login</h1>
        <div>
          <input type="email" placeholder="E-mail" />
          <FaUser className="icon"></FaUser>
        </div>
        <div>
          <input type="password" placeholder="Senha" />
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
