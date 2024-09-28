import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from './Components/Gestão/Cadastro/Cadastro';
//import Dashboard from './Components/Dashboard/Dashboard';
///import Alunos from './Components/Alunos/Alunos';
//import Professores from './Components/Professores/Professores';
//import Turmas from './Components/Turmas/Turmas';
//import Comunicados from './Components/Comunicados/Comunicados';
import Home from './Components/Home/Home';
import LoginAluno from './Components/Login/LoginAluno/LoginAluno';
import LoginProf from './Components/Login/LoginProf/LoginProf';
import LoginCoord from './Components/Login/LoginCoord/LoginCoord';
import CoordHome from './Components/Home/CoordHome';
import AlunoHome from './Components/Home/AlunoHome';
import Alunos from './Components/Principal/Coordenacao/Alunos';
import Professores from './Components/Principal/Coordenacao/Professores';
import Turmas from './Components/Principal/Coordenacao/Turmas';
import Relatorios from './Components/Principal/Coordenacao/Relatorios';
import ConceitoAluno from './Components/Principal/Alunos/ConceitoAluno';
import DisciplinaAluno from './Components/Principal/Alunos/DisciplinaAluno';
import DocAluno from './Components/Principal/Alunos/DocAluno';
import RequeAluno from './Components/Principal/Alunos/RequeAluno';
import BiblioAluno from './Components/Principal/Alunos/BiblioAluno';


function App() {
  return (
    <Router>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/aluno" element={<LoginAluno />} />
        <Route path="/login/prof" element={<LoginProf />} />
        <Route path="/login/coord" element={<LoginCoord />} />
        <Route path="/Cadastro/Cadastro" element={<Cadastro />} />
        <Route path="/Home/CoordHome" element={<CoordHome />} />
        <Route path="/Home/AlunoHome" element={<AlunoHome />} />
        <Route path="/Principal/Coordenacao/Alunos" element={<Alunos />} />
        <Route path="/Principal/Coordenacao/Professores" element={<Professores />} />
        <Route path="/Principal/Coordenacao/Turmas" element={<Turmas />} />
        <Route path="/Principal/Coordenacao/Relatorios" element={<Relatorios />} />
        <Route path="/Principal/Alunos/ConceitoAluno" element={<ConceitoAluno />} />
        <Route path="/Principal/Alunos/DisciplinaAluno" element={<DisciplinaAluno />} />
        <Route path="/Principal/Alunos/DocAluno" element={<DocAluno />} />
        <Route path="/Principal/Alunos/RequeAluno" element={<RequeAluno />} />
        <Route path="/Principal/Alunos/BiblioAluno" element={<BiblioAluno />} />
      </Routes>
    </Router>
  );
}

export default App;
