import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroGeral from './Components/Gestão/Cadastro/CadastroGeral'; //
import HomePortal from './Components/Home/HomePortal';
import AlunoHome from './Components/Home/AlunoHome';
import ProfHome from './Components/Home/ProfHome';
import CoordHome from './Components/Home/CoordHome';
import LoginAluno from './Components/Login/LoginAluno/LoginAluno';
import LoginProf from './Components/Login/LoginProf/LoginProf';
import LoginCoord from './Components/Login/LoginCoord/LoginCoord';
import GerenciaAlunos from './Components/Principal/Coordenacao/GerenciaAlunos';
import GerenciaProfessores from './Components/Principal/Coordenacao/GerenciaProfessores';
import GerenciaCoordenador from './Components/Principal/Coordenacao/GerenciaCoordenador';
import GerenciaTurmas from './Components/Principal/Coordenacao/GerenciaTurmas';
import GerenciaDisciplina from './Components/Principal/Coordenacao/GerenciaDisciplina';
import ConceitoAluno from './Components/Principal/Alunos/ConceitoAluno' ;
import DisciplinasProf from './Components/Principal/Professores/DisciplinasProf' ;
import LancarNotas from './Components/Principal/Professores/LancarNotas';
import HorarioAluno from './Components/Principal/Alunos/HoraAluno';
import Contatos from './Components/Principal/Alunos/ContatosAluno';
import DisciplinasAluno from './Components/Principal/Alunos/DisciplinasAluno'; 
import ConfiguracoesAluno from './Components/Principal/Alunos/ConfigAluno';

function App() {
  return (
    <Router>
       <Routes>
        <Route path="/" element={<HomePortal />} />
        <Route path="/loginAluno" element={<LoginAluno />} />
        <Route path="/loginProf" element={<LoginProf />} />
        <Route path="/loginCoord" element={<LoginCoord />} />
        <Route path="/CadastroGeral" element={<CadastroGeral />} /> 
        <Route path="/HomeCoordenacao" element={<CoordHome />} />
        <Route path="/HomeAluno" element={<AlunoHome/>} />
        <Route path="/HomeProf" element={<ProfHome/>} />
        <Route path="/GerenciamentoAlunos" element={<GerenciaAlunos />} />
        <Route path="/GerenciamentoProfessores" element={<GerenciaProfessores />} />
        <Route path="/GerenciamentoCoordenador" element={<GerenciaCoordenador />} />
        <Route path="/GerenciamentoTurmas" element={<GerenciaTurmas />} />
        <Route path="/GerenciamentoDisciplina" element={<GerenciaDisciplina />} />
        <Route path="/ConceitoAluno" element={<ConceitoAluno />} /> 
        <Route path="/DisciplinasProf" element={<DisciplinasProf />} />
        <Route path="/LancarNotas" element={<LancarNotas />} />
        <Route path="/HorarioAluno" element={<HorarioAluno />} />
        <Route path="/Contatos" element={<Contatos />} />
        <Route path="/DisciplinasAluno" element={<DisciplinasAluno />} />
        <Route path="/ConfiguraçãoAluno" element={<ConfiguracoesAluno />} />
      </Routes>
    </Router>
  );
}

export default App;