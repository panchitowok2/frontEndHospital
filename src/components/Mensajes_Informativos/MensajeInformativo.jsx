import React, { useState } from 'react';

const MensajeInformativo = ({ messages }) => {
  const [mostrarAlerta, setMostrarAlerta] = useState(true);

  return (
    mostrarAlerta && messages.length > 0 && 
      <div className="alert alert-warning alert-dismissible fade show mt-3" role="alert">
        <p> <strong> Atención: </strong> </p>
        <button type="button" className="btn-close" onClick={() => setMostrarAlerta(false)} aria-label="Close"></button>
        
        <ul style={{ listStyle: 'none' }}>
          {messages.map((message, index) => (
            <li key={index}>
              <i className="bi bi-arrow-right me-3"></i> {message}
            </li>
          ))}
        </ul>
      </div>
  );
}


export default MensajeInformativo;
