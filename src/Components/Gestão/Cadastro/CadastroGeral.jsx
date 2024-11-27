import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { createAluno, createProfessor, createCoordenador } from '../../../Service/APIServices'; // Importar funções de criação
import './CadastroGeral.css';

const CadastroGeral = () => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [grupo, setGrupo] = useState(""); // Valor padrão vazio
  const [status, setStatus] = useState("");
  const [turno, setTurno] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!grupo || !["aluno", "professor", "coordenador"].includes(grupo)) {
      alert("Por favor, selecione um tipo de usuário válido.");
      return;
    }

    const dadosUsuario = {
      nome: nomeCompleto,
      email,
      senha,
      tipoUsuario: grupo.toUpperCase(),
      status,
      turno,
    };

    try {
      let response;
      if (grupo === "aluno") {
        response = await createAluno(dadosUsuario);
      } else if (grupo === "professor") {
        response = await createProfessor(dadosUsuario);
      } else if (grupo === "coordenador") {
        response = await createCoordenador(dadosUsuario);
      }

      console.log('Usuário cadastrado:', response.data);
      alert("Usuário cadastrado com sucesso!");
      // Resetar os campos após o envio
      setNomeCompleto("");
      setEmail("");
      setSenha("");
      setGrupo("");
      setStatus("");
      setTurno("");
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert("Ocorreu um erro ao cadastrar. Tente novamente.");
    }
  };

  const handleGoBack = () => {
    window.location.href = '/GerenciamentoAlunos'; // Alterar para usar navigate caso esteja usando React Router
  };

  return (
    <div className="Container">
      <div id="CadGeralBox">
        <FaTimes className="closeIcon" onClick={handleGoBack} />

        <div id="LogoCadGeral">
          <img src="/img/logo.png" alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1 id="NomeCadastro">CADASTRO GERAL</h1>

          <div className="input-field">
            <select
              value={grupo}
              onChange={(e) => setGrupo(e.target.value)}
              required
            >
              <option value="" disabled>Selecione o tipo de usuário</option>
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
              <option value="coordenador">Coordenador</option>
            </select>
          </div>

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

          <div className="input-field">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="" disabled>Status</option>
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
            </select>
          </div>

          <div className="input-field">
            <select
              value={turno}
              onChange={(e) => setTurno(e.target.value)}
              required
            >
              <option value="" disabled>Turno</option>
              <option value="MANHA">Manhã</option>
              <option value="TARDE">Tarde</option>
              <option value="NOITE">Integral</option>
            </select>
          </div>

          <button id="button" type="submit">CADASTRAR</button>

          <button type="button" id="homeButton" onClick={handleGoBack}>
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroGeral;
