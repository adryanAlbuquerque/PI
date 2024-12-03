import '../../Themes/themesAlunos.css';
import SidebarAluno from '../../sidebar/sidebarALuno';

const HorarioAluno = () => {
  return (
    <div className="container-principal">
      <SidebarAluno />

      <div className="card-principal">
        <h1>Horário</h1>

        <table className="card-table">
          <thead>
            <tr>
              <th>Horário</th>
              <th>Segunda</th>
              <th>Terça</th>
              <th>Quarta</th>
              <th>Quinta</th>
              <th>Sexta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>08:00 - 10:00</td>
              <td>Matemática</td>
              <td>História</td>
              <td>Português</td>
              <td>Física</td>
              <td>Biologia</td>
            </tr>
            <tr>
              <td>10:15 - 12:15</td>
              <td>Química</td>
              <td>Geografia</td>
              <td>Inglês</td>
              <td>Educação Física</td>
              <td>Artes</td>
            </tr>
            <tr>
              <td>13:30 - 15:30</td>
              <td>Filosofia</td>
              <td>Sociologia</td>
              <td>Matemática</td>
              <td>Química</td>
              <td>História</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HorarioAluno;
