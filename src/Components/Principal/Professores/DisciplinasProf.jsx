import './DisciplinasProf.css';
import SidebarProf from '../../sidebar/sidebarProf';
import { useState, useEffect } from 'react';
import { getProfessorDisciplinas } from '../../../Service/APIServices'; // Função para buscar disciplinas do professor

const DisciplinasProf = () => {
    const [disciplinas, setDisciplinas] = useState([]);  // Estado para armazenar as disciplinas

    useEffect(() => {
        // Buscar disciplinas do professor ao montar o componente
        const fetchDisciplinas = async () => {
            try {
                const data = await getProfessorDisciplinas(); // Função para buscar disciplinas associadas ao professor
                setDisciplinas(data);  // Armazenar as disciplinas no estado
            } catch (error) {
                console.error('Erro ao buscar disciplinas:', error);
            }
        };

        fetchDisciplinas();
    }, []);  // Executa apenas uma vez, ao montar o componente

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
                            <th>Turma</th>  {/* Nova coluna para turma */}
                        </tr>
                    </thead>
                    <tbody>
                        {disciplinas.length > 0 ? (
                            disciplinas.map((disciplina, index) => (
                                <tr key={index}>
                                    <td>{disciplina.nome}</td> {/* Exibe o nome da disciplina */}
                                    <td>{disciplina.descricao}</td> {/* Exibe a descrição da disciplina */}
                                    <td>{disciplina.nomeTurma}</td> {/* Exibe o nome da turma vinculada */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="no-results">Nenhuma disciplina encontrada.</td> {/* Mensagem de resultado vazio */}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DisciplinasProf;
