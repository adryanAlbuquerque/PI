import { Link } from 'react-router-dom';
import './CoordHome.css'; // Certifique-se que o arquivo CSS está no caminho correto
import { useState } from 'react';

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para a sidebar

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Função para alternar a sidebar

  return (
    <div className="home-page">
      {/* Texto de boas-vindas */}
      <h1 className="welcome-text">Olá, Bem-vindo!</h1>

      <div className="header-image">
        <img id="Fundo" src="/img/Horizonte.png" alt="Fundo" />
      </div>

      {/* Quadrados abaixo da imagem */}
      <div className="squares-container">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="square" key={index}></div>
        ))}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <img id="MedioTec" src="/img/logo.png" alt="Logo" />
        <ul>
          <li><Link to="">Home</Link></li>
          <li><Link to="">Alunos</Link></li>
          <li><Link to="">Professores</Link></li>
          <li><Link to="">Turmas</Link></li>
          <li><Link to="">Relatórios</Link></li>
          <li><Link to="">Configurações</Link></li>
        </ul>
        <button id="Sair"> Sair </button>
      </div>

      {/* Conteúdo principal (falta o conteúdo aqui) */}
    </div>
  );
};

export default Home;
