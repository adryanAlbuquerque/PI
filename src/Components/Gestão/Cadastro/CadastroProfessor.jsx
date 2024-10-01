import {FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import './CadastroProfessor.css';

const CadastroProfessor = () => {
  // Estados para os campos do formulário
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [turma, setTurma] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [uf, setUf] = useState("");
  const [cpf, setCpf] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar lógica para enviar os dados do Professor
    alert("Dados enviados!");
  };

  const handleGoProfessores = () => {
    window.location.href = '/Principal/Coordenacao/Professores';  // Redireciona para a página inicial
  };

  return (
    <div className="Container">
      <div id="CadProfessorBox">
        {/* Botão para voltar à página inicial */}
        <FaTimes className="closeIcon" onClick={handleGoProfessores} />

        <div id="LogoCadProfessor">
          <img src="/img/logo.png" alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1 id="MedioTec">CADASTRO PROFESSOR</h1>

          {/* Campos de dados do professor */}
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

          <button id="button">CADASTRAR</button>
          
          {/* Botão para voltar à Home */}
          <button type="button" id="homeButton" onClick={handleGoProfessores}>
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroProfessor;
