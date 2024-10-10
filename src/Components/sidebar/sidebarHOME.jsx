import { Link } from 'react-router-dom';
import './sidebarHome.css'; // Certifique-se de que o caminho está correto
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones para abrir/fechar

const SidebarHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar fechada por padrão

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Alterna a sidebar

  return (
    <div className="sidebar-container-home">
      {/* Botão para abrir/fechar a sidebar */}
      <button className="sidebar-toggle-home" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar-home ${isSidebarOpen ? 'open' : 'closed'}`}>
        <img id="MedioTecHome" src="/img/LogoProf.png" alt="Logo" />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Turma</Link>
          </li>
          <li>
            <Link to="/">Lançar Notas</Link>
          </li>
          <li>
            <Link to="/">Relatórios</Link>
          </li>
          <li>
            <Link to="/">Professores</Link>
          </li>
          <li>
            <Link to="/">Biblioteca Digital</Link>
          </li>
          <li>
            <Link to="/">Configurações</Link>
          </li>
        </ul>
        <div>
          <button
            type="button"
            className="SairHome"
            onClick={() => (window.location.href = '/')}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarHome;
