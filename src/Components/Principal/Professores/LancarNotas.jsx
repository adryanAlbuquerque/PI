import './LancarNotas.css';
import SidebarProf from '../../sidebar/sidebarProf';
import { useState, useEffect } from 'react';

const LancarNotas = () => {
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [notas, setNotas] = useState({});
  const [turmaSelecionada, setTurmaSelecionada] = useState('');

  useEffect(() => {
    // Simulação de uma API para carregar turmas
    const mockTurmas = [
      { id: 1, nome: 'Turma A' },
      { id: 2, nome: 'Turma B' },
      { id: 3, nome: 'Turma C' },
    ];
    setTurmas(mockTurmas);
  }, []);

  useEffect(() => {
    if (turmaSelecionada) {
      // Simulação de uma API para carregar alunos da turma selecionada
      const mockAlunos = [
        { id: 1, nome: 'João Silva', turmaId: 1 },
        { id: 2, nome: 'Maria Oliveira', turmaId: 1 },
        { id: 3, nome: 'Carlos Souza', turmaId: 2 },
      ];
      const alunosFiltrados = mockAlunos.filter(
        (aluno) => aluno.turmaId === Number(turmaSelecionada)
      );
      setAlunos(alunosFiltrados);
    } else {
      setAlunos([]);
    }
  }, [turmaSelecionada]);

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
    const notasParaEnviar = alunos.map((aluno) => ({
      alunoId: aluno.id,
      nota: notas[aluno.id] || 0,
    }));
    console.log('Notas para salvar:', notasParaEnviar);
    alert('Notas salvas com sucesso!');
  };

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

        {alunos.length > 0 ? (
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
                {alunos.map((aluno) => (
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
