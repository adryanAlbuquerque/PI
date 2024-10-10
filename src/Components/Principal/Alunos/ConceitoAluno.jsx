import './ConceitoAluno.css';
import SidebarAluno from '../../sidebar/sidebarALuno';
import { useState, useEffect } from 'react';
import { getConceitos } from '../../../Service/APIServices'; 


const ConceitoAluno = () => {

    const [conceitos, setConceitos] = useState([]);
    const [turma, setTurma] = useState('');

    useEffect(() => {
        getConceitos()
        .then(response => {
            console.log('Conceitos recebidos:', response.data);
            setConceitos(response.data);
            setTurma(response.data.turma); // Ajuste conforme a estrutura de dados
        })
        .catch(error => {
            console.error('Erro ao buscar conceitos:', error);
        });
    }, []);

    const calcularMedia = (avaliacoes) => {
        const soma = avaliacoes.reduce((acc, conceito) => acc + conceito, 0);
        return (soma / avaliacoes.length).toFixed(2);
    };

    const verificarSituacao = (media, conceitoRecuperacao) => {
        if (media >= 6) return 'Aprovado';
        if (conceitoRecuperacao && (media + conceitoRecuperacao) / 2 >= 6) return 'Aprovado na Recuperação';
        return 'Reprovado';
    };

    return (
        <div className="conceitos-aluno">
        <SidebarAluno />

        <div className="RegistroAluno">
            <h1>Conceitos</h1>
            <h2>Turma: {turma}</h2>

            <table className="conceitos-table">
            <thead>
                <tr>
                <th>Disciplina</th>
                <th>AV 1</th>
                <th>AV 2</th>
                <th>AV 3</th>
                <th>Recuperação</th>
                <th>Média</th>
                <th>Situação</th>
                </tr>
            </thead>
            <tbody>
                {conceitos.length > 0 ? (
                conceitos.map((conceito, index) => {
                    const media = calcularMedia([conceito.avaliacao1, conceito.avaliacao2, conceito.avaliacao3]);
                    const situacao = verificarSituacao(media, conceito.conceitoRecuperacao);

                    return (
                    <tr key={index}>
                        <td>{conceito.disciplina}</td>
                        <td>{conceito.avaliacao1}</td>
                        <td>{conceito.avaliacao2}</td>
                        <td>{conceito.avaliacao3}</td>
                        <td>{conceito.conceitoRecuperacao || '-'}</td>
                        <td>{media}</td>
                        <td>{situacao}</td>
                    </tr>
                    );
                })
                ) : (
                <tr>
                    <td colSpan="7" className="no-results">Nenhum conceito encontrado.</td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </div>
    );


}

export default ConceitoAluno; 