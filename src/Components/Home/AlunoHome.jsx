import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AlunoHome.css';
import SidebarAluno from '../sidebar/sidebarALuno';
import { FaUserCircle } from 'react-icons/fa';

const AlunoHome = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [alunoData, setAlunoData] = useState({ nome: '', email: '', turma: '' });

  const comunicados = [
    {
      id: 1,
      titulo: 'Bem-vindo ao Portal',
      conteudo: 'Lembre-se de revisar suas turmas e alunos regularmente.',
      dataCriacao: '2024-12-05',
    },
    {
      id: 2,
      titulo: 'Atualização do Sistema',
      conteudo: 'O sistema estará em manutenção amanhã das 22h às 2h.',
      dataCriacao: '2024-12-04',
    },
    {
      id: 3,
      titulo: 'Aviso Importante',
      conteudo: 'Por favor, enviem os relatórios mensais até o dia 15 deste mês.',
      dataCriacao: '2024-12-03',
    },
  ];

  const [loading, setLoading] = useState(false);

  const handleModalOpen = () => {

    const dadosSimulados = {
      nome: 'João da Silva',
      email: 'joao.silva@gmail.com',
      turma: 'Turma A',
    };

    setAlunoData(dadosSimulados);
    setModalOpen(true);
  };

  
  const handleModalClose = () => {
    setModalOpen(false);
  };

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
