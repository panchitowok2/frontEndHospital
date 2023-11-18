import React from 'react';

const Error_General = ({ errors }) => {

  return(
    errors.length > 0 && 
      <div class="alert alert-danger mt-3">
        <p> <strong> Error al procesar la transacción </strong> </p>

        <ul>
          {errors.map((error, index) => (
            
              <li key={index}> {error} </li>
            
          ))}
        </ul>
      </div>
  )
}

export default Error_General;