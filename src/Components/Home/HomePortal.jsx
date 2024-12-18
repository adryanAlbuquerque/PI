import { Link } from 'react-router-dom';
import './HomePortal.css';
import { useState } from 'react';
// Importando as imagens corretamente
import logo from '/img/logo.png';
import fundo from '/img/image.png';

const HomePortal = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="home-page">
      <nav className="Barra">
        <p id="FaleConosco">Fale conosco</p>
      </nav>

      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <div>
          <ul id="Infos">
            <li id="Home">Home</li>
            <li id="Inst">Institucional</li>
            <li id="Sobre">Sobre</li>
            <li id="Contato">Contato</li>
          </ul>
        </div>

        <div className="menu">
          <button className="menu-button" onClick={toggleDropdown}>
            Portais
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/loginAluno">Portal do Aluno</Link>
              <Link to="/loginProf">Portal do Professor</Link>
              <Link to="/loginCoord">Portal do Coordenador</Link>
            </div>
          )}
        </div>
      </nav>

      <div className="home-container">
        <img id="Fundo" src={fundo} alt="Fundo" />
      </div>
    </div>
  );
};

export default HomePortal;
