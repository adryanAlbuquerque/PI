import './DisciplinasProf.css';
import SidebarProf from '../../sidebar/sidebarProf';
import { useState, useEffect } from 'react';
import { getTurmas } from '../../../Service/APIServices'; 

const TurmaProf = () => {
    const [turmas, setTurmas] = useState([]);  // Estado para armazenar as turmas

    useEffect(() => {
        // Buscar turmas do professor ao montar o componente
        const fetchTurmas = async () => {
            try {
                const data = await getTurmas(); // Função para buscar turmas da API
                setTurmas(data);
            } catch (error) {
                console.error('Erro ao buscar turmas:', error);
            }
        };

        fetchTurmas();
    }, []);  // Executa apenas uma vez, ao montar o componente

    return (
        <div className="turmas-prof">
            <SidebarProf />

            <div className="registro-turma">
                <h1>Turmas</h1>

                <table className="turmas-tables">
                    <thead>
                        <tr>
                            <th>Turma</th>
                            <th>Disciplina</th>
                        </tr>
                    </thead>
                    <tbody>
                        {turmas.length > 0 ? (
                            turmas.map((turma, index) => (
                                <tr key={index}>
                                    <td>{turma.nomeTurma}</td>  {/* Ajuste conforme os dados da API */}
                                    <td>{turma.nomeDisciplina}</td> {/* Ajuste conforme os dados da API */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="no-results">Nenhuma turma encontrada.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TurmaProf;
