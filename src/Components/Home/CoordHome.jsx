import React, { useState, useEffect } from 'react';
import './CoordHome.css';
import SidebarCoord from '../sidebar/sidebarCoord';
import { createComunicado, getUsuariosPorTipo, getComunicados, updateComunicado, deleteComunicado } from '../../Service/APIServices'; // Importando as funções de API

const CoordHome = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false); // Para gerenciar se está editando um comunicado
  const [selectedComunicado, setSelectedComunicado] = useState(null); // Para armazenar o comunicado selecionado para edição
  const [fileName, setFileName] = useState('Nenhum arquivo selecionado');
  const [formData, setFormData] = useState({
    destinatario: '',
    descricao: '',
    arquivo: null,
  });
  const [comunicados, setComunicados] = useState([]); // Lista de comunicados enviados
  const [loading, setLoading] = useState(false); // Para gerenciar o estado de carregamento

  useEffect(() => {
    // Carregar comunicados no início
    const fetchComunicados = async () => {
      setLoading(true);
      try {
        const response = await getComunicados(); // Função que busca os comunicados
        setComunicados(response.data);
      } catch (error) {
        console.error('Erro ao buscar comunicados:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComunicados();
  }, []);

  const handleModalOpen = (comunicado = null) => {
    if (comunicado) {
      setEditMode(true); // Entrando no modo de edição
      setSelectedComunicado(comunicado);
      setFormData({
        destinatario: comunicado.destinatarios[0].tipo, // Tipo do destinatário (exemplo: 'alunos')
        descricao: comunicado.conteudo,
        arquivo: null, // Se for necessário editar o arquivo, pode ser ajustado
      });
    } else {
      setEditMode(false); // Modo de criação
      setSelectedComunicado(null);
      setFormData({ destinatario: '', descricao: '', arquivo: null });
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
      const destinatarios = await getUsuariosPorTipo(formData.destinatario);
      const destinatariosIds = destinatarios.map((d) => d.id);

      const comunicadoData = {
        titulo: formData.descricao.substring(0, 50),
        conteudo: formData.descricao,
        autorId: 1, // ID do coordenador ou usuário logado
        destinatariosIds: destinatariosIds,
        arquivo: formData.arquivo,
      };

      let response;
      if (isEditMode && selectedComunicado) {
        // Atualizar comunicado
        response = await updateComunicado(selectedComunicado.id, comunicadoData);
      } else {
        // Criar novo comunicado
        response = await createComunicado(comunicadoData);
      }

      if (response.status === 200 || response.status === 201) {
        setComunicados(prevComunicados => {
          if (isEditMode) {
            return prevComunicados.map(comunicado => 
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
          setComunicados(comunicados.filter(comunicado => comunicado.id !== id));
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
        <h1 className="BemvindoCoord">Olá, Bem-vindo ao Portal Coordenador!</h1>

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
          {loading ? <p>Carregando...</p> : (
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

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleModalClose} aria-label="Fechar modal">
              &times;
            </button>
            <h2>{isEditMode ? 'Editar Comunicado' : 'Criar Novo Comunicado'}</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="toEmail">Para:</label>
                <select
                  id="toEmail"
                  name="destinatario"
                  value={formData.destinatario}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Selecione o destinatário</option>
                  <option value="alunos">Alunos</option>
                  <option value="professores">Professores</option>
                  <option value="coordenadores">Coordenadores</option>
                </select>
              </div>

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

              {/* Campo de arquivo */}
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

              <button type="submit" className="send-button" disabled={loading}>
                {loading ? 'Enviando...' : isEditMode ? 'Atualizar' : 'Enviar'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoordHome;
