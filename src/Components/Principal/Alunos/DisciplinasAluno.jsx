import '../../Themes/themesAlunos.css';
import SidebarAluno from '../../sidebar/sidebarALuno';

const DisciplinasAluno = () => {

    const disciplinas = [
        {
            nome: 'Matemática',
            professor: 'Prof. João Silva',
        },
        {
            nome: 'Português',
            professor: 'Prof. Maria Oliveira',
        },
        {
            nome: 'História',
            professor: 'Prof. Carlos Souza',
        },
    ];
    
    const turma = '3 Turma A'; 

    return (
        <div className="container-principal">
            <SidebarAluno />

            <div className="card-principal">
                <h1>Disciplinas</h1>
                <h2>{turma}</h2>

                <table className="card-table">
                    <thead>
                        <tr>
                            <th>Disciplina</th>
                            <th>Professor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disciplinas.length > 0 ? (
                            disciplinas.map((disciplina, index) => (
                                <tr key={index}>
                                    <td>{disciplina.nome}</td>
                                    <td>{disciplina.professor}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="no-results">Nenhuma disciplina encontrada.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DisciplinasAluno;
