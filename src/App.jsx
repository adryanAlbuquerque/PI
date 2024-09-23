import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Cadastro from './Components/Cadastro/Cadastro';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/" element={<Login />} /> {/* Rota padrão */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
