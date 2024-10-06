//import { Link } from 'react-router-dom';
import './CoordHome.css'; // Certifique-se que o arquivo CSS está no caminho correto
import SidebarCoord from '../sidebar/sidebarCoord';

const CoordHome = () => {
  
  return (
    <div className="home-coord-container">

      <SidebarCoord />

      {/* Conteúdo Principal */}
      <div className='home-page-coord'>
        <h1 className="welcome-text">Olá, Bem-vindo!</h1>

        <div className="header-image-coord">
          <img id="Fundocoord" src="/img/Horizonte.png" alt="Fundo" />
        </div>

        {/* Quadrados abaixo da imagem */}
        <div className="squares-container-coord">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="squarecoord" key={index}></div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CoordHome;
