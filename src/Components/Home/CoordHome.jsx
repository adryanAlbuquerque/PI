import React, { useState } from 'react';
import './CoordHome.css'; // Certifique-se que o arquivo CSS está no caminho correto
import SidebarCoord from '../sidebar/sidebarCoord';

const CoordHome = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [fileName, setFileName] = useState('Nenhum arquivo selecionado');

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setFileName('Nenhum arquivo selecionado'); // Resetar o nome do arquivo ao fechar o modal
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    handleModalClose(); // Fechar o modal após enviar
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileName(
      selectedFile ? selectedFile.name : 'Nenhum arquivo selecionado',
    );
  };

  return (
    <div className="home-coord-container">
      <SidebarCoord />

      {/* Conteúdo Principal */}
      <div className="home-page-coord">
        <h1 className="BemvindoCoord">Olá, Bem-vindo ao Portal do Coordenador!</h1>

        <div className="header-image-coord">
          <img id="Fundocoord" src="/img/Horizonte.png" alt="Fundo" />
        </div>

        {/* Botão Novo Comunicado */}
        <button onClick={handleModalOpen} className="novo-comunicado-button">
          Novo Comunicado
        </button>

        {/* Quadrados abaixo do botão */}
        <div className="Square">
          <a href="/GerenciamentoAlunos" className="Squares">
            Acessar Alunos
          </a>
          <a href="/GerenciamentoProfessores" className="Squares">
            Acessar Professores
          </a>
          <a href="/GerenciamentoTurmas" className="Squares">
            Acessar Turmas
          </a>
          <a href="/" className="Squares">
            Acessar Relatórios
          </a>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={handleModalClose}
              aria-label="Fechar modal"
            >
              &times;
            </button>
            <h2>Criar Novo Comunicado</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fromEmail">De:</label>
                <input
                  type="email"
                  id="fromEmail"
                  placeholder="Seu email"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="toEmail">Para:</label>
                <input
                  type="email"
                  id="toEmail"
                  placeholder="Email do destinatário"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descrição:</label>
                <textarea
                  id="description"
                  rows="4"
                  placeholder="Escreva sua descrição aqui..."
                  required
                  className="form-textarea"
                />
              </div>

              {/* Campo de arquivo personalizado */}
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

              <button type="submit" className="send-button">
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoordHome;
