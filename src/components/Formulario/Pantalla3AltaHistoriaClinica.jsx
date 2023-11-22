import React, { useState } from 'react';
import FormularioAltaHistoriaClinica from './Form_Alta_Historia_Clinica';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Error from '../Errores/Error_General'
import MensajeExito from '../Mensajes_Exito/Mensajes_Exito'
//pantalla que permite dar de alta una persona
const Pantalla3AltaHistoriaClinica = ({ id }) => {
    const { handleSubmit } = useForm();
    const [idHistoriaClinica, setIdHistoriaClinica] = useState(null);
    const [error, setError] = useState(null);
    const [exito, setMensajeExito] = useState(null);

    const handleSuccess = (id) => {
        setIdHistoriaClinica(id);
        setError(null);
        setMensajeExito(['La historia clínica se creo con éxito'])
    };

    const handleError = (err) => {
        setError(err);
        setIdHistoriaClinica(null);
    };
    const resetError = () => {
        setError([])
    }
    return (
        <div>
            {(!idHistoriaClinica && !error) ? (
                <div className="">
                    <FormularioAltaHistoriaClinica onSuccess={handleSuccess} onError={handleError} id={id} />
                </div>

            ) : (
                error ? 
                <div>
                        <div className=''>
                            <Error errors={error} />
                        </div>
                        <form onSubmit={handleSubmit(resetError)}>
                            <div className="d-flex flex-column align-items-center">
                                <Link to="/">
                                    <button className='btn btn-primary' type="button submit">Ir a la página principal</button>
                                </Link>
                            </div>
                        </form>
                    </div> :
                    <div>
                        <MensajeExito messages={exito} />
                        <div className="d-flex flex-column align-items-center">
                            <Link to="/">
                                <button className='btn btn-primary'>Ir a la página principal</button>
                            </Link>
                        </div>
                    </div>

            )}
        </div>
    )

}

export default Pantalla3AltaHistoriaClinica;