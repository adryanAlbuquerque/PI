import './LancarNotas.css';
import SidebarProf from '../../sidebar/sidebarProf';
import { useState } from 'react'; // Importando o useState

const LancarNotas = () => {
  // Dados estáticos de turmas e alunos
  const turmas = [
    { id: 1, nome: 'Turma A' },
    { id: 2, nome: 'Turma B' },
    { id: 3, nome: 'Turma C' },
  ];

  const alunos = [
    { id: 1, nome: 'João', turmaId: 1 },
    { id: 2, nome: 'Maria', turmaId: 1 },
    { id: 3, nome: 'José', turmaId: 2 },
    { id: 4, nome: 'Ana', turmaId: 2 },
    { id: 5, nome: 'Carlos', turmaId: 3 },
  ];

  const [notas, setNotas] = useState({}); // Estado para armazenar as notas
  const [turmaSelecionada, setTurmaSelecionada] = useState('');

  const handleTurmaChange = (event) => {
    setTurmaSelecionada(event.target.value);
  };

  const handleNotaChange = (event, alunoId) => {
    const { value } = event.target;
    setNotas((prevNotas) => ({
      ...prevNotas,
      [alunoId]: value,
    }));
  };

  const handleSaveNotas = (event) => {
    event.preventDefault();

    // Criar conceito para cada aluno com a respectiva nota
    const notasParaSalvar = alunos
      .filter((aluno) => aluno.turmaId === Number(turmaSelecionada))
      .map((aluno) => ({
        alunoId: aluno.id,
        conceito: notas[aluno.id] || 0,
      }));

    // Simulação do salvamento
    console.log('Notas salvas:', notasParaSalvar);
    alert('Notas salvas com sucesso!');
  };

  // Filtra alunos pela turma selecionada
  const alunosFiltrados = alunos.filter((aluno) => aluno.turmaId === Number(turmaSelecionada));

  return (
    <div className="LancarNotaContainer">
      <SidebarProf />

      <div className="lancar-notas">
        <h2>Lançar Notas</h2>

        <div className="selecao-turma">
          <label htmlFor="turmas">Selecione a Turma:</label>
          <select
            id="turmas"
            value={turmaSelecionada}
            onChange={handleTurmaChange}
          >
            <option value="">-- Selecione uma turma --</option>
            {turmas.map((turma) => (
              <option key={turma.id} value={turma.id}>
                {turma.nome}
              </option>
            ))}
          </select>
        </div>

        {alunosFiltrados.length > 0 ? (
          <form onSubmit={handleSaveNotas}>
            <table className="alunos-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody>
                {alunosFiltrados.map((aluno) => (
                  <tr key={aluno.id}>
                    <td>{aluno.id}</td>
                    <td>{aluno.nome}</td>
                    <td>
                      <input
                        type="number"
                        value={notas[aluno.id] || ''}
                        onChange={(event) => handleNotaChange(event, aluno.id)}
                        min="0"
                        max="10"
                        step="0.1"
                        required
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="submit" className="salvar-notas-button">
              Salvar Notas
            </button>
          </form>
        ) : (
          <p className="no-alunos">
            {turmaSelecionada
              ? 'Nenhum aluno encontrado para a turma selecionada.'
              : 'Selecione uma turma para visualizar os alunos.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default LancarNotas;
