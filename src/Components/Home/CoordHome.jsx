import React, { useState, useEffect } from 'react';
import './CoordHome.css';
import SidebarCoord from '../sidebar/sidebarCoord';
import { createComunicado, getUsuariosPorTipo, getComunicados } from '../../Service/APIServices'; // Importando as funções de API

const CoordHome = () => {
  const [isModalOpen, setModalOpen] = useState(false);
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

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    setFileName('Nenhum arquivo selecionado');
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
      // Buscar os destinatários
      const destinatarios = await getUsuariosPorTipo(formData.destinatario);
      const destinatariosIds = destinatarios.map((d) => d.id);

      const comunicadoData = {
        titulo: formData.descricao.substring(0, 50), // Título a partir da descrição
        conteudo: formData.descricao,
        autorId: 1, // Usar o ID do coordenador ou usuário logado
        destinatariosIds: destinatariosIds,
        arquivo: formData.arquivo,
      };

      const response = await createComunicado(comunicadoData);
      if (response.status === 200 || response.status === 201) {
        setComunicados([...comunicados, response.data]);
        handleModalClose();
        setFormData({ destinatario: '', descricao: '', arquivo: null });
        alert('Comunicado enviado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao enviar comunicado:', error);
      alert('Erro ao enviar comunicado. Por favor, tente novamente.');
    } finally {
      setLoading(false);
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

        <button onClick={handleModalOpen} className="novo-comunicado-button">
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
              {comunicados.map((comunicado, index) => (
                <li key={index}>
                  <h3>{comunicado.titulo}</h3>
                  <p>{comunicado.conteudo}</p>
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
            <h2>Criar Novo Comunicado</h2>

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
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoordHome;
