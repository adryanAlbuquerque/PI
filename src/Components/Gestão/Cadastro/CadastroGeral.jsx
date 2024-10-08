import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { createAluno, createProfessor, createCoordenador } from '../../../Service/APIServices'; // Importar funções de criação
import './CadastroGeral.css';

const CadastroGeral = () => {
  // Estados para os campos do formulário
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [grupo, setGrupo] = useState(""); // Deixa vazio inicialmente para o placeholder

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Lógica para enviar os dados do formulário
    if (!grupo) {
      alert("Por favor, selecione um tipo de usuário.");
      return;
    }
    
    const dadosUsuario = {
      nome: nomeCompleto,
      email,
      senha,
      tipoUsuario: grupo.toUpperCase(), // Transforma para uppercase para corresponder ao seu formato
    };

    try {
      let response;
      // Chama a função correspondente ao tipo de usuário selecionado
      if (grupo === "aluno") {
        response = await createAluno(dadosUsuario);
      } else if (grupo === "professor") {
        response = await createProfessor(dadosUsuario);
      } else if (grupo === "coordenador") {
        response = await createCoordenador(dadosUsuario);
      } else {
        alert("Tipo de usuário inválido.");
        return;
      }
      
      console.log('Usuário cadastrado:', response.data);
      alert("Dados enviados com sucesso!");
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert("Ocorreu um erro ao cadastrar. Tente novamente.");
    }
  };

  const handleGoBack = () => {
    window.location.href = '/GerenciamentoAlunos'; // Redireciona para a página principal
  };

  return (
    <div className="Container">
      <div id="CadGeralBox">
        {/* Botão para voltar à página inicial */}
        <FaTimes className="closeIcon" onClick={handleGoBack} />

        <div id="LogoCadGeral">
          <img src="/img/logo.png" alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1 id="NomeCadastro">CADASTRO GERAL</h1>

          {/* Dropdown com placeholder "Usuário" */}
          <div className="input-field">
            <select
              value={grupo}
              onChange={(e) => setGrupo(e.target.value)}
            >
              <option value="" disabled>Usuário</option>
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
              <option value="coordenador">Coordenador</option>
            </select>
          </div>

          {/* Campos de dados gerais */}
          <div className="input-field">
            <input
              type="text"
              placeholder="Nome Completo"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button id="button">CADASTRAR</button>

          {/* Botão para voltar à Home */}
          <button type="button" id="homeButton" onClick={handleGoBack}>
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroGeral;
