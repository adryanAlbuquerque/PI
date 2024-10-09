import { Link } from 'react-router-dom';
import './GerenciaDisciplina.css'; // Renomeie também o CSS se necessário
import { useState, useEffect } from 'react';
import { getDisciplina, updateDisciplina, deleteDisciplina } from '../../../Service/APIServices';
import SidebarCoord from '../../sidebar/sidebarCoord';

const GerenciaDisciplinas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDisciplina, setSelectedDisciplina] = useState(null);
  const [isEditable, setIsEditable] = useState(false); // Controla se os campos podem ser editados
  const [disciplinas, setDisciplinas] = useState([]);

  // Carrega disciplinas ao montar o componente
  useEffect(() => {
    getDisciplina()
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
    updateDisciplina(selectedDisciplina.id, selectedDisciplina)
      .then(response => {
        const updatedDisciplinas = disciplinas.map(disciplina =>
          disciplina.id === selectedDisciplina.id ? response.data : disciplina
        );
        setDisciplinas(updatedDisciplinas);
        setIsModalOpen(false);
        setIsEditable(false); // Desabilita a edição após salvar
        console.log('Disciplina atualizada:', response.data);
      })
      .catch(error => {
        console.error('Erro ao atualizar disciplina:', error);
      });
  };

  const handleDelete = () => {
    deleteDisciplina(selectedDisciplina.id)
      .then(() => {
        setDisciplinas(disciplinas.filter(disciplina => disciplina.id !== selectedDisciplina.id));
        setIsModalOpen(false);
        console.log('Disciplina excluída');
      })
      .catch(error => {
        console.error('Erro ao excluir disciplina:', error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleView = (disciplina) => {
    console.log('Disciplina selecionada para visualização:', disciplina);
    setSelectedDisciplina({ ...disciplina });
    setIsEditable(false); // Inicia o modal em modo não editável
    setIsModalOpen(true);
  };

  const enableEdit = (event) => {
    event.preventDefault(); // Previne o comportamento padrão de submissão
    setIsEditable(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDisciplina(null);
    setIsEditable(false); // Reseta o estado de edição ao fechar
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedDisciplina((prevDisciplina) => ({
      ...prevDisciplina,
      [name]: value,
    }));
  };

  const filteredDisciplinas = disciplinas.filter((disciplina) => {
    const nome = disciplina.nome ? disciplina.nome.toLowerCase() : '';
    return nome.includes(searchTerm.toLowerCase());
  });

  console.log('Disciplinas filtradas:', filteredDisciplinas);

  return (
    <div className="gerencia-disciplina">

      {/* Sidebar */}
      <SidebarCoord />

      {/* Main content */}
      <div className="RegistroDisciplina">
        <Link to="/CadastroGeral" id="Cadastro">
          CADASTRO
        </Link>
        <div className="search">
          <input
            type="text"
            placeholder="Pesquisar por nome"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        {/* Disciplinas table */}
        <table className="disciplinas-table">
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
                    <button onClick={() => handleView(disciplina)} className="view-button">Visualizar</button>
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

      {/* Modal for Viewing/Editing */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
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
              />
              <label>Descrição</label>
              <input
                type="text"
                name="descricao"
                value={selectedDisciplina?.descricao || ''}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
              <div className="modalbt">
                {!isEditable ? (
                  <button onClick={enableEdit} className="edicao">Editar</button>
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
    </div>
  );
};

export default GerenciaDisciplinas;
