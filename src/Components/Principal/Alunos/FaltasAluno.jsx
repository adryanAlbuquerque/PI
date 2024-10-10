import './FaltasAluno.css';
import SidebarAluno from '../../sidebar/sidebarALuno';
import { useState, useEffect } from 'react';
import { getTurmas, getAlunos } from '../../../Service/APIServices'; // Importa a função da API

const FaltasAluno = () => {
  // Dados fictícios de faltas
  const faltasData = [
    { disciplina: 'Matemática', totalFaltas: 5, limiteFaltas: 10 },
    { disciplina: 'Português', totalFaltas: 8, limiteFaltas: 10 },
    { disciplina: 'História', totalFaltas: 11, limiteFaltas: 10 },
    { disciplina: 'Geografia', totalFaltas: 3, limiteFaltas: 10 }
  ];

  const [turma, setTurma] = useState(''); // Estado para armazenar a turma do aluno

  // Puxando a turma associada ao aluno
  useEffect(() => {
    const fetchTurmaAluno = async () => {
      try {
        // Primeiro pegamos o aluno específico (exemplo: id=1)
        const alunoResponse = await getAlunos();
        const alunoData = alunoResponse.data[0]; // Supondo que pegamos o primeiro aluno ou conforme a estrutura da API

        // Agora buscamos a turma desse aluno
        const turmaResponse = await getTurmas();
        const turmaDoAluno = turmaResponse.data.find(turma => turma.id === alunoData.turmaId); // Ajuste conforme os dados

        if (turmaDoAluno) {
          setTurma(turmaDoAluno.nome); // Definindo o nome da turma
        }
      } catch (error) {
        console.error('Erro ao buscar a turma do aluno:', error);
      }
    };

    fetchTurmaAluno();
  }, []);

  return (
    <div className="faltas-aluno">
      <SidebarAluno />
      <div className="RegistroAluno">
        <h1>Faltas</h1>
        <h2>Turma: {turma}</h2> {/* Exibe a turma do aluno */}
        <table className="faltas-table">
          <thead>
            <tr>
              <th>Disciplina</th>
              <th>Total de Faltas</th>
              <th>Limite de Faltas</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {faltasData.length > 0 ? (
              faltasData.map((falta, index) => (
                <tr key={index}>
                  <td>{falta.disciplina}</td>
                  <td>{falta.totalFaltas}</td>
                  <td>{falta.limiteFaltas}</td>
                  <td>{falta.totalFaltas > falta.limiteFaltas ? 'Reprovado' : 'Aprovado'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-results">Nenhuma falta encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FaltasAluno;
