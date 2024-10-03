/*import { useState, useEffect } from 'react';
import './Comunicados.css';

const Comunicados = () => {
  const [comunicados, setComunicados] = useState([]);
  const [comunicado, setComunicado] = useState("");

  useEffect(() => {
    // Simular uma chamada à API para obter comunicados
    setComunicados([
      { id: 1, texto: "Reunião de pais na próxima semana." },
      { id: 2, texto: "Não haverá aula na sexta-feira." }
    ]);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para emitir um comunicado
    alert(`Comunicado enviado: ${comunicado}`);
  };

  return (
    <div className="Container">
      <h1 id="MedioTec">Comunicados</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Digite o comunicado"
          onChange={(e) => setComunicado(e.target.value)}
        ></textarea>
        <button id="button">Enviar Comunicado</button>
      </form>
      <ul>
        {comunicados.map(comunicado => (
          <li key={comunicado.id}>{comunicado.texto}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comunicados;*/
