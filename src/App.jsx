import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/Login/Login';
import Cadastro from './Components/Cadastro/Cadastro';
import Dashboard from './Components/Dashboard/Dashboard';
import Alunos from './Components/Alunos/Alunos';
import Professores from './Components/Professores/Professores';
import Turmas from './Components/Turmas/Turmas';
import Comunicados from './Components/Comunicados/Comunicados';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/alunos" component={Alunos} />
        <Route path="/professores" component={Professores} />
        <Route path="/turmas" component={Turmas} />
        <Route path="/comunicados" component={Comunicados} />
      </Switch>
    </Router>
  );
}

export default App;
