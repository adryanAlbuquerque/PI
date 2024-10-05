import { Link } from 'react-router-dom';
import './sidebarAluno.css';
import { useState } from 'react';

const SidebarAluno = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para a sidebar

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Função para alternar a sidebar

  return (
    <div className="sidebar-container">
    
      {/* Sidebar */}
      <nav className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <img id="MedioTec" src="/img/logo.png" alt="Logo" />
        <ul>
          <li><Link to="/Home/AlunoHome">Home</Link></li>
          <li><Link to="/Principal/Alunos/ConceitoAluno">Conceitos</Link></li>
          <li><Link to="/Principal/Alunos/DisciplinaAluno">Disciplinas</Link></li>
          <li><Link to="/Principal/Alunos/DocAluno">Documentos</Link></li>
          <li><Link to="/Principal/Alunos/RequeAluno">Requerimentos</Link></li>
          <li><Link to="/Principal/Alunos/BiblioAluno">Biblioteca Digital</Link></li>
          <li><Link to="/Principal/Alunos/ConfigAluno">Configurações</Link></li>
        </ul>
        <div>
          <button type="button" id="SairButton" onClick={() => window.location.href = '/Home/Home.jsx'}>
            Sair
          </button>
        </div>

      </nav>
    </div>
  );
};

export default SidebarAluno;
