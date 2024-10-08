import { Link } from 'react-router-dom';
import './GerenciaTurmas.css';
import { useState, useEffect } from 'react';
import { getTurmas, updateTurma, deleteTurma, getDisciplinas } from '../../../Service/APIServices';
import SidebarCoord from '../../sidebar/sidebarCoord';

const GerenciaTurmas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [turmas, setTurmas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);

  // Carrega turmas e disciplinas ao montar o componente
  useEffect(() => {
    getTurmas()
      .then(response => {
        console.log('Turmas recebidas:', response.data);
        setTurmas(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar turmas:', error);
      });

    // Busca disciplinas para exibição e associação
    getDisciplinas()
      .then(response => {
        console.log('Disciplinas recebidas:', response.data);
        setDisciplinas(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar disciplinas:', error);
      });
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    const turmaData = {
      ...selectedTurma,
      disciplinas: selectedTurma.disciplinas,
    };
    updateTurma(selectedTurma.turma_id, turmaData)
      .then(response => {
        const updatedTurmas = turmas.map(turma =>
          turma.turma_id === selectedTurma.turma_id ? response.data : turma
        );
        setTurmas(updatedTurmas);
        setIsModalOpen(false);
        setIsEditable(false);
        console.log('Turma atualizada:', response.data);
      })
      .catch(error => {
        console.error('Erro ao atualizar turma:', error);
      });
  };

  const handleDelete = () => {
    deleteTurma(selectedTurma.turma_id)
      .then(() => {
        setTurmas(turmas.filter(turma => turma.turma_id !== selectedTurma.turma_id));
        setIsModalOpen(false);
        console.log('Turma excluída');
      })
      .catch(error => {
        console.error('Erro ao excluir turma:', error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleView = (turma) => {
    console.log('Turma selecionada para visualização:', turma);
    setSelectedTurma({ ...turma });
    setIsEditable(false);
    setIsModalOpen(true);
  };

  const enableEdit = (event) => {
    event.preventDefault();
    setIsEditable(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTurma(null);
    setIsEditable(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedTurma((prevTurma) => ({
      ...prevTurma,
      [name]: value,
    }));
  };

  const handleDisciplinaChange = (event) => {
    const selectedDisciplina = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedTurma((prevTurma) => ({
      ...prevTurma,
      disciplinas: selectedDisciplina,
    }));
  };

  const filteredTurmas = turmas.filter((turma) => {
    return turma.nome.toLowerCase().includes(searchTerm.toLowerCase());
  });

  console.log('Turmas filtradas:', filteredTurmas);

  return (
    <div className="gerencia-turma">
      <SidebarCoord />

      <div className="TabelasTurm">
        <Link to="/CadastroGeral" id="CadastrarTurma">
          CADASTRO
        </Link>
        <input
          type="text"
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />

        <table className="turmas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ano</th>
              <th>Semestre</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredTurmas.length > 0 ? (
              filteredTurmas.map((turma) => (
                <tr key={turma.turma_id}>
                  <td>{turma.turma_id}</td>
                  <td>{turma.nome}</td>
                  <td>{turma.ano}</td>
                  <td>{turma.semestre}</td>
                  <td>
                    <button onClick={() => handleView(turma)} className="view-button">Visualizar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-results">Nenhuma turma encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Viewing/Editing */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Visualizar Turma</h2>
            <form onSubmit={handleSave}>
              <label>ID</label>
              <input
                type="text"
                name="turma_id"
                value={selectedTurma?.turma_id || ''}
                readOnly
              />
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={selectedTurma?.nome || ''}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
              <label>Ano</label>
              <input
                type="text"
                name="ano"
                value={selectedTurma?.ano || ''}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
              <label>Semestre</label>
              <input
                type="text"
                name="semestre"
                value={selectedTurma?.semestre || ''}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
              <label>Disciplinas</label>
              <select
                name="disciplinas"
                value={selectedTurma?.disciplinas || []}
                onChange={handleDisciplinaChange}
                multiple
                disabled={!isEditable}
              >
                {disciplinas.map(disciplina => (
                  <option key={disciplina.disciplina_id} value={disciplina.disciplina_id}>
                    {disciplina.nome}
                  </option>
                ))}
              </select>
              <div className="modal-buttons">
                {isEditable ? (
                  <button type="submit" className="save-button">Salvar</button>
                ) : (
                  <button type="button" onClick={enableEdit} className="edit-button">Editar</button>
                )}
                <button type="button" onClick={handleDelete} className="delete-button">Excluir</button>
                <button type="button" onClick={handleModalClose} className="cancelar-button">Fechar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GerenciaTurmas;
