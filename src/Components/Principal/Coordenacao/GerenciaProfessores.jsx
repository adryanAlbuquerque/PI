//import { Link } from 'react-router-dom';
import './GerenciaProfessores.css'; // Certifique-se que o arquivo CSS está no caminho correto
import SidebarAluno from '../../sidebar/sidebarCoord';


const GerenciaProfessores = () => {
 
  const handleCadastro = () => {
    window.location.href = '/CadastroGeral';  
  };

  return (
    <div className="principal-Prof">    

    <SidebarAluno />

    {/* Conteúdo principal (falta o conteúdo aqui) */}
      <div id="DashboardProfessor">
        <button type="button" id="CadastroButtonprof" onClick={handleCadastro}>Cadastro</button>
      </div>
      
    </div>
    
  );
};

export default GerenciaProfessores;
