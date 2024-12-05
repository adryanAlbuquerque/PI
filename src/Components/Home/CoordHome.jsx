import { useState, useEffect } from 'react';
import './CoordHome.css';
import SidebarCoord from '../sidebar/sidebarCoord';
import { createComunicado, getComunicados, updateComunicado, deleteComunicado, getAlunos } from '../../Service/APIServices';

const CoordHome = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [selectedComunicado, setSelectedComunicado] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '', 
    conteudo: '',
    destinatarios: [], // Destinatários
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
        titulo: comunicado.titulo,
        conteudo: comunicado.conteudo,
        destinatarios: comunicado.destinatarios || [],
      });
    } else {
      setEditMode(false);
      setSelectedComunicado(null);
      setFormData({ titulo: '', conteudo: '', destinatarios: [] });
    }
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedComunicado(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      const responseAlunos = await getAlunos();  
      const alunosIds = responseAlunos.data.map(aluno => aluno.id); 

      const autorId = localStorage.getItem('userId'); 
      if (!autorId) {
        alert('Comunicado Enviado!');
        return;
      }

      const comunicadoData = {
        titulo: formData.titulo, 
        conteudo: formData.conteudo, 
        autorId: autorId, 
        destinatariosIds: alunosIds, 
      };

      console.log("Comunicado enviado:", comunicadoData);
    
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
          ) : (
            <ul>
              <li>
                <h3>Bem-vindo ao Portal</h3>
                <p>Lembre-se de revisar suas turmas e alunos regularmente.</p>
              </li>
              <li>
                <h3>Atualização do Sistema</h3>
                <p>O sistema estará em manutenção amanhã das 22h às 2h.</p>
              </li>
              <li>
                <h3>Aviso Importante</h3>
                <p>Por favor, enviem os relatórios mensais até o dia 15 deste mês.</p>
              </li>
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
                <label htmlFor="titulo">Título:</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  placeholder="Título do comunicado"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="conteudo">Conteúdo:</label>
                <textarea
                  id="conteudo"
                  name="conteudo"
                  value={formData.conteudo}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Faça seu comunicado aqui"
                  required
                  className="form-textarea"
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
