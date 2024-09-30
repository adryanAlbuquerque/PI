import { Link } from 'react-router-dom';
import './Alunos.css'; // Certifique-se que o arquivo CSS está no caminho correto
import { useState } from 'react';

const Alunos = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para a sidebar

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Função para alternar a sidebar

  const handleCadastro = () => {
    window.location.href = 'Gestão/Cadastro/CadastroAluno';  
  };

  return (
    <body className="home-aluno">    

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
        <button id="Sair"> Sair </button>
    </nav>

    {/* Conteúdo principal (falta o conteúdo aqui) */}

    <main className="main-content">
      <div id="DashboardAluno">
        <button type="button" id="CadastroButton" onClick={handleCadastro}>Cadastro</button>
      </div>
    </main>
      
    </body>
    
  );
};

export default Alunos;
