import { Link } from 'react-router-dom';
import '../Themes/themesSidebar.css';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones para abrir/fechar


const SidebarProf = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); 

  return (
    <div className="sidebar-container">
      <button className="sidebar-toggle-prof" onClick={toggleSidebar}>
      {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`sidebar-list-prof ${isSidebarOpen ? 'open' : 'closed'}`}>
        <img id="MedioTecSidebar" src="/img/LogoProf.png" alt="Logo" />
        <ul>
          <li><Link to="/HomeProf">Home</Link></li>
          <li><Link to="/DisciplinasProf">Disciplinas</Link></li>
          <li><Link to="/LancarNotas">Lançar Notas</Link></li>
          <li><Link to="/">Configurações</Link></li>
        </ul>
        <div>
          <button type="button" className="Sairbutton-Prof" onClick={() => window.location.href = '/'}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarProf;
