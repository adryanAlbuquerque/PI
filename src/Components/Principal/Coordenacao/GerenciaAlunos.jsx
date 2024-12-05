import { Link } from 'react-router-dom';
import './GerenciaAlunos.css';
import { useState, useEffect } from 'react';
import { getAlunos, updateAluno, deleteAluno, getTurmas } from '../../../Service/APIServices';
import SidebarCoord from '../../sidebar/sidebarCoord';

const GerenciaAlunos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroTurma, setFiltroTurma] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    getAlunos()
      .then(response => {
        const filteredAlunos = response.data.filter(aluno => aluno.tipoUsuario === 'ALUNO');
        setAlunos(filteredAlunos);
      })
      .catch(error => console.error('Erro ao buscar alunos:', error));

    getTurmas()
      .then(response => setTurmas(response.data))
      .catch(error => console.error('Erro ao buscar turmas:', error));
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    if (!selectedAluno) return;

    // Atualiza o aluno com os novos dados de status e turno
    updateAluno(selectedAluno.id, selectedAluno)
      .then(response => {
        const updatedAlunos = alunos.map(aluno =>
          aluno.id === selectedAluno.id ? response.data : aluno
        );
        setAlunos(updatedAlunos);
        setIsModalOpen(false);
      })
      .catch(error => console.error('Erro ao atualizar aluno:', error));
  };

  const handleDelete = (id) => {
    deleteAluno(id)
      .then(() => setAlunos(alunos.filter(aluno => aluno.id !== id)))
      .catch(error => console.error('Erro ao excluir aluno:', error));
  };

  const handleSearch = (event) => setSearchTerm(event.target.value);
  const handleFiltroTurma = (event) => setFiltroTurma(event.target.value);

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

  const filteredAlunos = alunos.filter((aluno) => {
    const nome = aluno.nome ? aluno.nome.toLowerCase() : '';

    return (
      (nome.includes(searchTerm.toLowerCase())) &&
      (filtroTurma === '' || aluno.turma === filtroTurma)
    );
  });

  return (
    <div className="gerencia-aluno">
      <SidebarCoord />
      <div id="DashboardAluno">
        <Link to="/CadastroGeral" id="Cadastrar">CADASTRO ALUNO</Link>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Pesquisar por nome"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <select value={filtroTurma} onChange={handleFiltroTurma} className="filter-select">
            <option value="">Filtrar por turma</option>
            {turmas.map((turma) => (
              <option key={turma.id} value={turma.nome}>{turma.nome}</option>
            ))}
          </select>
        </div>
        <table className="alunos-tables">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Turma</th>
              <th>Turno</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlunos.length > 0 ? (
              filteredAlunos.map((aluno) => (
                <tr key={aluno.id}>
                  <td>{aluno.nome}</td>
                  <td>{"Turma A"}</td> {/* Turma estática */}
                  <td>{aluno.turno}</td>
                  <td>{aluno.status}</td>
                  <td>
                    <button onClick={() => handleEdit(aluno)} className="edit-button">Editar</button>
                    <button onClick={() => handleDelete(aluno.id)} className="delete-button">Excluir</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-results">Nenhum aluno encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Aluno</h2>
            <form onSubmit={handleSave}>
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={selectedAluno?.nome || ''}
                onChange={handleInputChange}
              />
              <label>Turma</label>
              <select
                name="turma"
                value={selectedAluno?.turma || ''}
                onChange={handleInputChange}
              >
                {turmas.map((turma) => (
                  <option key={turma.id} value={turma.nome}>{turma.nome}</option>
                ))}
              </select>
              <label>Turno</label>
              <select
                name="turno"
                value={selectedAluno?.turno || ''}
                onChange={handleInputChange}
              >
                <option value="">Selecione o turno</option>
                <option value="MANHA">Manhã</option>
                <option value="TARDE">Tarde</option>
              </select>
              <label>Status</label>
              <select
                name="status"
                value={selectedAluno?.status || ''}
                onChange={handleInputChange}
              >
                <option value="">Selecione o status</option>
                <option value="ATIVO">Ativo</option>
                <option value="INATIVO">Inativo</option>
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

export default GerenciaAlunos