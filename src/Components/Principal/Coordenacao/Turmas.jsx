import { Link } from 'react-router-dom';
import './Turmas.css'; // Certifique-se que o arquivo CSS está no caminho correto
import { useState } from 'react';

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para a sidebar

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Função para alternar a sidebar

  return (
    <div className="home-page">
    
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <img id="MedioTec" src="/img/logo.png" alt="Logo" />
        <ul>
          <li><Link to="/Home/CoordHome">Home</Link></li>
          <li><Link to="/Principal/Coordenacao/Alunos">Alunos</Link></li>
          <li><Link to="/Principal/Coordenacao/Professores">Professores</Link></li>
          <li><Link to="">Turmas</Link></li>
          <li><Link to="/Principal/Coordenacao/Relatorios">Relatórios</Link></li>
          <li><Link to="">Configurações</Link></li>
        </ul>
        <button id="Sair"> Sair </button>
      </div>

      {/* Conteúdo principal (falta o conteúdo aqui) */}
    </div>
  );
};

export default Home;
