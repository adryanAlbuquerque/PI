import { Link } from 'react-router-dom';
import './GerenciaProfessores.css'; // Renomeie também o CSS se necessário
import { useState, useEffect } from 'react';
import { getProfessores, updateProfessor, deleteProfessor } from '../../../Service/APIServices';
import SidebarCoord from '../../sidebar/sidebarCoord';

const GerenciaProfessores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroTurma, setFiltroTurma] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    getProfessores() // Atualize para a função correta para obter professores
      .then(response => {
        console.log('Professores recebidos:', response.data);
        setProfessores(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar professores:', error);
      });
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    updateProfessor(selectedProfessor.id, selectedProfessor) // Atualize para a função correta
      .then(response => {
        const updatedProfessores = professores.map(professor =>
          professor.id === selectedProfessor.id ? response.data : professor
        );
        setProfessores(updatedProfessores);
        setIsModalOpen(false);
        console.log('Professor atualizado:', response.data);
      })
      .catch(error => {
        console.error('Erro ao atualizar professor:', error);
      });
  };

  const handleDelete = (id) => {
    deleteProfessor(id) // Atualize para a função correta
      .then(() => {
        setProfessores(professores.filter(professor => professor.id !== id));
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

  const handleEdit = (professor) => {
    console.log('Professor selecionado para edição:', professor);
    setSelectedProfessor({ ...professor });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProfessor(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedProfessor((prevProfessor) => ({
      ...prevProfessor,
      [name]: value,
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

  console.log('Professores filtrados:', filteredProfessores);

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
              <th>Matrícula</th>
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
                    <button onClick={() => handleEdit(professor)} className="edit-button">Editar</button>
                    <button onClick={() => handleDelete(professor.id)} className="delete-button">Excluir</button>
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

      {/* Modal for Editing */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Professor</h2>
            <form onSubmit={handleSave}>
              <label>Matrícula</label>
              <input
                type="text"
                name="matricula"
                value={selectedProfessor?.matricula || selectedProfessor?.id || ''}
                onChange={handleInputChange}
                readOnly // Se desejar que o ID não seja editável
              />
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={selectedProfessor?.nome || ''}
                onChange={handleInputChange}
              />
              <label>Turma</label>
              <input
                type="text"
                name="turma"
                value={selectedProfessor?.turma || ''}
                onChange={handleInputChange}
              />
              <label>Turno</label>
              <input
                type="text"
                name="turno"
                value={selectedProfessor?.turno || ''}
                onChange={handleInputChange}
              />
              <label>Status</label>
              <select
                name="status"
                value={selectedProfessor?.status || ''}
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

export default GerenciaProfessores;
