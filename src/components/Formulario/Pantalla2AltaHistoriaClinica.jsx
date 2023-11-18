import React, { useState } from 'react';
import FormAltaPersona from './Form_Alta_Persona';
import Pantalla3AltaHistoriaClinica from './Pantalla3AltaHistoriaClinica';
import ErrorGeneral from './Error_General.jsx';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
//pantalla que permite dar de alta una persona
const Pantalla2AltaHistoriaClinica = ({ resetError }) => {

    const { handleSubmit } = useForm();
    const [idPersona, setIdPersona] = useState(null);
    const [error, setError] = useState(null);
    const [errorsTransaction, setErrors] = useState([]);//para el mensaje de error    

    const handleSuccess = (id) => {
        setIdPersona(id);
        setError(null);
        resetError();
    };

    const handleError = (err) => {
        console.log('El error que llego a pantalla 2 es: ', err)
        setError(err);
        setIdPersona(null);
        setErrors([err]);
    };

    return (
        <div>
            {!idPersona && !error ? (
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <h3>Para poder dar de alta la historia clinica, debes crear a la persona.</h3>
                    <FormAltaPersona onSuccess={handleSuccess} onError={handleError} resetError={resetError} />
                </div>

            ) : (
                error ? (
                    <div>
                        <ErrorGeneral errors={errorsTransaction} />
                        <form onSubmit={handleSubmit(resetError)}>
                            <div className="d-flex flex-column align-items-center">
                                <Link to="/">
                                    <button className='btn btn-primary' type="button submit">Ir a la página principal</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className='d-flex w-100 justify-content-center'>
                        <Pantalla3AltaHistoriaClinica id={idPersona} />
                    </div>
                )
            )}
        </div>
    )

}

export default Pantalla2AltaHistoriaClinica;