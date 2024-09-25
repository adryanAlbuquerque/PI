import { Link } from 'react-router-dom';
import './Home.css';
import React, { useState } from 'react';

const Home = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">
          <img src="/vite.svg" alt="Logo" />
        </div>


        
      </nav>



      <h1>Bem-vindo ao MedioTec</h1>
      <p id='tipo-login'>Escolha seu tipo de login:</p>
      <div className="login-options">
        <Link to="/login/aluno" className="login-button">Aluno</Link>
        <Link to="/login/professor" className="login-button">Professor</Link>
        <Link to="/login/coordenador" className="login-button">Coordenador</Link>
      </div>
    </div>
  );
};

export default Home;
