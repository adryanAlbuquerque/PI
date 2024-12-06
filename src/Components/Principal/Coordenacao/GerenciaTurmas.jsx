import { Link } from 'react-router-dom';
import './GerenciaTurmas.css';
import { useState, useEffect } from 'react';
import { getTurmas, updateTurma, deleteTurma, createTurma } from '../../../Service/APIServices';
import SidebarCoord from '../../sidebar/sidebarCoord';

const GerenciaTurmas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); 
  const [selectedTurma, setSelectedTurma] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
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
  
    const turmaData = {
      ...selectedTurma,
    };
  
    updateTurma(selectedTurma.id, turmaData)
      .then(response => {
        const updatedTurmas = turmas.map(turma =>
          turma.id === selectedTurma.id ? response.data : turma
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
    deleteTurma(selectedTurma.id)
      .then(() => {
        setTurmas(turmas.filter(turma => turma.id !== selectedTurma.id));
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
    setSelectedTurma({}); 
    setIsEditable(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedTurma((prevTurma) => ({
      ...prevTurma,
      [name]: value,
    }));
  };

  const handleCreateTurma = (event) => {
    event.preventDefault();
    const newTurma = {
      nome: selectedTurma.nome,
      ano: selectedTurma.ano,
      semestre: selectedTurma.semestre,
    };

    createTurma(newTurma)
      .then(response => {
        setTurmas([...turmas, response.data]);
        setIsCreateModalOpen(false);
        console.log('Turma criada:', response.data);
      })
      .catch(error => {
        console.error('Erro ao criar turma:', error);
      });
  };

  const filteredTurmas = turmas.filter((turma) => {
    return turma.nome.toLowerCase().includes(searchTerm.toLowerCase());
  });

  console.log('Turmas filtradas:', filteredTurmas);

  return (
    <div className="gerencia-turma">
      <SidebarCoord />

      <div className="TabelasTurm">
        <button onClick={() => setIsCreateModalOpen(true)} id="CadastrarTurma">
          CRIAR TURMA
        </button>
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
                <tr key={turma.id}>
                  <td>{turma.id}</td>
                  <td>{turma.nome}</td>
                  <td>{turma.ano}</td>
                  <td>{turma.semestre}</td>
                  <td>
                    <button onClick={() => handleView(turma)} className="view-button">Editar</button>
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

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isEditable ? 'Editar Turma' : 'Visualizar Turma'}</h2>
            <form onSubmit={handleSave}>
              <label>ID</label>
              <input
                type="text"
                name="id"
                value={selectedTurma.id || ''}
                readOnly
              />
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={selectedTurma.nome || ''}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
              <label>Ano</label>
              <input
                type="text"
                name="ano"
                value={selectedTurma.ano || ''}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
              <label>Semestre</label>
              <input
                type="text"
                name="semestre"
                value={selectedTurma.semestre || ''}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
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

      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Criar Turma</h2>
            <form onSubmit={handleCreateTurma}>
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={selectedTurma.nome || ''}
                onChange={handleInputChange}
              />
              <label>Ano</label>
              <input
                type="text"
                name="ano"
                value={selectedTurma.ano || ''}
                onChange={handleInputChange}
              />
              <label>Semestre</label>
              <input
                type="text"
                name="semestre"
                value={selectedTurma.semestre || ''}
                onChange={handleInputChange}
              />
              <div className="modal-buttons">
                <button type="submit" className="save-button">Criar</button>
                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="cancelar-button">Fechar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GerenciaTurmas;
