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
import Alunos from './Components/Principal/Coordenacao/Alunos';


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
        <Route path="/Principal/Coordenacao/Alunos" element={<Alunos />} />
      </Routes>
    </Router>
  );
}

export default App;
