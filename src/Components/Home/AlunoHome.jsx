import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AlunoHome.css';
import SidebarAluno from '../sidebar/sidebarALuno';
import { getComunicados } from '../../Service/APIServices'; // Importa a função de obter comunicados

const AlunoHome = () => {
  const [comunicados, setComunicados] = useState([]);

  // Função para buscar os comunicados ao carregar a página
  useEffect(() => {
    const fetchComunicados = async () => {
      try {
        const response = await getComunicados();
        setComunicados(response.data);
      } catch (error) {
        console.error("Erro ao buscar comunicados:", error);
      }
    };

    fetchComunicados();
  }, []);

  return (
    <div className="home-aluno-container">

      <SidebarAluno />

      {/* Conteúdo Principal */}
      <div className="home-page-aluno">
        <h1 className="BemVindo">Olá, Bem-vindo ao portal do Aluno!</h1>

        {/* Imagem no cabeçalho */}
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

        {/* Título da seção de comunicados */}
        

        {/* Lista de Comunicados */}
        <div className="comunicados-container">
          <h2 className="comunicados">Comunicados</h2>
          {comunicados.length > 0 ? (
            comunicados.map((comunicado) => (
              <div key={comunicado.id} className="comunicado-item">
                <h3>{comunicado.titulo}</h3>
                <p>{comunicado.descricao}</p>
                <span className="comunicado-data">{new Date(comunicado.dataEnvio).toLocaleDateString()}</span>
              </div>
            ))
          ) : (
            <p>Nenhum comunicado encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlunoHome;
