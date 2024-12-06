import '../../Themes/themesAlunos.css';
import SidebarAluno from '../../sidebar/sidebarALuno';

const ConceitoAluno = () => {

    const conceitos = [
        {
            disciplina: 'Matemática',
            avaliacao1: 7.5,
            avaliacao2: 8.0,
            avaliacao3: 6.5,
            conceitoRecuperacao: 0,
        },
        {
            disciplina: 'Português',
            avaliacao1: 9.0,
            avaliacao2: 8.5,
            avaliacao3: 7.0,
            conceitoRecuperacao: 0,
        },
        {
            disciplina: 'História',
            avaliacao1: 5.5,
            avaliacao2: 6.0,
            avaliacao3: 4.5,
            conceitoRecuperacao: 7.0,
        },
    ];
    const turma = '3 Turma A';

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
        <div className="container-principal">
            <SidebarAluno />

            <div className="card-principal">
                <h1>Conceitos</h1>
                <h2> {turma}</h2>

                <table className="card-table">
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
