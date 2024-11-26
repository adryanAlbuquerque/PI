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
    // Fetching students
    getAlunos()
      .then(response => {
        console.log('Alunos recebidos:', response.data);
        const filteredAlunos = response.data.filter(aluno => aluno.tipoUsuario === 'ALUNO');
        setAlunos(filteredAlunos);
      })
      .catch(error => {
        console.error('Erro ao buscar alunos:', error);
      });

    // Fetching turmas dynamically
    getTurmas()
      .then(response => {
        console.log('Turmas recebidas:', response.data);
        setTurmas(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar turmas:', error);
      });
  }, []);

  const handleSave = (event) => {
    event.preventDefault();

    if (!selectedAluno) return;

    // Atualizar aluno na API
    updateAluno(selectedAluno.id, selectedAluno)
      .then(response => {
        // Atualizando a lista de alunos na tabela
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
    console.log('Aluno selecionado para edição:', aluno);
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
    const matricula = aluno.matricula ? aluno.matricula : '';

    return (
      (nome.includes(searchTerm.toLowerCase()) || matricula.includes(searchTerm)) &&
      (filtroTurma === '' || aluno.turma === filtroTurma)
    );
  });

  console.log('Alunos filtrados:', filteredAlunos);

  return (
    <div className="gerencia-aluno">

      {/* Sidebar */}
      <SidebarCoord />

      {/* Main content */}
      <div id="DashboardAluno">
        <Link to="/CadastroGeral" id="Cadastrar">
          CADASTRO ALUNO
        </Link>
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
            {filteredAlunos.length > 0 ? (
              filteredAlunos.map((aluno) => (
                <tr key={aluno.id}>
                  <td>{aluno.matricula || aluno.id}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.turma}</td>
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
                <td colSpan="6" className="no-results">Nenhum aluno encontrado.</td>
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
              <label>Matrícula</label>
              <input
                type="text"
                name="matricula"
                value={selectedAluno?.matricula || selectedAluno?.id || ''}
                readOnly
              />
              
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
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
              </select>

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
