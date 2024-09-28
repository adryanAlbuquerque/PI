import { Link } from 'react-router-dom';
import './ConceitoAluno.css';
import { useState } from 'react';

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para a sidebar

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Função para alternar a sidebar

  return (
    <div className="home-page">
    
      {/* Sidebar */}
      <div className={`side ${isSidebarOpen ? 'open' : 'closed'}`}>
        <img id="MedioTec" src="/img/LogoAluno.png" alt="Logo" />
        <ul>
          <li><Link to="/Home/AlunoHome">Home</Link></li>
          <li><Link to="">Conceitos</Link></li>
          <li><Link to="">Disciplinas</Link></li>
          <li><Link to="">Documentos</Link></li>
          <li><Link to="">Requerimentos</Link></li>
          <li><Link to="">Biblioteca Digital</Link></li>
          <li><Link to="">Configurações</Link></li>
        </ul>
        <button id="Voltar">Sair</button>
      </div>
    </div>
  );
};

export default Home;
