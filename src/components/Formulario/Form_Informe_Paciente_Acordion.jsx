import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Buscar_Persona from '../Persona/Buscar_Persona';
import Ficha_Paciente from '../Formulario_Alta_Tratamiento_Farmacologico/Ficha_Paciente';
import Error_General from '../Errores/Error_General';
import Mensajes_Exito from '../Mensajes_Exito/Mensajes_Exito';
import Informe from './Pantalla_Informe_Acordion.jsx'
import Tratamientos from './Form_Tratamientos_Farmacologicos.jsx';

const Formulario_Informe_Paciente_Acordion = () => {
    const [errors, setErrors] = useState([]);
    const [messages, setMessages] = useState([]);

    const [id, setId] = useState("");
    const [tipoDocumento, setTipoDocumento] = useState("");
    const [documento, setDocumento] = useState("");
    const [apellido, setApellido] = useState("");
    const [sexo, setSexo] = useState("");

    const [persona, setPersona] = useState("");
    const [historiaClinica, setHistoriaClinica] = useState("");

    const [buscandoPersona, setBuscandoPersona] = useState(false);
    const personaState = {
        id,
        setId,
        tipoDocumento,
        setTipoDocumento,
        documento,
        setDocumento,
        apellido,
        setApellido,
        sexo,
        setSexo,
        persona,
        setPersona,
        historiaClinica,
        setHistoriaClinica,
        buscandoPersona,
        setBuscandoPersona,
        setErrors
    };

    const {
        isAuthenticated
    } = useAuth0();

    if (!isAuthenticated) {
        return (<h1> No estas logeado </h1>)
    }
    return (
        <div className='m-3 footerSiempreAbajo'>
            <Mensajes_Exito messages={messages} />
            <Error_General errors={errors} />

            <h1 className="fs-2"> <i className="bi bi-book"></i> Informe de Paciente</h1>
            <div className="row mt-3">
                <div className="col-md-9">
                    <p>
                        Ahora podes ver los datos de tus consultas y tus tratamientos farmacológicos en un solo lugar.
                    </p>
                    <p>
                        Debes ingresar la información del paciente, y si existe, se cargaran sus datos en los menús desplegables que se encuentran a continuación.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-md mt-3">
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    1. Datos del Paciente
                                </button>
                            </h2>

                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne">
                                <div className="accordion-body">
                                    <Buscar_Persona state={personaState} />

                                    <div className="d-md-none mt-3">
                                        <Ficha_Paciente state={personaState} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    2. Datos de Consultas
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo">
                                <div className="accordion-body">
                                    <Informe id={id} />
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    3. Datos de Tratamientos Farmacológicos
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree">
                                <div className="accordion-body">
                                    <Tratamientos id={id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mt-3 d-none d-md-block ms-auto">
                    <Ficha_Paciente state={personaState} />
                </div>
            </div>
        </div>
    )

}

export default Formulario_Informe_Paciente_Acordion;