import { Link } from 'react-router-dom';
import './GerenciaDisciplina.css';
import { useState, useEffect } from 'react';
import { getDisciplina, updateDisciplina, deleteDisciplina, createDisciplina } from '../../../Service/APIServices';
import SidebarCoord from '../../sidebar/sidebarCoord';

const GerenciaDisciplinas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const [selectedDisciplina, setSelectedDisciplina] = useState(null);
  const [newDisciplina, setNewDisciplina] = useState({ nome: '', descricao: '' });
  const [isEditable, setIsEditable] = useState(false);
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  const fetchDisciplinas = async () => {
    try {
      const response = await getDisciplina();
      console.log('Disciplinas recebidas:', response.data);
      setDisciplinas(response.data);
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!selectedDisciplina.nome || !selectedDisciplina.descricao) {
      console.error('Os campos nome e descrição são obrigatórios');
      return;
    }

    try {
      const response = await updateDisciplina(selectedDisciplina.id, selectedDisciplina);
      const updatedDisciplinas = disciplinas.map(disciplina =>
        disciplina.id === selectedDisciplina.id ? response.data : disciplina
      );
      setDisciplinas(updatedDisciplinas);
      setIsModalOpen(false);
      setIsEditable(false);
      console.log('Disciplina atualizada:', response.data);
    } catch (error) {
      console.error('Erro ao atualizar disciplina:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDisciplina(selectedDisciplina.id);
      setDisciplinas(disciplinas.filter(disciplina => disciplina.id !== selectedDisciplina.id));
      setIsModalOpen(false);
      console.log('Disciplina excluída');
    } catch (error) {
      console.error('Erro ao excluir disciplina:', error);
    }
  };

  const handleAddDisciplina = async (event) => {
    event.preventDefault();
    
    if (!newDisciplina.nome || !newDisciplina.descricao) {
      console.error('Os campos nome e descrição são obrigatórios para a nova disciplina.');
      return;
    }

    try {
      const response = await createDisciplina(newDisciplina);
      setDisciplinas([...disciplinas, response.data]);
      setIsAddModalOpen(false);
      setNewDisciplina({ nome: '', descricao: '' });
      console.log('Nova disciplina adicionada:', response.data);
    } catch (error) {
      console.error('Erro ao adicionar disciplina:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleView = (disciplina) => {
    setSelectedDisciplina({ ...disciplina });
    setIsEditable(false);
    setIsModalOpen(true);
  };

  const enableEdit = (event) => {
    event.preventDefault();
    setIsEditable(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDisciplina(null);
    setIsEditable(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedDisciplina((prevDisciplina) => ({
      ...prevDisciplina,
      [name]: value,
    }));
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    setNewDisciplina({ nome: '', descricao: '' });
  };

  const handleNewInputChange = (event) => {
    const { name, value } = event.target;
    setNewDisciplina((prevDisciplina) => ({
      ...prevDisciplina,
      [name]: value,
    }));
  };

  const filteredDisciplinas = disciplinas.filter((disciplina) => {
    const nome = disciplina.nome ? disciplina.nome.toLowerCase() : '';
    return nome.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="gerencia-disciplina">
      <SidebarCoord />

      <div className="RegistroDisciplina">
        <button onClick={() => setIsAddModalOpen(true)} id="AddDisciplina">
          ADICIONAR DISCIPLINA
        </button>
        <div className="pesquisa">
          <input
            type="text"
            placeholder="Pesquisar por nome"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <table className="disciplinas">
          <thead>
            <tr>
              <th>ID</th>
              <th>Matéria</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredDisciplinas.length > 0 ? (
              filteredDisciplinas.map((disciplina) => (
                <tr key={disciplina.id}>
                  <td>{disciplina.id}</td>
                  <td>{disciplina.nome}</td>
                  <td>{disciplina.descricao}</td>
                  <td>
                    <button onClick={() => handleView(disciplina)} className="visualizar">Visualizar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-results">Nenhuma disciplina encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="caixa-overlay">
          <div className="caixa-content">
            <h2>Visualizar Disciplina</h2>
            <form onSubmit={handleSave}>
              <label>ID</label>
              <input
                type="text"
                name="id"
                value={selectedDisciplina?.id || ''}
                onChange={handleInputChange}
                readOnly
              />
              <label>Matéria</label>
              <input
                type="text"
                name="nome"
                value={selectedDisciplina?.nome || ''}
                onChange={handleInputChange}
                readOnly={!isEditable}
                required
              />
              <label>Descrição</label>
              <input
                type="text"
                name="descricao"
                value={selectedDisciplina?.descricao || ''}
                onChange={handleInputChange}
                readOnly={!isEditable}
                required
              />
              <div className="botoes">
                {!isEditable ? (
                  <button onClick={enableEdit} className="mudar">Editar</button>
                ) : (
                  <button type="submit" className="salvar">Salvar</button>
                )}
                <button onClick={handleModalClose} className="fechar">Fechar</button>
                <button onClick={handleDelete} className="delete">Excluir</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Adicionar Nova Disciplina</h2>
            <form onSubmit={handleAddDisciplina}>
              <label>Matéria</label>
              <input
                type="text"
                name="nome"
                value={newDisciplina.nome}
                onChange={handleNewInputChange}
                required
              />
              <label>Descrição</label>
              <input
                type="text"
                name="descricao"
                value={newDisciplina.descricao}
                onChange={handleNewInputChange}
                required
              />
              <div className="modalbt">
                <button type="submit" className="salvar">Adicionar</button>
                <button onClick={handleAddModalClose} className="fechar">Fechar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GerenciaDisciplinas;
