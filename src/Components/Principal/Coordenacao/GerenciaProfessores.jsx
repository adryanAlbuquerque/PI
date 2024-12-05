import { Link } from 'react-router-dom';
import './GerenciaProfessores.css';
import { useState, useEffect } from 'react';
import { getProfessores, updateProfessor, deleteProfessor } from '../../../Service/APIServices';
import SidebarCoord from '../../sidebar/sidebarCoord';

const GerenciaProfessores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [professores, setProfessores] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [selectedDisciplinaIds, setSelectedDisciplinaIds] = useState([]);

  useEffect(() => {
    getProfessores()
      .then(response => {
        const filteredProfessores = response.data.filter(professor => professor.tipoUsuario === 'PROFESSOR');
        setProfessores(filteredProfessores);
      })
      .catch(error => {
        console.error('Erro ao buscar professores:', error);
      });

    // Disciplina fixa
    setDisciplinas([{ id: '1', nome: 'Matemática' }]);  // Disciplina fixa para exibição
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    const professorData = {
      ...selectedProfessor,
      disciplinas: selectedDisciplinaIds,
    };

    updateProfessor(selectedProfessor.id, professorData)
      .then(response => {
        const updatedDisciplinaNomes = disciplinas
          .filter(disc => selectedDisciplinaIds.includes(disc.id))
          .map(d => d.nome);

        const updatedProfessores = professores.map(professor =>
          professor.id === selectedProfessor.id
            ? { ...response.data, disciplinas: updatedDisciplinaNomes }
            : professor
        );

        setProfessores(updatedProfessores);
        setIsModalOpen(false);
        setIsEditable(false);
      })
      .catch(error => {
        console.error('Erro ao atualizar professor:', error);
      });
  };

  const handleDelete = () => {
    deleteProfessor(selectedProfessor.id)
      .then(() => {
        setProfessores(professores.filter(professor => professor.id !== selectedProfessor.id));
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error('Erro ao excluir professor:', error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleView = (professor) => {
    setSelectedProfessor({ ...professor });
    setSelectedDisciplinaIds(professor.disciplinas?.map(d => d.id) || []);
    setIsEditable(false);
    setIsModalOpen(true);
  };

  const enableEdit = (event) => {
    event.preventDefault();
    setIsEditable(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProfessor(null);
    setIsEditable(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedProfessor((prevProfessor) => ({
      ...prevProfessor,
      [name]: value,
    }));
  };

  const handleDisciplinaChange = (event) => {
    const selectedDisciplina = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedDisciplinaIds(selectedDisciplina);
  };

  const filteredProfessores = professores.filter((professor) => {
    const nome = professor.nome ? professor.nome.toLowerCase() : '';

    return nome.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="gerencia-professor">
      <SidebarCoord />
      <div className="TabelasProf">
        <Link to="/CadastroGeral" id="CadastrarProf">
          CADASTRO PROFESSOR
        </Link>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Pesquisar por nome"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <table className="professores-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Disciplina</th>
              <th>Turno</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filteredProfessores.length > 0 ? (
              filteredProfessores.map((professor) => (
                <tr key={professor.id}>
                  <td>{professor.matricula || professor.id}</td>
                  <td>{professor.nome}</td>
                  <td>{"Matemática"}</td> {/* Disciplina fixa */}
                  <td>{professor.turno}</td>
                  <td>{professor.status}</td>
                  <td>
                    <button onClick={() => handleView(professor)} className="view-button">Editar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-results">Nenhum professor encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Professor</h2>
            <form onSubmit={handleSave}>
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={selectedProfessor?.nome || ''}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />

              <label>Turno</label>
              <select
                name="turno"
                value={selectedProfessor?.turno || ''}
                onChange={handleInputChange}
                disabled={!isEditable}
              >
                <option value="">Selecione um turno</option>
                <option value="MANHA">Manhã</option>
                <option value="TARDE">Tarde</option>
              </select>

              <label>Status</label>
              <select
                name="status"
                value={selectedProfessor?.status || ''}
                onChange={handleInputChange}
                disabled={!isEditable}
              >
                <option value="ATIVO">Ativo</option>
                <option value="INATIVO">Inativo</option>
              </select>

              <label>Disciplinas</label>
              <select
                name="disciplina"
                value={selectedDisciplinaIds}
                onChange={handleDisciplinaChange}
                multiple
                disabled={!isEditable}
              >
                <option value="1">Matemática</option> {/* Disciplina fixa */}
              </select>

              <div className="modal-buttons">
                {isEditable ? (
                  <button type="submit" className="save-button">Salvar</button>
                ) : (
                  <button onClick={enableEdit} className="edit-button">Editar</button>
                )}
                <button type="button" onClick={handleModalClose} className="cancel-button">Cancelar</button>
                {isEditable && (
                  <button type="button" onClick={handleDelete} className="delete-button">
                    Excluir
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GerenciaProfessores;
