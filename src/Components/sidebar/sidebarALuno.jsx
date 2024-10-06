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
      <div className={`sidebar-Aluno ${isSidebarOpen ? 'open' : 'closed'}`}>
        <img id="MedioTecAluno" src="/img/LogoAluno.png" alt="Logo" />
        <ul>
          <li><Link to="/HomeAluno">Home</Link></li>
          <li><Link to="/Principal/Alunos/ConceitoAluno">Conceitos</Link></li>
          <li><Link to="/Principal/Alunos/DisciplinaAluno">Disciplinas</Link></li>
          <li><Link to="/Principal/Alunos/DocAluno">Documentos</Link></li>
          <li><Link to="/Principal/Alunos/RequeAluno">Requerimentos</Link></li>
          <li><Link to="/Principal/Alunos/BiblioAluno">Biblioteca Digital</Link></li>
          <li><Link to="/Principal/Alunos/ConfigAluno">Configurações</Link></li>
        </ul>
        <div>
          <button type="button" className ="SairAluno" onClick={() => window.location.href = '/'}>
            Sair
          </button>
        </div>

      </div>
    </div>
  );
};

export default SidebarAluno;
