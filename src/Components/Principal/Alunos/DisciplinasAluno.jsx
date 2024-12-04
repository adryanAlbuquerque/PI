import '../../Themes/themesAlunos.css';
import SidebarAluno from '../../sidebar/sidebarALuno';
import { useState, useEffect } from 'react';
import { getDisciplina } from '../../../Service/APIServices'; // Ajuste o serviço conforme necessário

const DisciplinasAluno = () => {
    const [disciplinas, setDisciplinas] = useState([]);
    const [turma, setTurma] = useState('');

    useEffect(() => {
        getDisciplina()
            .then(response => {
                console.log('Disciplinas recebidas:', response.data);
                setDisciplinas(response.data);
                if (response.data.length > 0) {
                    setTurma(response.data[0].turma); // Ajuste conforme a estrutura dos dados
                }
            })
            .catch(error => {
                console.error('Erro ao buscar disciplinas:', error);
            });
    }, []);

    return (
        <div className="container-principal">
            <SidebarAluno />

            <div className="card-principal">
                <h1>Disciplinas</h1>
                <h2>Turma: {turma}</h2>

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
                                    <td>{disciplina.nome}</td> {/* Ajuste conforme o campo retornado pela API */}
                                    <td>{disciplina.professor}</td> {/* Ajuste conforme o campo retornado pela API */}
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
