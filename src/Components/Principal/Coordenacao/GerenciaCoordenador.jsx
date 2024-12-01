import { Link } from 'react-router-dom';
import './GerenciaCoordenador.css'; 
import { useState, useEffect } from 'react';
import { getCoordenadores, updateCoordenador, deleteCoordenador } from '../../../Service/APIServices';
import SidebarCoord from '../../sidebar/sidebarCoord';

const GerenciaCoordenadores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoordenador, setSelectedCoordenador] = useState(null);
  const [isEditable, setIsEditable] = useState(false); 
  const [coordenadores, setCoordenadores] = useState([]);

  useEffect(() => {
    getCoordenadores()
      .then(response => {
        console.log('Coordenadores recebidos:', response.data);
        const filteredCoordenadores = response.data.filter(coordenador => coordenador.tipoUsuario === 'COORDENADOR');
        setCoordenadores(filteredCoordenadores);
      })
      .catch(error => {
        console.error('Erro ao buscar coordenadores:', error);
      });
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    const coordenadorData = {
      ...selectedCoordenador,
    };

    updateCoordenador(selectedCoordenador.id, coordenadorData)
      .then(response => {
        const updatedCoordenadores = coordenadores.map(coordenador =>
          coordenador.id === selectedCoordenador.id ? response.data : coordenador
        );
        setCoordenadores(updatedCoordenadores);
        setIsModalOpen(false);
        setIsEditable(false);
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

  const handleView = (coordenador) => {
    setSelectedCoordenador({ ...coordenador });
    setIsEditable(false); 
    setIsModalOpen(true);
  };

  const enableEdit = (event) => {
    event.preventDefault(); 
    setIsEditable(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCoordenador(null);
    setIsEditable(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    const updatedValue = name === "status" ? value.toUpperCase() : value;

    setSelectedCoordenador((prevCoordenador) => ({
      ...prevCoordenador,
      [name]: updatedValue,
    }));
  };

  const filteredCoordenadores = coordenadores.filter((coordenador) => {
    const nome = coordenador.nome ? coordenador.nome.toLowerCase() : '';
    return nome.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="gerencia-coordenador">

      <SidebarCoord />

      <div className="RegistroCoord">
        <Link to="/CadastroGeral" id="Cadastro">
          CADASTRO COORDENADOR
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

        <table className="coordenadores-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
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
                  <td>{coordenador.status}</td>
                  <td>
                    <button onClick={() => handleView(coordenador)} className="view-button">Editar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-results">Nenhum coordenador encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Coordenador</h2>
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
              <label>Status</label>
              <select
                name="status"
                value={selectedCoordenador?.status || ''}
                onChange={handleInputChange}
                disabled={!isEditable}
              >
                <option value="ATIVO">Ativo</option>
                <option value="INATIVO">Inativo</option>
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
