import React from 'react';

const MensajesExito = ({ messages }) => {

  return (
    messages.length > 0 && 
      <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
        <p> <strong> ¡Bien hecho! Transacción exitosa </strong> </p>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        
        <ul style={{ listStyle: 'none' }}>
          {messages.map((message, index) => (
            <li key={index}>
              <i className="bi bi-check-circle-fill me-3"></i> {message}
            </li>
          ))}
        </ul>
      </div>
  );
}

export default MensajesExito;
