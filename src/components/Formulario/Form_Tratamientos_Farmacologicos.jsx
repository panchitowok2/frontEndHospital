import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ErrorGeneral from './Error_General';
import moment from 'moment'
//pantalla de inicio de transaccion de alta historia clinica
const FormularioTratamientos = ({ id }) => {

    moment.locale('es');
    const { handleSubmit } = useForm();
    const [error, setError] = useState(null);
    const [errorsTransaction, setErrors] = useState([]);//para el mensaje de error
    const [datosPaciente, setDatosPaciente] = useState(null);
    const handleError = (err) => {
        setError(err);
        setErrors([err]);
        setDatosPaciente(null);
    };

    const handleDatosPaciente = (data) => {
        setDatosPaciente(data);
        setError(null)
    };

    const resetError = () => {
        setErrors([])
    }
    const buscarDatosPaciente = async () => {
        let data = { _id: id };
        try {
            const response = await fetch('http://localhost:4000/api/elaborarInformePaciente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const informe = await response.json();
            if (!response.ok) {
                throw new Error(informe);
            }
            handleDatosPaciente(informe)
        } catch (error) {
            handleError(error)
        }
    };
    useEffect(() => {
        if (id != "") {
            buscarDatosPaciente(id)
        } else {
            setDatosPaciente("")
        }
    }, [id]);

    return (
        <div >
            {(!error && datosPaciente) ? (
                <div>
                    {datosPaciente.map((paciente, index) => (
                        <div key={index}>
                            {Object.keys(paciente.datosTratamientos).map((key) => (

                                <div key={key}>


                                    {paciente.datosTratamientos[key].map((trat, ind) => (
                                        <div key={ind}>
                                            <div className='row'>
                                                <div className="col-md">
                                                    <h4>Fecha de inicio del tratamiento: {moment(trat.fecha_y_hora).format('dddd D-M-YYYY')}</h4>
                                                    <p><strong>Descripción:</strong> {trat.descripcion}
                                                    <br />
                                                    <strong>Duración:</strong> {trat.duracion}</p>                                                    
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col-md">
                                                    <h5>Médico que receto el tratamiento:</h5>
                                                    {trat.medicoRecetoTratamiento.map((medi, index) => (
                                                        <div key={index}>
                                                            <p><strong>Legajo:</strong> {medi.legajo}
                                                            <br />
                                                            <strong>Matricula:</strong> {medi.matricula}
                                                            <br />
                                                            <strong>Título:</strong> {medi.titulo}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col-md">
                                                    <h5>Diagnóstico</h5>
                                                    {trat.diagnosticoTratamiento.map((diag, index) => (
                                                        <div key={index}>
                                                            <p><strong>Descripción:</strong> {diag.descripcion}
                                                            <br />
                                                            <strong>Observaciones:</strong> {diag.observaciones}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col-md">
                                                    <h5>Dosificación:</h5>
                                                    {trat.dosificacionesTratamiento.map((dosif, index) => (
                                                        <div key={index}>
                                                            <p><strong>Dósis:</strong> {dosif.dosis}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col-md">
                                                    <h5>Medicamento:</h5>
                                                    {trat.medicamentoDosificaciones.map((med, index) => (
                                                        <div key={index}>
                                                            <p><strong>Droga:</strong> {med.droga}
                                                            <br />
                                                            <strong>Nombre:</strong> {med.nombre}
                                                            <br />
                                                            <strong>Presentación:</strong> {med.presentacion}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                    <hr className='m-3' />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (error ? (
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
                <p>Esperando búsqueda de paciente</p>
            )

            )
            }
        </div >
    )
}

export default FormularioTratamientos;