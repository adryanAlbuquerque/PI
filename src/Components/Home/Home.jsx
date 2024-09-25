import { Link } from 'react-router-dom';
import './Home.css';
import { useState } from 'react';

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/img/logo.png" alt="Logo" />
        </div>

        <div className="menu">
          <button className="menu-button" onClick={toggleDropdown}>Portais</button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/login/aluno">Portal do Aluno</Link>
              <Link to="/login/prof">Portal do Professor</Link>
              <Link to="/login/coord">Portal do Coordenador</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Main content with background image */}
      <div className="home-container">
      </div>
    </div>
  );
};

export default Home;
