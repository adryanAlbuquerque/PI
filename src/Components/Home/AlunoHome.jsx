import { Link } from 'react-router-dom';
import './AlunoHome.css';
import SidebarAluno from '../sidebar/sidebarALuno';

const AlunoHome = () => {
  return (
    <div className="home-aluno-container">
      <SidebarAluno />

      {/* Conteúdo Principal */}
      <div className="home-page">
        <h1 className="BemVindo">Olá, Bem-vindo!</h1>

        {/* Imagem no cabeçalho */}
        <div className="header-image">
          <img id="Fundo" src="/img/Horizonte.png" alt="Fundo" />
        </div>

        {/* Quadrados abaixo da imagem */}
        <div className="squares">
          <Link to="/HomeAluno" className="Bloco">Acessar Conceitos</Link>
          <Link to="/DisciplinaAluno" className="Bloco">Acessar Disciplinas</Link>
          <Link to="/DocAluno" className="Bloco">Acessar Documentos</Link>
          <Link to="/BiblioAluno" className="Bloco">Acessar Biblioteca</Link>
        </div>
      </div>
    </div>
  );
};

export default AlunoHome;
