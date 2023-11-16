import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FormBuscarIdPersona from './Form_Buscar_IDPersona';
import Pantalla2InformePaciente from './Pantalla2InformePaciente';
import Error_General from './Error_General';
//pantalla de inicio de transaccion de alta historia clinica
const Pantalla1InformePaciente = () => {

    const { handleSubmit } = useForm();
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
        <div className="m-3">
            <h1>Informe Paciente</h1>
            { (!idPersona && !error) ? (
                <FormBuscarIdPersona onSuccess={handleSuccess} onError={handleError} />
            ) : (
                error ? (
                    <div>
                        <Error_General errors={errorsTransaction} />
                        <form onSubmit={handleSubmit(resetError)}>
                            <div className="d-flex flex-column align-items-center">
                                <Link to="/">
                                    <button className='btn btn-primary' type="button submit">Ir a la página principal</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div>
                        <Pantalla2InformePaciente id={idPersona} />
                    </div>
                )
            )}
        </div>
    )

}

export default Pantalla1InformePaciente;