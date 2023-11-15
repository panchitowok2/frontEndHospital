import React, { useState } from 'react';
import FormularioAltaHistoriaClinica from './Form_Alta_Historia_Clinica';
import { Link } from 'react-router-dom';
//pantalla que permite dar de alta una persona
const Pantalla3AltaHistoriaClinica = ({ id }) => {
    const [idHistoriaClinica, setIdHistoriaClinica] = useState(null);
    const [error, setError] = useState(null);

    const handleSuccess = (id) => {
        setIdHistoriaClinica(id);
        setError(null);
    };

    const handleError = (err) => {
        setError(err);
        setIdHistoriaClinica(null);
    };

    return (
        <div>
            {(!idHistoriaClinica && !error) ? (
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <h3>Ingrese los datos de la historia clinica.</h3>
                    <FormularioAltaHistoriaClinica onSuccess={handleSuccess} onError={handleError} id={id} />
                </div>

            ) : (
                error ? <div>Dio Error</div> :
                    <div>
                        <div className='d-flex flex-column align-items-center'>
                            <h3>La historia clinica se creo con exito</h3>
                        </div>
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