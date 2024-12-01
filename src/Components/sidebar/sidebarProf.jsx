import { Link } from 'react-router-dom';
import './sidebarProf.css';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones para abrir/fechar


const SidebarProf = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar fechada por padrão

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Alterna a sidebar

  return (
    <div className="sidebar-container-prof">
      {/* Botão para abrir/fechar a sidebar */}
      <button className="sidebar-toggle-prof" onClick={toggleSidebar}>
      {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar-prof ${isSidebarOpen ? 'open' : 'closed'}`}>
        <img id="MedioTecprof" src="/img/LogoProf.png" alt="Logo" />
        <ul>
          <li><Link to="/HomeProf">Home</Link></li>
          <li><Link to="/DisciplinasProf">Turmas</Link></li>
          <li><Link to="/LancarNotas">Lançar Notas</Link></li>
          <li><Link to="/">Relatórios</Link></li>
          <li><Link to="/">Biblioteca Digital</Link></li>
          <li><Link to="/">Configurações</Link></li>
        </ul>
        <div>
          <button type="button" className="Sairprof" onClick={() => window.location.href = '/'}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarProf;
