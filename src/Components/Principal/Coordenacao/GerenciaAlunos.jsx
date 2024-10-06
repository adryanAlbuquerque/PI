import { Link } from 'react-router-dom';
import './GerenciaAlunos.css';
import { useState, useEffect } from 'react';
import { getAlunos, updateAluno, deleteAluno } from '../../../Service/APIServices';

const GerenciaAlunos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroTurma, setFiltroTurma] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    getAlunos()
      .then(response => {
        setAlunos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar alunos:', error);
      });
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    updateAluno(selectedAluno.id, selectedAluno)
      .then(response => {
        const updatedAlunos = alunos.map(aluno =>
          aluno.id === selectedAluno.id ? response.data : aluno
        );
        setAlunos(updatedAlunos);
        setIsModalOpen(false);
        console.log('Aluno atualizado:', response.data);
      })
      .catch(error => {
        console.error('Erro ao atualizar aluno:', error);
      });
  };

  const handleDelete = (id) => {
    deleteAluno(id)
      .then(() => {
        setAlunos(alunos.filter(aluno => aluno.id !== id));
        console.log('Aluno excluído');
      })
      .catch(error => {
        console.error('Erro ao excluir aluno:', error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFiltroTurma = (event) => {
    setFiltroTurma(event.target.value);
  };

  const handleEdit = (aluno) => {
    setSelectedAluno({ ...aluno });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAluno(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedAluno((prevAluno) => ({
      ...prevAluno,
      [name]: value,
    }));
  };

  const filteredAlunos = alunos.filter((aluno) =>
    (aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aluno.matricula.includes(searchTerm)) &&
    (filtroTurma === '' || aluno.turma === filtroTurma)
  );

  return (
    <div className="home-aluno">
      {/* Sidebar */}
      <nav className="sidebar">
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
          <button type="button" id="SairButton" onClick={() => window.location.href = '/'}>
            Sair
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="main-content">
        <div id="DashboardAluno">
          <Link to="/CadastroGeral" id="CadastroButton">
            Cadastro
          </Link>
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
            </select>
          </div>

          {/* Students table */}
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
                <tr key={aluno.id}>
                  <td>{aluno.matricula}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.turma}</td>
                  <td>{aluno.turno}</td>
                  <td>{aluno.status}</td>
                  <td>
                    <button onClick={() => handleEdit(aluno)} className="edit-button">Editar</button>
                    <button onClick={() => handleDelete(aluno.id)} className="delete-button">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal for Editing */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Aluno</h2>
            <form onSubmit={handleSave}>
              <label>Matrícula</label>
              <input
                type="text"
                name="matricula"
                value={selectedAluno?.matricula || ''}
                onChange={handleInputChange}
              />
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={selectedAluno?.nome || ''}
                onChange={handleInputChange}
              />
              <label>Turma</label>
              <input
                type="text"
                name="turma"
                value={selectedAluno?.turma || ''}
                onChange={handleInputChange}
              />
              <label>Turno</label>
              <input
                type="text"
                name="turno"
                value={selectedAluno?.turno || ''}
                onChange={handleInputChange}
              />
              <label>Status</label>
              <select
                name="status"
                value={selectedAluno?.status || ''}
                onChange={handleInputChange}
              >
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
    </div>
  );
};

export default GerenciaAlunos;
