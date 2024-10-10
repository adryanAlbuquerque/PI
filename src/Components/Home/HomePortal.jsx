import { Link } from 'react-router-dom';
import './HomePortal.css';
import { useState } from 'react';

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
          <img src="/img/logo.png" alt="Logo" />
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
      {/* Main content with background image */}
      <div className="home-container">
        <img id="Fundo" src="/img/image.png" alt="Logo" />
      </div>
    </div>
  );
};

export default HomePortal;
