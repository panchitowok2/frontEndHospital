import React, { useState } from 'react';
import FormBuscarIdPersona from './Form_Buscar_IDPersona';
import Pantalla2AltaHistoriaClinica from './Pantalla2AltaHistoriaClinica';
import Pantalla4AltaHistoriaClinica from './Pantalla4AltaHistoriaClinica';
import ErrorGeneral from './Error_General';
//pantalla de inicio de transaccion de alta historia clinica
const Pantalla1AltaHistoriaClinica = () => {

    const [idPersona, setIdPersona] = useState(null);
    const [error, setError] = useState(null);
    const [errorsTransaction, setErrors] = useState([]);//para el mensaje de error

    const handleSuccess = (id) => {
        setIdPersona(id);
        setError(null);
    };

    const handleError = (err) => {
        setError(err);
        setIdPersona(null);
        setErrors([err])
    };

    const resetError = () => {
        setErrors([])
    }

    return (
        <div className='m-3 w-100 align-items-center'>
            <h1>Alta Historia Clínica</h1>
            {!idPersona && !error ? (
                <div className='d-flex w-100 justify-content-center'>
                <FormBuscarIdPersona onSuccess={handleSuccess} onError={handleError} />
                </div>
            ) : (
                error ? (
                    <div>
                        <div className='d-flex w-100 justify-content-center'>
                        <ErrorGeneral errors={errorsTransaction} />
                        </div>
                        <Pantalla2AltaHistoriaClinica resetError={resetError}/>
                    </div>
                ) : (
                    <div>
                        <Pantalla4AltaHistoriaClinica id={idPersona} />
                    </div>
                )
            )}
        </div>
    )

}

export default Pantalla1AltaHistoriaClinica;