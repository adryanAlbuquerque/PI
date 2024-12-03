import { Link } from 'react-router-dom';
import './sidebarAluno.css';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones para abrir/fechar


const SidebarAluno = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
          <li><Link to="/ConceitoAluno">Conceitos</Link></li>
          <li><Link to="/">Disciplinas</Link></li>
          <li><Link to="/HorarioAluno">Horários</Link></li>
          <li><Link to="/Contatos">Contatos</Link></li>
          <li><Link to="/">Financeiro</Link></li>
          <li><Link to="/">Configurações</Link></li>
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
