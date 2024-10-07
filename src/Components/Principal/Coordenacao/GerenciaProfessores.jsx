import { Link } from 'react-router-dom';
import './GerenciaProfessores.css'; // Renomeie também o CSS se necessário
import { useState, useEffect } from 'react';
import { getProfessores, getDisciplina, updateProfessor, deleteProfessor } from '../../../Service/APIServices';
import SidebarCoord from '../../sidebar/sidebarCoord';

const GerenciaProfessores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroTurma, setFiltroTurma] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [isEditable, setIsEditable] = useState(false); // Controla se os campos podem ser editados
  const [professores, setProfessores] = useState([]);
  const [disciplinas, setDisciplina] = useState([]);

  useEffect(() => {
    getProfessores()
      .then(response => {
        console.log('Professores recebidos:', response.data);
        setProfessores(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar professores:', error);
      });

    getDisciplina()
      .then(response => {
        console.log('Disciplinas recebidas:', response.data);
        setDisciplina(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar disciplinas:', error);
      });
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    updateProfessor(selectedProfessor.id, selectedProfessor)
      .then(response => {
        const updatedProfessores = professores.map(professor =>
          professor.id === selectedProfessor.id ? response.data : professor
        );
        setProfessores(updatedProfessores);
        setIsModalOpen(false);
        setIsEditable(false); // Desabilita a edição após salvar
        console.log('Professor atualizado:', response.data);
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
        console.log('Professor excluído');
      })
      .catch(error => {
        console.error('Erro ao excluir professor:', error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFiltroTurma = (event) => {
    setFiltroTurma(event.target.value);
  };

  const handleView = (professor) => {
    console.log('Professor selecionado para visualização:', professor);
    setSelectedProfessor({ ...professor });
    setIsEditable(false); // Inicia o modal em modo não editável
    setIsModalOpen(true);
  };

  const enableEdit = (event) => {
    event.preventDefault(); // Previne o comportamento padrão de submissão
    setIsEditable(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProfessor(null);
    setIsEditable(false); // Reseta o estado de edição ao fechar
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedProfessor((prevProfessor) => ({
      ...prevProfessor,
      [name]: value,
    }));
  };

  const handleDisciplinasChange = (event) => {
    const selectedOptions = [...event.target.options].filter(option => option.selected).map(option => option.value);
    setSelectedProfessor((prevProfessor) => ({
      ...prevProfessor,
      disciplinas: selectedOptions,
    }));
  };

  const filteredProfessores = professores.filter((professor) => {
    const nome = professor.nome ? professor.nome.toLowerCase() : '';
    const matricula = professor.matricula ? professor.matricula : '';

    return (
      (nome.includes(searchTerm.toLowerCase()) || matricula.includes(searchTerm)) &&
      (filtroTurma === '' || professor.turma === filtroTurma)
    );
  });

  return (
    <div className="gerencia-professor">

      {/* Sidebar */}
      <SidebarCoord />

      {/* Main content */}
      <div className="TabelasProf">
        <Link to="/CadastroGeral" id="Cadastrar">
          CADASTRO
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
            <option value="Turma A">Turma A</option>
            <option value="Turma B">Turma B</option>
          </select>
        </div>

        {/* Professores table */}
        <table className="professores-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Turma</th>
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
                  <td>{professor.turma}</td>
                  <td>{professor.turno}</td>
                  <td>{professor.status}</td>
                  <td>
                    <button onClick={() => handleView(professor)} className="view-button">Visualizar</button>
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

      {/* Modal for Viewing/Editing */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isEditable ? 'Editar Professor' : 'Visualizar Professor'}</h2>
            <form onSubmit={handleSave}>
              <label>Matrícula</label>
              <input
                type="text"
                name="matricula"
                value={selectedProfessor?.matricula || selectedProfessor?.id || ''}
                onChange={handleInputChange}
                readOnly
              />
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={selectedProfessor?.nome || ''}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
              <label>Turma</label>
              <input
                type="text"
                name="turma"
                value={selectedProfessor?.turma || ''}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
              <label>Turno</label>
              <input
                type="text"
                name="turno"
                value={selectedProfessor?.turno || ''}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
              <label>Status</label>
              <select
                name="status"
                value={selectedProfessor?.status || ''}
                onChange={handleInputChange}
                disabled={!isEditable}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>

              {/* Campo de disciplinas */}
              <label>Disciplinas</label>
              <select
                name="disciplinas"
                value={selectedProfessor?.disciplinas || []}
                onChange={handleDisciplinasChange}
                multiple
                disabled={!isEditable}
              >
                {disciplinas.map((disciplina) => (
                  <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
                ))}
              </select>

              <div className="modal-buttons">
                {isEditable ? (
                  <button type="submit" className="save-button">Salvar</button>
                ) : (
                  <button type="button" onClick={enableEdit} className="edit-button">Editar</button>
                )}
                <button type="button" onClick={handleDelete} className="apagar-button">Excluir</button>
                <button type="button" onClick={handleModalClose} className="cancel-button">Fechar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GerenciaProfessores;
