import './DisciplinasProf.css';
import SidebarProf from '../../sidebar/sidebarProf';

const DisciplinasProf = () => {
    // Dados estáticos de disciplinas
    const disciplinas = [
        { nome: 'Matemática', descricao: 'Matéria de Álgebra e Geometria', nomeTurma: 'Turma A' },
        { nome: 'Português', descricao: 'Gramática e Literatura', nomeTurma: 'Turma B' },
        { nome: 'História', descricao: 'História do Brasil e do Mundo', nomeTurma: 'Turma C' },
    ];

    return (
        <div className="turmas-prof">
            <SidebarProf />

            <div className="registro-turma">
                <h1>Disciplinas</h1>

                <table className="turmas-tables">
                    <thead>
                        <tr>
                            <th>Disciplina</th>
                            <th>Descrição</th>
                            <th>Turma</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disciplinas.length > 0 ? (
                            disciplinas.map((disciplina, index) => (
                                <tr key={index}>
                                    <td>{disciplina.nome}</td>
                                    <td>{disciplina.descricao}</td>
                                    <td>{disciplina.nomeTurma}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="no-results">Nenhuma disciplina encontrada.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DisciplinasProf;
