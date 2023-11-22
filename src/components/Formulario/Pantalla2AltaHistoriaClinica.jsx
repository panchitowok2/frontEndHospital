import React, { useState } from 'react';
import FormAltaPersona from './Form_Alta_Persona';
import Pantalla3AltaHistoriaClinica from './Pantalla3AltaHistoriaClinica';
import ErrorGeneral from '../Errores/Error_General';
import MensajeExito from '../Mensajes_Exito/Mensajes_Exito'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
//pantalla que permite dar de alta una persona
const Pantalla2AltaHistoriaClinica = ({ resetError }) => {

    const { isAuthenticated } = useAuth0();
    const { handleSubmit } = useForm();
    const [idPersona, setIdPersona] = useState(null);
    const [mensajeExito, setMensajeExito] = useState(null);
    const [error, setError] = useState(null);
    const [errorsTransaction, setErrors] = useState([]);//para el mensaje de error    

    const handleSuccess = (id) => {
        setIdPersona(id);
        setError(null);
        setMensajeExito(['Felicitaciones! La persona se creó exitosamente'])
        resetError();
    };

    const handleError = (err) => {
        setError(err);
        setIdPersona(null);
        setErrors([err]);
    };
    if (!isAuthenticated) {
        return (<h1> No estas logeado </h1>)
    }
    return (
        <div>
            {!idPersona && !error ? (
                <div>
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
                        <MensajeExito messages={mensajeExito} />
                        <Pantalla3AltaHistoriaClinica id={idPersona} />
                    </div>
                )
            )}
        </div>
    )

}

export default Pantalla2AltaHistoriaClinica;