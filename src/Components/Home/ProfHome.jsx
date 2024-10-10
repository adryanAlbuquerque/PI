import './ProfHome.css';
import SidebarCoord from '../sidebar/sidebarProf';

const CoordHome = () => {
  return (
    <div className="home-prof-container">

      <SidebarCoord />

      {/* Conteúdo Principal */}
      <div className='home-page-prof'>
        <h1 className="BemvindoProf">Olá, Bem-vindo ao Portal Professor!</h1>

        <div className="header-image-Prof">
          <img id="Fundocoord" src="/img/Horizonte.png" alt="Fundo" />
        </div>

        {/* Quadrados abaixo da imagem */}
        <div className="Quadro">
          <a href="/" className="Quadros">Acessar Turma</a>
          <a href="/" className="Quadros">Lançar Notas</a>
          <a href="/" className="Quadros">Biblioteca Digital</a>
          <a href="/" className="Quadros">Acessar Relatórios</a>
        </div>

      </div>
    </div>
  );
};

export default CoordHome;
