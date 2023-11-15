import React, { useState } from 'react';
import FormAltaPersona from './Form_Alta_Persona';
import Pantalla3AltaHistoriaClinica from './Pantalla3AltaHistoriaClinica';
//pantalla que permite dar de alta una persona
const Pantalla2AltaHistoriaClinica = ({resetError}) => {
    const [idPersona, setIdPersona] = useState(null);
    const [error, setError] = useState(null);
    
    const handleSuccess = (id) => {
        setIdPersona(id);
        setError(null);
        resetError();
    };

    const handleError = (err) => {
        setError(err);
        setIdPersona(null);
    };

    return (
        <div>
            {!idPersona && !error ? (
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
                <h3>Para poder dar de alta la historia clinica, debes crear a la persona.</h3>
                <FormAltaPersona onSuccess={handleSuccess} onError={handleError} />
            </div>
            
            ) : (
                error ? <div>Dio Error</div> :
                 <div>
                    <Pantalla3AltaHistoriaClinica id={idPersona}/>
                 </div>
                 
            )}
        </div>
    )

}

export default Pantalla2AltaHistoriaClinica;