import { Link } from 'react-router-dom';
import './AlunoHome.css';
import SidebarAluno from '../sidebar/sidebarALuno';

const HomeAluno = () => {
  return (
    <div className="home-aluno-container">
      {/* Sidebar do Aluno */}
      <SidebarAluno />

      {/* Conteúdo Principal */}
      <div className="home-page">
        {/* Texto de boas-vindas */}
        <h1 className="BemVindo">Olá, Bem-vinde!</h1>

        {/* Imagem no cabeçalho */}
        <div className="header-image">
          <img id="Fundo" src="/img/Horizonte.png" alt="Fundo" />
        </div>

        {/* Quadrados abaixo da imagem */}
        <div className="squares">
          <Link to="/Principal/Alunos/ConceitoAluno" className="Bloco">Acessar Conceitos</Link>
          <Link to="/Principal/Alunos/DisciplinaAluno" className="Bloco">Acessar Disciplinas</Link>
          <Link to="/Principal/Alunos/DocAluno" className="Bloco">Acessar Documentos</Link>
          <Link to="/Principal/Alunos/BiblioAluno" className="Bloco">Acessar Biblioteca</Link>
        </div>
      </div>
    </div>
  );
};

export default HomeAluno;
