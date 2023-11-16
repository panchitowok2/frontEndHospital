import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Error_General from './Error_General';
import FormBuscarHistoriaClinica from './Form_Buscar_Historia_Clinica';
import Pantalla3InformePaciente from './Pantalla3InformePaciente';
//pantalla de inicio de transaccion de alta historia clinica
const Pantalla2InformePaciente = ({ id }) => {
    const { handleSubmit } = useForm();
    const [idHistoriaClinica, setIdHistoriaClinica] = useState(null);
    const [error, setError] = useState(null);
    const [errorsTransaction, setErrors] = useState([]);//para el mensaje de error

    const handleSuccess = (id) => {
        setIdHistoriaClinica(id);
        setError(null);
    };

    const handleError = (err) => {
        setError(err);
        setIdHistoriaClinica(null);
        setErrors([err])
    };

    const resetError = () => {
        setErrors([])
    }

    return (
        <div>
            {(!idHistoriaClinica && !error) ? (
                <div>
                    <FormBuscarHistoriaClinica onSuccess={handleSuccess} onError={handleError} id={id} />
                </div>
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
                        <Pantalla3InformePaciente id={id} />
                    </div>
                )
            )}
        </div>
    )

}

export default Pantalla2InformePaciente;