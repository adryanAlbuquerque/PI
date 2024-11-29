import { useState, useEffect } from 'react';
import './CoordHome.css';
import SidebarCoord from '../sidebar/sidebarCoord';
import { createComunicado, getComunicados, updateComunicado, deleteComunicado } from '../../Service/APIServices';

const CoordHome = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [selectedComunicado, setSelectedComunicado] = useState(null);
  const [fileName, setFileName] = useState('Nenhum arquivo selecionado');
  const [formData, setFormData] = useState({
    descricao: '',
    arquivo: null,
  });
  const [comunicados, setComunicados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComunicados = async () => {
      setLoading(true);
      try {
        const response = await getComunicados();
        setComunicados(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Erro ao buscar comunicados:', error);
        setComunicados([]);
      } finally {
        setLoading(false);
      }
    };
    fetchComunicados();
  }, []);

  const handleModalOpen = (comunicado = null) => {
    if (comunicado) {
      setEditMode(true);
      setSelectedComunicado(comunicado);
      setFormData({
        descricao: comunicado.conteudo,
        arquivo: null,
      });
    } else {
      setEditMode(false);
      setSelectedComunicado(null);
      setFormData({ descricao: '', arquivo: null });
    }
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setFileName('Nenhum arquivo selecionado');
    setSelectedComunicado(null);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileName(selectedFile ? selectedFile.name : 'Nenhum arquivo selecionado');
    setFormData({ ...formData, arquivo: selectedFile });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      const comunicadoData = {
        titulo: formData.descricao.substring(0, 50),
        conteudo: formData.descricao,
        autorId: 1, // ID do autor (usuário logado, neste caso, o coordenador)
        destinatariosIds: [], // Lista vazia para indicar que o comunicado é para todos
        arquivo: formData.arquivo,
      };

      let response;
      if (isEditMode && selectedComunicado) {
        response = await updateComunicado(selectedComunicado.id, comunicadoData);
      } else {
        response = await createComunicado(comunicadoData);
      }

      if (response.status === 200 || response.status === 201) {
        setComunicados((prevComunicados) => {
          if (isEditMode) {
            return prevComunicados.map((comunicado) =>
              comunicado.id === selectedComunicado.id ? response.data : comunicado
            );
          } else {
            return [...prevComunicados, response.data];
          }
        });
        handleModalClose();
        alert(isEditMode ? 'Comunicado atualizado com sucesso!' : 'Comunicado enviado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao enviar comunicado:', error);
      alert('Erro ao enviar comunicado. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza de que deseja excluir este comunicado?')) {
      try {
        setLoading(true);
        const response = await deleteComunicado(id);
        if (response.status === 204) {
          setComunicados(comunicados.filter((comunicado) => comunicado.id !== id));
          alert('Comunicado excluído com sucesso!');
        }
      } catch (error) {
        console.error('Erro ao excluir comunicado:', error);
        alert('Erro ao excluir comunicado. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="home-coord-container">
      <SidebarCoord />
      <div className="home-page-coord">
        <h1 className="BemvindoCoord">Olá, Bem-vindo ao Portal do Coordenador!</h1>

        <div className="header-image-coord">
          <img id="Fundocoord" src="/img/Horizonte.png" alt="Fundo" />
        </div>

        <button onClick={() => handleModalOpen()} className="novo-comunicado-button">
          Novo Comunicado
        </button>

        <div className="Square">
          <a href="/GerenciamentoAlunos" className="Squares">Acessar Alunos</a>
          <a href="/GerenciamentoProfessores" className="Squares">Acessar Professores</a>
          <a href="/GerenciamentoTurmas" className="Squares">Acessar Turmas</a>
          <a href="/" className="Squares">Acessar Relatórios</a>
        </div>

        <div className="comunicados-list">
          <h2>Comunicados Enviados</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : comunicados.length === 0 ? (
            <p>Nenhum comunicado encontrado.</p>
          ) : (
            <ul>
              {comunicados.map((comunicado) => (
                <li key={comunicado.id}>
                  <h3>{comunicado.titulo}</h3>
                  <p>{comunicado.conteudo}</p>
                  <button onClick={() => handleModalOpen(comunicado)} className="edit-button">Editar</button>
                  <button onClick={() => handleDelete(comunicado.id)} className="delete-button">Excluir</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleModalClose} aria-label="Fechar modal">
              &times;
            </button>
            <h2>{isEditMode ? 'Editar Comunicado' : 'Criar Novo Comunicado'}</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="description">Descrição:</label>
                <textarea
                  id="description"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Faça seu comunicado aqui"
                  required
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label htmlFor="attachment" className="custom-file-label">
                  Anexar Arquivo
                </label>
                <span id="file-chosen" className="file-chosen">
                  {fileName}
                </span>
                <input
                  type="file"
                  id="attachment"
                  className="custom-file-input"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Enviando...' : isEditMode ? 'Atualizar Comunicado' : 'Enviar Comunicado'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoordHome;
