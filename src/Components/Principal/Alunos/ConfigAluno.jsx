import '../../Themes/themesAlunos.css';
import SidebarAluno from '../../sidebar/sidebarALuno';
import { useState } from 'react';

const ConfiguracoesAluno = () => {
    const [idioma, setIdioma] = useState('Português');
    const [notificacoes, setNotificacoes] = useState(true);

    // Função para manipular a troca de idioma
    const handleIdiomaChange = (event) => {
        setIdioma(event.target.value);
    };

    // Função para alternar notificações
    const handleNotificacoesChange = () => {
        setNotificacoes(!notificacoes);
    };

    return (
        <div className="container-principal">
            <SidebarAluno />

            <div className="card-principal">
                <h1>Configurações</h1>

                <div className="config-section">
                    <h2>Idioma</h2>
                    <select value={idioma} onChange={handleIdiomaChange} className="config-select">
                        <option value="Português">Português</option>
                        <option value="Inglês">Inglês</option>
                        <option value="Espanhol">Espanhol</option>
                    </select>
                </div>

                <div className="config-section">
                    <h2>Notificações</h2>
                    <label className="config-toggle">
                        <input
                            type="checkbox"
                            checked={notificacoes}
                            onChange={handleNotificacoesChange}
                        />
                        Ativar notificações
                    </label>
                </div>

                {/* Mais configurações podem ser adicionadas aqui */}
            </div>
        </div>
    );
}

export default ConfiguracoesAluno;
