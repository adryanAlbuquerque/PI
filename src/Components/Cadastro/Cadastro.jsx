import { Link } from 'react-router-dom';


import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

import { useState } from 'react';

import './Cadastro.css';

const Cadastro = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      
      alert ("Enviando os dados:" + email + "-" + username + "-" + password);
    };
  
    return (
      <div className="Container">
        <form onSubmit={handleSubmit}>
          <h1 id="MedioTec">MedioTec</h1>

          <div className='input-field'>
            <input type="email" 
            placeholder="Digite seu Email" 
            onChange={(e) => setEmail(e.target.value)} 
            />
            <FaEnvelope className="icon"></FaEnvelope>
          </div>

          <div className='input-field'>
            <input type="text" 
            placeholder="Digite sua matrícula" 
            onChange={(e) => setUsername(e.target.value)} 
            />
            <FaUser className="icon" />
        </div>
  
          <div className='input-field'>
            <input type="password" 
            placeholder="Digite sua senha" 
            onChange={(e) => setPassword (e.target.value)}
            />
            <FaLock className="icon"></FaLock>
          </div>
          
          <button id="button">CADASTRAR</button>
          
          <div className="login-link">
            <p>
              Já possui uma conta? <Link to="/login">Entre agora</Link>
            </p>
          </div>
          
        </form>
      </div>
    );
  };
  
  export default Cadastro;