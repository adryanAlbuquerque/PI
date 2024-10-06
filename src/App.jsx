import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroGeral from './Components/Gestão/Cadastro/CadastroGeral'; //
import HomePortal from './Components/Home/HomePortal';
import AlunoHome from './Components/Home/AlunoHome';
import CoordHome from './Components/Home/CoordHome';
import LoginAluno from './Components/Login/LoginAluno/LoginAluno';
import LoginProf from './Components/Login/LoginProf/LoginProf';
import LoginCoord from './Components/Login/LoginCoord/LoginCoord';
import GerenciaAlunos from './Components/Principal/Coordenacao/GerenciaAlunos';
import GerenciaProfessores from './Components/Principal/Coordenacao/GerenciaProfessores';

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
        <Route path="/GerenciamentoAlunos" element={<GerenciaAlunos />} />
        <Route path="/GerenciamentoProfessores" element={<GerenciaProfessores />} />
        
      </Routes>
    </Router>
  );
}

export default App;

//<Route path="/Cadastro/CadastroCoordenador" element={<CadastroCoordenador />} />
/*<Route path="/Principal/Alunos/ConceitoAluno" element={<ConceitoAluno />} />
<Route path="/Principal/Alunos/DisciplinaAluno" element={<DisciplinaAluno />} />
<Route path="/Principal/Alunos/DocAluno" element={<DocAluno />} />
<Route path="/Principal/Alunos/RequeAluno" element={<RequeAluno />} />
<Route path="/Principal/Alunos/BiblioAluno" element={<BiblioAluno />} />*/