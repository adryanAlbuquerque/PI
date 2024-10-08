import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { createUsuario } from '../../../Service/APIServices'; // Função genérica para criar qualquer usuário
import './CadastroGeral.css';

const CadastroGeral = () => {
  // Estados para os campos do formulário
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [grupo, setGrupo] = useState(""); // Define o tipo de usuário selecionado

  // Função para enviar os dados do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verifica se o tipo de usuário foi selecionado
    if (!grupo) {
      alert("Por favor, selecione um tipo de usuário.");
      return;
    }

    const dadosUsuario = {
      nome: nomeCompleto,
      email,
      senha,
      tipoUsuario: grupo.toUpperCase(), // Formato exigido pelo backend
    };

    try {
      // Chama a função createUsuario para enviar os dados para o backend
      const response = await createUsuario(dadosUsuario);
      console.log('Usuário cadastrado com sucesso:', response.data);
      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert("Erro ao cadastrar o usuário. Tente novamente.");
    }
  };

  // Função para voltar à página anterior
  const handleGoBack = () => {
    window.location.href = '/GerenciamentoAlunos'; // Redireciona para uma página específica
  };

  return (
    <div className="Container">
      <div id="CadGeralBox">
        {/* Botão para fechar a tela */}
        <FaTimes className="closeIcon" onClick={handleGoBack} />

        <div id="LogoCadGeral">
          <img src="/img/logo.png" alt="Logo" />
        </div>

        {/* Formulário de cadastro */}
        <form onSubmit={handleSubmit}>
          <h1 id="NomeCadastro">CADASTRO GERAL</h1>

          {/* Dropdown para selecionar o tipo de usuário */}
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

          {/* Campos para nome, email e senha */}
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
