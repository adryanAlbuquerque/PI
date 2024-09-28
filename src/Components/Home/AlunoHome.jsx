import { Link } from 'react-router-dom';
import './AlunoHome.css';
import { useState } from 'react';

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para a sidebar

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Função para alternar a sidebar

  return (
    <div className="home-page">
      {/* Texto de boas-vindas */}
      <h1 className="BemVindo">Olá, Bem-vindo!</h1>

      <div className="header-image">
        <img id="Fundo" src="/img/Horizonte.png" alt="Fundo" />
      </div>

      {/* Quadrados abaixo da imagem */}
      <div className="squares">
        <div className="Bloco">Acessar Conceitos</div>
        <div className="Bloco">Acessar Disciplinas</div>
        <div className="Bloco">Acessar Documentos</div>
        <div className="Bloco">Acessar Biblioteca</div>
      </div>

      {/* Sidebar */}
      <div className={`side ${isSidebarOpen ? 'open' : 'closed'}`}>
        <img id="MedioTec" src="/img/LogoAluno.png" alt="Logo" />
        <ul>
          <li><Link to="">Home</Link></li>
          <li><Link to="/Principal/Alunos/ConceitoAluno">Conceitos</Link></li>
          <li><Link to="">Disciplinas</Link></li>
          <li><Link to="">Documentos</Link></li>
          <li><Link to="">Requerimentos</Link></li>
          <li><Link to="">Biblioteca Digital</Link></li>
          <li><Link to="">Configurações</Link></li>
        </ul>
        <button id="Voltar">Sair</button>
      </div>
    </div>
  );
};

export default Home;
