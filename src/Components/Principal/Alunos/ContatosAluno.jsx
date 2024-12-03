import '../../Themes/themesAlunos.css';
import SidebarAluno from '../../sidebar/sidebarALuno';

const Contatos = () => {
  return (
    <div className="container-principal">
      <SidebarAluno />

      <div className="card-principal">
        <h1>Contatos</h1>
        <div className="contact-list">
          <div className="contact-item">
            <h3>Suporte Acadêmico</h3>
            <p>Email: suporte@mediotec.senac.com</p>
            <p>Telefone: (81) 1234-5678</p>
          </div>

          <div className="contact-item">
            <h3>Coordenação</h3>
            <p>Email: coordenacao@mediotec.senac.com</p>
            <p>Telefone: (81) 8765-4321</p>
          </div>

          <div className="contact-item">
            <h3>Central de Atendimento Senac</h3>
            <p>Email: senac@pe.senac.br</p>
            <p>Telefone: 0800 081 1688</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contatos;
