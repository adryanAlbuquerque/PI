import './LancarNotas.css';
import SidebarProf from '../../sidebar/sidebarProf';
import { useState, useEffect } from 'react';
import { getTurmas, getAlunos, createConceito } from '../../../Service/APIServices'; 

const LancarNotas = () => {
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [notas, setNotas] = useState({});
  const [turmaSelecionada, setTurmaSelecionada] = useState('');

  useEffect(() => {
    // Carregar turmas da API
    getTurmas()
      .then((response) => setTurmas(response.data))
      .catch((error) => console.error('Erro ao carregar turmas:', error));
  }, []);

  useEffect(() => {
    if (turmaSelecionada) {
      // Carregar alunos da turma selecionada
      getAlunos()
        .then((response) => {
          const alunosFiltrados = response.data.filter(
            (aluno) => aluno.turmaId === Number(turmaSelecionada)
          );
          setAlunos(alunosFiltrados);
        })
        .catch((error) => console.error('Erro ao carregar alunos:', error));
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

  const handleSaveNotas = async (event) => {
    event.preventDefault();

    // Criar conceito para cada aluno com a respectiva nota
    const notasParaSalvar = alunos.map((aluno) => ({
      alunoId: aluno.id,
      conceito: notas[aluno.id] || 0,
    }));

    try {
      for (let i = 0; i < notasParaSalvar.length; i++) {
        const { alunoId, conceito } = notasParaSalvar[i];
        await createConceito({ alunoId, conceito });
      }
      alert('Notas salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar conceitos:', error);
      alert('Ocorreu um erro ao salvar as notas.');
    }
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
