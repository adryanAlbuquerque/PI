import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { createAluno, createProfessor } from '../../../Service/APIServices'; // Import the original API services
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
    };

    try {
      let response;
      if (grupo === "aluno") {
        // Chama a função createAluno para enviar os dados do aluno
        response = await createAluno(dadosUsuario);
      } else if (grupo === "professor") {
        // Chama a função createProfessor para enviar os dados do professor
        response = await createProfessor(dadosUsuario);
      } else {
        // Para coordenadores ou outros tipos de usuário, você pode adicionar a lógica correspondente aqui
        alert("Por favor, selecione aluno ou professor para este cadastro.");
        return;
      }

      console.log('Usuário cadastrado:', response.data);
      alert("Usuário cadastrado com sucesso!");
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
              {/* Se precisar adicionar coordenador no futuro */}
              <option value="coordenador" disabled>Coordenador</option> 
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
