import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Cadastro from './Components/Cadastro/Cadastro';
//import Dashboard from './Components/Dashboard/Dashboard';
///import Alunos from './Components/Alunos/Alunos';
//import Professores from './Components/Professores/Professores';
//import Turmas from './Components/Turmas/Turmas';
//import Comunicados from './Components/Comunicados/Comunicados';
import Home from './Components/Home/Home';
import LoginAluno from './Components/Login/LoginAluno/LoginAluno';
import LoginProf from './Components/Login/LoginProf/LoginProf';
import LoginCoord from './Components/Login/LoginCoord/LoginCoord';

function App() {
  return (
    <Router>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/aluno" element={<LoginAluno />} />
        <Route path="/login/prof" element={<LoginProf />} />
        <Route path="/login/coord" element={<LoginCoord />} />
      </Routes>
    </Router>
  );
}

export default App;
