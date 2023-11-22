import React, { useState } from 'react';
import FormBuscarIdPersona from './Form_Buscar_IDPersona';
import Pantalla2AltaHistoriaClinica from './Pantalla2AltaHistoriaClinica';
import Pantalla4AltaHistoriaClinica from './Pantalla4AltaHistoriaClinica';
import ErrorGeneral from '../Mensajes_Informativos/MensajeInformativo';
import { useAuth0 } from '@auth0/auth0-react';
//pantalla de inicio de transaccion de alta historia clinica
const Pantalla1AltaHistoriaClinica = () => {

    const {isAuthenticated} = useAuth0();
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
        setErrors([err,'Para poder crear una historia clínica debes crear una persona'])
    };

    const resetError = () => {
        setErrors([])
    }
    if (!isAuthenticated) {
        return (<h1> No estas logeado </h1>)
    }
    return (
        <div className='m-3 footerSiempreAbajo'>
            <h1 className="fs-2"> <i className="bi bi-pen"></i> Registrar Historia Clínica</h1>
            {!idPersona && !error ? (
                <div className='row'>
                    <div className='col-lg-4'>
                        <FormBuscarIdPersona onSuccess={handleSuccess} onError={handleError} />
                    </div>
                </div>
            ) : (
                error ? (
                    <div>
                        <div className=''>
                            <ErrorGeneral messages={errorsTransaction} />
                        </div>
                        <Pantalla2AltaHistoriaClinica resetError={resetError} />
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