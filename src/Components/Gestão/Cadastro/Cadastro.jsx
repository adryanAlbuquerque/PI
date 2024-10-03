import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import './Cadastro.css';

const Cadastro = () => {
  // Estados para os campos do formulário
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [grupo, setGrupo] = useState(""); // Deixa vazio inicialmente para o placeholder

  // Estado adicional para armazenar informações específicas dos usuários
  const [turma, setTurma] = useState("");
  const [turno, setTurno] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar os dados do formulário
    if (!grupo) {
      alert("Por favor, selecione um tipo de usuário.");
      return;
    }
    
    const dadosUsuario = {
      nomeCompleto,
      cpf,
      email,
      senha,
      grupo,
      turma: grupo === 'aluno' ? turma : undefined,
      turno: grupo === 'aluno' ? turno : undefined,
    };

    // Aqui você pode adicionar a lógica para enviar dados para a API
    console.log(dadosUsuario);
    alert("Dados enviados!");
  };

  const handleGoBack = () => {
    window.location.href = '/Home/CoordHome'; // Redireciona para a página principal
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
          <h1 id="MedioTec">CADASTRO GERAL</h1>

          {/* Dropdown com placeholder "Usuário" */}
          <div className="input-field">
            <select
              value={grupo}
              onChange={(e) => {
                setGrupo(e.target.value);
                setTurma(""); // Resetando turma e turno ao mudar o grupo
                setTurno("");
              }}
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
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
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

          {/* Campos específicos para Alunos */}
          {grupo === 'aluno' && (
            <>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Turma"
                  value={turma}
                  onChange={(e) => setTurma(e.target.value)}
                  required
                />
              </div>

              <div className="input-field">
                <select
                  value={turno}
                  onChange={(e) => setTurno(e.target.value)}
                  required
                >
                  <option value="" disabled>Turno</option>
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                </select>
              </div>
            </>
          )}

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

export default Cadastro;
