import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ErrorGeneral from './Error_General';
//pantalla de inicio de transaccion de alta historia clinica
const Pantalla3InformePaciente = ({ id }) => {

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
        buscarDatosPaciente();
    }, []);

    return (
        <div className="border border-black rounded w-75">
            {(!error && datosPaciente) ? (
                <div>
                    {datosPaciente.map((paciente, index) => (
                        <div key={index}>
                            <div className="row">
                                <div className="col-4">
                                    <nav id="indice" className="h-100 flex-column align-items-stretch pe-4 border-end">
                                        <nav className="nav nav-pills flex-column">
                                            <a className="nav-link text-dark" href="#item-1">Datos del paciente</a>
                                            <a className="nav-link text-dark" href="#item-2">Historia clínica</a>
                                            <a className="nav-link text-dark" href="#item-3">Consultas</a>
                                            <a className="nav-link text-dark" href="#item-4">Medico que atendió consultas</a>
                                            <a className="nav-link text-dark" href="#item-5">Tratamientos farmacológicos</a>
                                            <a className="nav-link text-dark" href="#item-6">Diagnóstico de cada tratamiento</a>
                                            <a className="nav-link text-dark" href="#item-7">Medicamento dosificado</a>
                                            <a className="nav-link text-dark" href="#item-8">Dosificación para cada tratamiento</a>
                                            <a className="nav-link text-dark" href="#item-9">Profesional que receto el tratamiento</a>
                                        </nav>
                                    </nav>
                                </div>

                                <div className="col-8" style={{ height: '500px', overflowY: 'scroll' }} data-bs-spy="scroll">
                                    <div data-bs-target="#indice" data-bs-smooth-scroll="true" className="scrollspy-example-2 p-2" tabIndex="0">
                                        <div id="item-1">
                                            <div className="container border bg-light rounded">
                                                <h4 className="text-dark">Datos del paciente:</h4>
                                            </div>
                                            <p><strong>Tipo de Documento:</strong> {paciente.tipo_documento}</p>
                                            <p><strong>Documento:</strong> {paciente.documento}</p>
                                            <p><strong>Nombre:</strong> {paciente.nombre}</p>
                                            <p><strong>Apellido:</strong> {paciente.apellido}</p>

                                        </div>
                                        <div id="item-2">
                                            <div className="container border bg-light rounded">
                                                <h4 className="bg-light text-dark">Historia clínica:</h4>
                                            </div>
                                            {paciente.historia_clinica.map((historia, index) => (
                                                <div key={index}>
                                                    <p><strong>Grupo Sanguíneo:</strong> {historia.grupo_sanguineo}</p>
                                                    <p><strong>Factor Sanguíneo:</strong> {historia.factor_sanguineo}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="item-3">
                                            <div className="container border bg-light rounded">
                                                <h4 className="bg-light text-dark">Consultas:</h4>
                                            </div>
                                            {paciente.consultas.map((con, index) => (
                                                <div key={index}>
                                                    <h4>Consulta {index + 1}:</h4>
                                                    <p><strong>Sintomas:</strong> {con.sintomas}</p>
                                                    <p><strong>Observación:</strong> {con.observacion}</p>
                                                    <p><strong>Fecha:</strong> {con.fecha_y_hora}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="item-4">
                                            <div className="container border bg-light rounded">
                                                <h4 className="bg-light text-dark">Medico que atendiò consultas:</h4>
                                            </div>
                                            {paciente.datosPersonalesMedicoQueAtendioConsulta.map((medi, index) => (
                                                <div key={index}>
                                                    <h4>Consulta {index + 1}:</h4>
                                                    <p><strong>Legajo:</strong> {medi.datosMedico.legajo}</p>
                                                    <p><strong>Matricula:</strong> {medi.datosMedico.matricula}</p>
                                                    <p><strong>Titulo:</strong> {medi.datosMedico.titulo}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="item-5">
                                            <div className="container border bg-light rounded">
                                                <h4 className="bg-light text-dark">Tratamientos farmacológicos:</h4>
                                            </div>
                                            {paciente.tratamientos_farmacologicos.map((trat, index) => (
                                                <div key={index}>
                                                    <h4>Tratamiento farmacológico {index + 1}:</h4>
                                                    <p><strong>Descripción:</strong> {trat.descripcion}</p>
                                                    <p><strong>Duración:</strong> {trat.duracion}</p>
                                                    <p><strong>Fecha inicio:</strong> {trat.fecha_inicio}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="item-6">
                                            <div className="container border bg-light rounded">
                                                <h4 className="bg-light text-dark">Diagnóstico de cada tratamiento:</h4>
                                            </div>
                                            {paciente.diagnosticos_tratamiento.map((diag, index) => (
                                                <div key={index}>
                                                    <h4>Para el tratamiento {index + 1}:</h4>
                                                    <p><strong>Descripción:</strong> {diag.descripcion}</p>
                                                    <p><strong>Observaciones:</strong> {diag.observaciones}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="item-7">
                                            <div className="container border bg-light rounded">
                                                <h4 className="bg-light text-dark">Medicamento dosificado:</h4>
                                            </div>
                                            {paciente.medicamentoDosificado.map((med, index) => (
                                                <div key={index}>
                                                    <h4>Tratamiento {index + 1}:</h4>
                                                    <p><strong>Droga:</strong> {med.droga}</p>
                                                    <p><strong>Nombre:</strong> {med.nombre}</p>
                                                    <p><strong>Presentación:</strong> {med.presentacion}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="item-8">
                                            <div className="container border bg-light rounded">
                                                <h4 className="bg-light text-dark">Dosificación para cada tratamiento:</h4>
                                            </div>
                                            {paciente.dosificacionDeCadaTratamiento.map((dosif, index) => (
                                                <div key={index}>
                                                    <h4>Tratamiento {index + 1}:</h4>
                                                    <p><strong>Dósis:</strong> {dosif.dosis}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="item-9">
                                            <div className="container border bg-light rounded">
                                                <h4 className="bg-light text-dark">Profesional que receto el tratamiento:</h4>
                                            </div>
                                            {paciente.profesionalQueRecetoTratamiento.map((prof, index) => (
                                                <div key={index}>
                                                    <h4>Tratamiento {index + 1}:</h4>
                                                    <p><strong>Nombre:</strong> {prof.nombre}</p>
                                                    <p><strong>Apellido:</strong> {prof.apellido}</p>
                                                    <p><strong>Telófono:</strong> {prof.telefono}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
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
                <p>Cargando...</p>
            )

            )}
        </div >
    )
}

export default Pantalla3InformePaciente;