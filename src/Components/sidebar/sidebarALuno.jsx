import { Link } from 'react-router-dom';
import './sidebarAluno.css';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones para abrir/fechar


const SidebarAluno = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar fechada por padrão

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Alterna a sidebar

  return (
    <div className="sidebar-container-aluno">
      {/* Botão para abrir/fechar a sidebar */}
      <button className="sidebar-toggle-aluno" onClick={toggleSidebar}>
      {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

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
          <button type="button" className="SairAluno" onClick={() => window.location.href = '/'}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarAluno;
