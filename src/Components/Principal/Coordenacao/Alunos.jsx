import { Link } from 'react-router-dom';
import './Alunos.css';
import { useState } from 'react';

const Alunos = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroTurma, setFiltroTurma] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);

  const alunos = [
    { matricula: '2021001', nome: 'Ana Souza', turma: 'Turma A', turno: 'Manhã', status: 'Ativo' },
    { matricula: '2021002', nome: 'João Silva', turma: 'Turma B', turno: 'Tarde', status: 'Inativo' },
    // Adicione mais alunos aqui
  ];

  const handleCadastro = () => {
    window.location.href = '/Cadastro/Cadastro';
  };

  const handleSair = () => {
    window.location.href = '/Home/Home.jsx';
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFiltroTurma = (event) => {
    setFiltroTurma(event.target.value);
  };

  const handleEdit = (aluno) => {
    setSelectedAluno(aluno);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAluno(null);
  };

  const filteredAlunos = alunos.filter((aluno) =>
    (aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.matricula.includes(searchTerm)) &&
    (filtroTurma === '' || aluno.turma === filtroTurma)
  );

  return (
    <body className="home-aluno">
      {/* Sidebar */}
      <nav className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <img id="MedioTec" src="/img/logo.png" alt="Logo" />
        <ul>
          <li><Link to="/Home/CoordHome">Home</Link></li>
          <li><Link to="">Alunos</Link></li>
          <li><Link to="/Principal/Coordenacao/Professores">Professores</Link></li>
          <li><Link to="/Principal/Coordenacao/Turmas">Turmas</Link></li>
          <li><Link to="/Principal/Coordenacao/Relatorios">Relatórios</Link></li>
          <li><Link to="">Configurações</Link></li>
        </ul>
        <div>
          <button type="button" id="SairButton" onClick={handleSair}>Sair</button>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <main className="main-content">
        <div id="DashboardAluno">
          <button type="button" id="CadastroButton" onClick={handleCadastro}>Cadastro</button>
          <div className="search-filter">
            <input
              type="text"
              placeholder="Pesquisar por nome ou matrícula"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <select value={filtroTurma} onChange={handleFiltroTurma} className="filter-select">
              <option value="">Filtrar por turma</option>
              <option value="Turma A">Turma A</option>
              <option value="Turma B">Turma B</option>
              {/* Adicione mais opções de turma conforme necessário */}
            </select>
          </div>
          
          {/* Tabela de alunos */}
          <table className="alunos-table">
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Nome</th>
                <th>Turma</th>
                <th>Turno</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlunos.map((aluno) => (
                <tr key={aluno.matricula}>
                  <td>{aluno.matricula}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.turma}</td>
                  <td>{aluno.turno}</td>
                  <td>{aluno.status}</td>
                  <td>
                    <button onClick={() => handleEdit(aluno)} className="edit-button">Editar</button>
                    <button onClick={() => alert(`Aluno ${aluno.nome} excluído.`)} className="delete-button">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal de Edição */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Aluno</h2>
            <form>
              <label>Matrícula</label>
              <input type="text" value={selectedAluno?.matricula} readOnly />
              <label>Nome</label>
              <input type="text" value={selectedAluno?.nome} readOnly />
              <label>Turma</label>
              <input type="text" value={selectedAluno?.turma} readOnly />
              <label>Turno</label>
              <input type="text" value={selectedAluno?.turno} readOnly />
              <label>Status</label>
              <select value={selectedAluno?.status}>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
              <div className="modal-buttons">
                <button type="button" onClick={handleModalClose} className="cancel-button">Cancelar</button>
                <button type="submit" className="save-button">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </body>
  );
};

export default Alunos;
