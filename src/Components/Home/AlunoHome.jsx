import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AlunoHome.css';
import SidebarAluno from '../sidebar/sidebarALuno';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

const AlunoHome = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [alunoData, setAlunoData] = useState({ nome: '', email: '', turma: '' });
  const [comunicados, setComunicados] = useState([]);
  const [loading, setLoading] = useState(true); 

  const handleModalOpen = () => {
    // Dados simulados (poderia ser uma chamada API)
    const dadosSimulados = {
      nome: 'João da Silva',
      email: 'joao.silva@gmail.com',
      turma: 'Turma A',
    };

    setAlunoData(dadosSimulados);
    setModalOpen(true);
  };

  // Função para fechar o modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchComunicados = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/comunicados'); 
        setComunicados(response.data);
        setLoading(false); 
      } catch (error) {
        console.error('Erro ao carregar os comunicados:', error);
        setLoading(false);
      }
    };

    fetchComunicados();
  }, []);

  return (
    <div className="home-aluno-container">
      <SidebarAluno />

      <div className="home-page-aluno">
        <h1 className="BemVindo">Olá, Bem-vindo ao portal do Aluno!</h1>

        <div className="profile-container">
          <FaUserCircle onClick={handleModalOpen} className="profile-icon" />
        </div>

        <div className="header-image-aluno">
          <img id="FundoAluno" src="/img/Horizonte.png" alt="Fundo" />
        </div>

        <div className="squaresaluno">
          <Link to="/HomeAluno" className="Bloco">Acessar Conceitos</Link>
          <Link to="/ConceitosAluno" className="Bloco">Acessar Disciplinas</Link>
          <Link to="/DocAluno" className="Bloco">Acessar Horários</Link>
          <Link to="/BiblioAluno" className="Bloco">Acessar Contatos</Link>
        </div>

        <div className="comunicados-container">
          <h2 className="comunicados">Comunicados</h2>
          {loading ? (
            <p>Carregando comunicados...</p>
          ) : (
            comunicados.map((comunicado) => (
              <div key={comunicado.id} className="comunicado-item">
                <h3>{comunicado.titulo}</h3>
                <p>{comunicado.conteudo}</p>
                <span>Data: {new Date(comunicado.dataCriacao).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleModalClose}>
              &times;
            </button>
            <h2>Dados do Aluno</h2>
            <p><strong>Nome Completo:</strong> {alunoData.nome}</p>
            <p><strong>Email:</strong> {alunoData.email}</p>
            <p><strong>Turma:</strong> {alunoData.turma}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlunoHome;
