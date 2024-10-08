import { Link } from 'react-router-dom';
import './GerenciaCoordenador.css'; // Renomeie também o CSS se necessário
import { useState, useEffect } from 'react';
import { getCoordenadores, updateCoordenador, deleteCoordenador, getDisciplina } from '../../../Service/APIServices';
import SidebarCoord from '../../sidebar/sidebarCoord';

const GerenciaCoordenadores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroTurma, setFiltroTurma] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoordenador, setSelectedCoordenador] = useState(null);
  const [isEditable, setIsEditable] = useState(false); // Controla se os campos podem ser editados
  const [coordenadores, setCoordenadores] = useState([]);
  const [disciplina, setDisciplina] = useState([]); // Estado para armazenar disciplinas

  // Carrega coordenadores e disciplinas ao montar o componente
  useEffect(() => {
    getCoordenadores()
      .then(response => {
        console.log('Coordenadores recebidos:', response.data);
        // Filtra apenas os usuários que são coordenadores
        const filteredCoordenadores = response.data.filter(coordenador => coordenador.tipoUsuario === 'COORDENADOR');
        setCoordenadores(filteredCoordenadores);
      })
      .catch(error => {
        console.error('Erro ao buscar coordenadores:', error);
      });

    // Busca disciplinas para exibição e associação
    getDisciplina()
      .then(response => {
        console.log('Disciplinas recebidas:', response.data);
        setDisciplina(response.data); // Armazena disciplinas
      })
      .catch(error => {
        console.error('Erro ao buscar disciplinas:', error);
      });
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    const coordenadorData = {
      ...selectedCoordenador,
      disciplina: selectedCoordenador.disciplina, // Associa disciplinas selecionadas
    };
    updateCoordenador(selectedCoordenador.id, coordenadorData)
      .then(response => {
        const updatedCoordenadores = coordenadores.map(coordenador =>
          coordenador.id === selectedCoordenador.id ? response.data : coordenador
        );
        setCoordenadores(updatedCoordenadores);
        setIsModalOpen(false);
        setIsEditable(false); // Desabilita a edição após salvar
        console.log('Coordenador atualizado:', response.data);
      })
      .catch(error => {
        console.error('Erro ao atualizar coordenador:', error);
      });
  };

  const handleDelete = () => {
    deleteCoordenador(selectedCoordenador.id)
      .then(() => {
        setCoordenadores(coordenadores.filter(coordenador => coordenador.id !== selectedCoordenador.id));
        setIsModalOpen(false);
        console.log('Coordenador excluído');
      })
      .catch(error => {
        console.error('Erro ao excluir coordenador:', error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFiltroTurma = (event) => {
    setFiltroTurma(event.target.value);
  };

  const handleView = (coordenador) => {
    console.log('Coordenador selecionado para visualização:', coordenador);
    setSelectedCoordenador({ ...coordenador });
    setIsEditable(false); // Inicia o modal em modo não editável
    setIsModalOpen(true);
  };

  const enableEdit = (event) => {
    event.preventDefault(); // Previne o comportamento padrão de submissão
    setIsEditable(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCoordenador(null);
    setIsEditable(false); // Reseta o estado de edição ao fechar
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedCoordenador((prevCoordenador) => ({
      ...prevCoordenador,
      [name]: value,
    }));
  };

  // Função para lidar com a seleção de disciplinas
  const handleDisciplinaChange = (event) => {
    const selectedDisciplina = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedCoordenador((prevCoordenador) => ({
      ...prevCoordenador,
      disciplina: selectedDisciplina,
    }));
  };

  const filteredCoordenadores = coordenadores.filter((coordenador) => {
    const nome = coordenador.nome ? coordenador.nome.toLowerCase() : '';
    const matricula = coordenador.matricula ? coordenador.matricula : '';

    return (
      (nome.includes(searchTerm.toLowerCase()) || matricula.includes(searchTerm)) &&
      (filtroTurma === '' || coordenador.turma === filtroTurma)
    );
  });

  console.log('Coordenadores filtrados:', filteredCoordenadores);

  return (
    <div className="gerencia-coordenador">

      {/* Sidebar */}
      <SidebarCoord />

      {/* Main content */}
      <div className="RegistroCoord">
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
          <select value={filtroTurma} onChange={handleFiltroTurma} className="filter-select">
            <option value="">Filtrar por turma</option>
            <option value="Turma A">Turma A</option>
            <option value="Turma B">Turma B</option>
          </select>
        </div>

        {/* Coordenadores table */}
        <table className="coordenadores-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Área</th>
              <th>Nível</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoordenadores.length > 0 ? (
              filteredCoordenadores.map((coordenador) => (
                <tr key={coordenador.id}>
                  <td>{coordenador.matricula || coordenador.id}</td>
                  <td>{coordenador.nome}</td>
                  <td>{coordenador.turma}</td>
                  <td>{coordenador.turno}</td>
                  <td>{coordenador.status}</td>
                  <td>
                    <button onClick={() => handleView(coordenador)} className="view-button">Visualizar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-results">Nenhum coordenador encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Viewing/Editing */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Visualizar Coordenador</h2>
            <form onSubmit={handleSave}>
              <label>ID</label>
              <input
                type="text"
                name="matricula"
                value={selectedCoordenador?.matricula || selectedCoordenador?.id || ''}
                onChange={handleInputChange}
                readOnly
              />
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={selectedCoordenador?.nome || ''}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
              <label>Área</label>
              <input
                type="text"
                name="area"
                value={selectedCoordenador?.area || ''}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
              <label>Nível</label>
              <input
                type="text"
                name="nivel"
                value={selectedCoordenador?.nivel || ''}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
              <label>Status</label>
              <select
                name="status"
                value={selectedCoordenador?.status || ''}
                onChange={handleInputChange}
                disabled={!isEditable}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
              <label>Disciplinas</label>
              <select
                name="disciplina"
                value={selectedCoordenador?.disciplina || []}
                onChange={handleDisciplinaChange}
                multiple
                disabled={!isEditable}
              >
                {disciplina.map(disciplina => (
                  <option key={disciplina.disciplina_id} value={disciplina.disciplina_id}>
                    {disciplina.nome}
                  </option>
                ))}
              </select>
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

export default GerenciaCoordenadores;
