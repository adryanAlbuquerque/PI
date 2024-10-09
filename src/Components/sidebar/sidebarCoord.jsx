import { Link } from 'react-router-dom';
import './sidebarCoord.css';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones para abrir/fechar


const SidebarCoord = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar fechada por padrão

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Alterna a sidebar

  return (
    <div className="sidebar-container-Coord">
      {/* Botão para abrir/fechar a sidebar */}
      <button className="sidebar-toggle-coord" onClick={toggleSidebar}>
      {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar-Coord ${isSidebarOpen ? 'open' : 'closed'}`}>
        <img id="MedioTecCoord" src="/img/logo.png" alt="Logo" />
        <ul>
          <li><Link to="/HomeCoordenacao">Home</Link></li>
          <li><Link to="/GerenciamentoAlunos">Alunos</Link></li>
          <li><Link to="/GerenciamentoProfessores">Professores</Link></li>
          <li><Link to="/GerenciamentoCoordenador">Coordenadores</Link></li>
          <li><Link to="/GerenciamentoTurmas">Turmas</Link></li>
          <li><Link to="/GerenciamentoDisciplina">Disciplinas</Link></li>
          <li><Link to="/Relatorios">Relatórios</Link></li>
          <li><Link to="">Configurações</Link></li>
        </ul>
        <div>
          <button type="button" className="SairCoord" onClick={() => window.location.href = '/'}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarCoord;
