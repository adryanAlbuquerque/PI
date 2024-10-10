import { Link } from 'react-router-dom';
import './AlunoHome.css';
import SidebarAluno from '../sidebar/sidebarALuno';
import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Importa o ícone de perfil

const AlunoHome = () => {
  // Estados para abrir/fechar o modal e armazenar dados do aluno
  const [isModalOpen, setModalOpen] = useState(false);
  const [alunoData, setAlunoData] = useState({ nome: '', email: '', turma: '' });

  // Função para abrir o modal e buscar dados do aluno via CRUD
  const handleModalOpen = () => {
    // Simulação de dados (poderia ser uma chamada API)
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

  // Simulação de comunicados
  const [comunicados, setComunicados] = useState([]);

  // Simulação de carregamento de comunicados
  useEffect(() => {
    const comunicadosSimulados = [
      {
        id: 1,
        titulo: 'Reunião com a coordenação',
        mensagem: 'Haverá uma reunião com a coordenação na próxima sexta-feira, às 14h.',
        data: '2024-10-12',
      },
      {
        id: 2,
        titulo: 'Entrega de projetos finais',
        mensagem: 'Os projetos finais devem ser entregues até o dia 20 de outubro.',
        data: '2024-10-15',
      },
      {
        id: 3,
        titulo: 'Aula de revisão',
        mensagem: 'A aula de revisão será realizada no dia 18 de outubro, às 10h.',
        data: '2024-10-18',
      },
    ];

    // Simulação de atraso no carregamento
    setTimeout(() => {
      setComunicados(comunicadosSimulados);
    }, 1000); // Carrega os comunicados depois de 1 segundo
  }, []);

  return (
    <div className="home-aluno-container">
      <SidebarAluno />

      {/* Conteúdo Principal */}
      <div className="home-page-aluno">
        <h1 className="BemVindo">Olá, Bem-vindo ao portal do Aluno!</h1>

        {/* Ícone de perfil no cabeçalho */}
        <div className="profile-container">
          <FaUserCircle onClick={handleModalOpen} className="profile-icon" />
        </div>

        <div className="header-image-aluno">
          <img id="FundoAluno" src="/img/Horizonte.png" alt="Fundo" />
        </div>

        {/* Quadrados abaixo da imagem */}
        <div className="squaresaluno">
          <Link to="/HomeAluno" className="Bloco">Acessar Conceitos</Link>
          <Link to="/ConceitosAluno" className="Bloco">Acessar Disciplinas</Link>
          <Link to="/DocAluno" className="Bloco">Acessar Documentos</Link>
          <Link to="/BiblioAluno" className="Bloco">Acessar Biblioteca</Link>
        </div>

        {/* Área de comunicados */}
        <div className="comunicados-container">
          <h2 className="comunicados">Comunicados</h2>
          {comunicados.length === 0 ? (
            <p>Carregando comunicados...</p>
          ) : (
            comunicados.map((comunicado) => (
              <div key={comunicado.id} className="comunicado-item">
                <h3>{comunicado.titulo}</h3>
                <p>{comunicado.mensagem}</p>
                <span>Data: {comunicado.data}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal para exibir os dados do aluno */}
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
