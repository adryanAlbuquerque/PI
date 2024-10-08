import './CoordHome.css'; // Certifique-se que o arquivo CSS está no caminho correto
import SidebarCoord from '../sidebar/sidebarCoord';

const CoordHome = () => {
  return (
    <div className="home-coord-container">

      <SidebarCoord />

      {/* Conteúdo Principal */}
      <div className='home-page-coord'>
        <h1 className="BemvindoCoord">Olá, Bem-vindo ao Portal Coordenador!</h1>

        <div className="header-image-coord">
          <img id="Fundocoord" src="/img/Horizonte.png" alt="Fundo" />
        </div>

        {/* Quadrados abaixo da imagem */}
        <div className="Square">
          <a href="/GerenciamentoAlunos" className="Squares">Acessar Alunos</a>
          <a href="/GerenciamentoProfessores" className="Squares">Acessar Professores</a>
          <a href="/GerenciamentoTurmas" className="Squares">Acessar Turmas</a>
          <a href="/" className="Squares">Acessar Relatórios</a>
        </div>

      </div>
    </div>
  );
};

export default CoordHome;
