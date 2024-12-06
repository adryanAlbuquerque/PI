import { Link } from 'react-router-dom';
import './sidebarCoord.css';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; 


const SidebarCoord = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="sidebar-container-Coord">

      <button className="sidebar-toggle-coord" onClick={toggleSidebar}>
      {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`sidebar-Coord ${isSidebarOpen ? 'open' : 'closed'}`}>
        <img id="MedioTecCoord" src="/img/logo.png" alt="Logo" />
        <ul>
          <li><Link to="/HomeCoordenacao">Home</Link></li>
          <li><Link to="/GerenciamentoAlunos">Alunos</Link></li>
          <li><Link to="/GerenciamentoProfessores">Professores</Link></li>
          <li><Link to="/GerenciamentoCoordenador">Coordenadores</Link></li>
          <li><Link to="/GerenciamentoTurmas">Turmas</Link></li>
          <li><Link to="/GerenciamentoDisciplina">Disciplinas</Link></li>
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
