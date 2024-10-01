import {FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import './CadastroAluno.css';

const CadastroAluno = () => {
  // Estados para os campos do formulário
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [turma, setTurma] = useState("");
  const [turno, setTurno] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [uf, setUf] = useState("");
  const [cpf, setCpf] = useState("");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [emailResponsavel, setEmailResponsavel] = useState("");
  const [cpfResponsavel, setCpfResponsavel] = useState("");
  const [telefoneResponsavel, setTelefoneResponsavel] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar lógica para enviar os dados do aluno
    alert("Dados enviados!");
  };

  const handleGoAlunos = () => {
    window.location.href = '/Principal/Coordenacao/Alunos';  // Redireciona para a página inicial
  };

  return (
    <div className="Container">
      <div id="CadAlunoBox">
        {/* Botão para voltar à página inicial */}
        <FaTimes className="closeIcon" onClick={handleGoAlunos} />

        <div id="LogoCadAluno">
          <img src="/img/logo.png" alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1 id="MedioTec">CADASTRO ALUNO</h1>

          {/* Campos de dados do aluno */}
          <div className="input-field">
            <input
              type="text"
              placeholder="Nome Completo"
              onChange={(e) => setNomeCompleto(e.target.value)}
            />
          </div>

          <div className="input-field">
            <input
              type="text"
              placeholder="Turma"
              onChange={(e) => setTurma(e.target.value)}
            />
          </div>

          <div className="input-field">
            <input
              type="text"
              placeholder="Turno"
              onChange={(e) => setTurno(e.target.value)}
            />
          </div>

          <div className="input-field">
            <input
              type="date"
              placeholder="Data de Nascimento"
              onChange={(e) => setDataNascimento(e.target.value)}
            />
          </div>

          <div className="input-field">
            <input
              type="tel"
              placeholder="Telefone"
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>

          <div className="input-field">
            <input
              type="text"
              placeholder="CEP"
              onChange={(e) => setCep(e.target.value)}
            />
          </div>

          <div className="input-field">
            <input
              type="text"
              placeholder="Número"
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>

          <div className="input-field">
            <input
              type="text"
              placeholder="Rua"
              onChange={(e) => setRua(e.target.value)}
            />
          </div>

          <div className="input-field">
            <input
              type="text"
              placeholder="Bairro"
              onChange={(e) => setBairro(e.target.value)}
            />
          </div>

          <div className="input-field">
            <input
              type="text"
              placeholder="UF"
              onChange={(e) => setUf(e.target.value)}
            />
          </div>

          <div className="input-field">
            <input
              type="text"
              placeholder="CPF"
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          {/* Campos de dados do responsável */}
          <h2>Dados do Responsável</h2>

          <div className="input-field">
            <input
              type="text"
              placeholder="Nome do Responsável"
              onChange={(e) => setNomeResponsavel(e.target.value)}
            />
          </div>

          <div className="input-field">
            <input
              type="email"
              placeholder="Email do Responsável"
              onChange={(e) => setEmailResponsavel(e.target.value)}
            />
          </div>

          <div className="input-field">
            <input
              type="text"
              placeholder="CPF do Responsável"
              onChange={(e) => setCpfResponsavel(e.target.value)}
            />
          </div>

          <div className="input-field">
            <input
              type="tel"
              placeholder="Telefone do Responsável"
              onChange={(e) => setTelefoneResponsavel(e.target.value)}
            />
          </div>

          <button id="button">CADASTRAR</button>
          
          {/* Botão para voltar à Home */}
          <button type="button" id="homeButton" onClick={handleGoAlunos}>
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroAluno;
