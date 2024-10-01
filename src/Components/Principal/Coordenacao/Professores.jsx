import { Link } from 'react-router-dom';
import './Professores.css'; // Certifique-se que o arquivo CSS está no caminho correto
import { useState } from 'react';

const Professores = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para a sidebar
  

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Função para alternar a sidebar

  const handleCadastro = () => {
    window.location.href = '/Cadastro/CadastroProfessor';  
  };

  const handleSair = () => {
    window.location.href = '/Home/Home.jsx';
  };

  return (
    <body className="home-Professor">    

    {/* Sidebar */}

    <nav className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} >
      <img id="MedioTec" src="/img/logo.png" alt="Logo" />
        <ul>
          <li><Link to="/Home/CoordHome">Home</Link></li>
          <li><Link to="">Alunos</Link></li>
          <li><Link to="/Principal/Coordenacao/Professores">Professores</Link></li>
          <li><Link to="/Principal/Coordenacao/Turmas">Turmas</Link></li>
          <li><Link to="/Principal/Coordenacao/Relatorios">Relatórios</Link></li>
          <li><Link to="">Configurações</Link></li>
        </ul>
        <div>
          <button type="button" id="SairButton" onClick={handleSair}>Sair</button>
        </div>
    </nav>

    {/* Conteúdo principal (falta o conteúdo aqui) */}

    <main className="main-content">
      <div id="DashboardProfessor">
        <button type="button" id="CadastroButton" onClick={handleCadastro}>Cadastro</button>
      </div>
    </main>
      
    </body>
    
  );
};

export default Professores;
