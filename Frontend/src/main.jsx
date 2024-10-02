import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';  // CSS geral da aplicação

// Renderizando o App no elemento root
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
  
);
