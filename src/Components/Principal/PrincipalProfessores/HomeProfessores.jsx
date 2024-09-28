// Tela de gestão de professores (visível apenas para coordenadores)//

/*import { useState, useEffect } from 'react';
import './Professores.css';

const Professores = () => {
  const [professores, setProfessores] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Simular uma chamada à API para obter os professores
    setProfessores([
      { id: 1, nome: "Prof. Silva", disciplina: "Matemática" },
      { id: 2, nome: "Prof. Costa", disciplina: "História" }
    ]);
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="Container">
      <h1 id="MedioTec">Professores</h1>
      <button onClick={handleEditClick}>
        {isEditing ? 'Cancelar Edição' : 'Editar Professores'}
      </button>
      <ul>
        {professores.map(professor => (
          <li key={professor.id}>
            {professor.nome} - {professor.disciplina}
            {isEditing && (
              <button>Editar</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Professores;*/
