import { Link } from 'react-router-dom';
import '../Themes/themesSidebar.css';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones para abrir/fechar


const SidebarAluno = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="sidebar-container">
      <button className="sidebar-toggle-aluno" onClick={toggleSidebar}>
      {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`sidebar-list-aluno  ${isSidebarOpen ? 'open' : 'closed'}`}>
        <img id="MedioTecSidebar" src="/img/LogoAluno.png" alt="Logo" />
        <ul>
          <li><Link to="/HomeAluno">Home</Link></li>
          <li><Link to="/ConceitoAluno">Conceitos</Link></li>
          <li><Link to="/DisciplinasAluno">Disciplinas</Link></li>
          <li><Link to="/HorarioAluno">Horários</Link></li>
          <li><Link to="/Contatos">Contatos</Link></li>
          <li><Link to="/ConfiguraçãoAluno">Configurações</Link></li>
        </ul>
        <div>
          <button type="button" className="Sairbutton-Aluno" onClick={() => window.location.href = '/'}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarAluno;
