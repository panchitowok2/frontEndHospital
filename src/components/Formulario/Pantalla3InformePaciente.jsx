import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Error_General from './Error_General';
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
                method: 'POST', // o el método correspondiente
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // asegúrate de que los datos estén en el formato adecuado
            });
            const informe = await response.json();
            if (!response.ok) {
                throw new Error(informe);
            }
            console.log('La respuesta del server fue: ', informe[0])
            handleDatosPaciente(informe)
        } catch (error) {
            // Aquí puedes manejar errores de la solicitud
            console.error('Error:', error);
            handleError(error.message)
        }
    }

    useEffect(() => {
        buscarDatosPaciente();
    }, []);

    return (
        <div className="border border-black rounded">
            {(!error && datosPaciente) ? (
                <div>
                    {datosPaciente.map((paciente, index) => (
                        <div key={index}>
                            <div className="row">
                                <div className="col-4">
                                    <nav id="navbar-example3" className="h-100 flex-column align-items-stretch pe-4 border-end">
                                        <nav className="nav nav-pills flex-column">
                                            <a className="nav-link text-dark" href="#item-1">Datos del paciente</a>
                                            <a className="nav-link text-dark" href="#item-2">Historia clìnica</a>
                                            <a className="nav-link text-dark" href="#item-3">Consultas</a>
                                            <a className="nav-link text-dark" href="#item-4">Medico que atendiò consultas</a>
                                            <a className="nav-link text-dark" href="#item-5">Tratamientos farmacològicos</a>
                                            <a className="nav-link text-dark" href="#item-6">Diagnòstico de cada tratamiento</a>
                                            <a className="nav-link text-dark" href="#item-7">Medicamento dosificado</a>
                                            <a className="nav-link text-dark" href="#item-8">Dosificacion para cada tratamiento</a>
                                            <a className="nav-link text-dark" href="#item-9">Profesional que receto el tratamiento</a>
                                        </nav>
                                    </nav>
                                </div>

                                <div className="col-8" style={{height:'500px', overflowY: 'scroll' }}>
                                    <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" className="scrollspy-example-2 p-2" tabIndex="0">
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
                                            <div className="container">
                                                <h4 className="p-2 bg-light text-dark">Historia clìnica:</h4>
                                            </div>
                                            {paciente.historia_clinica.map((historia, index) => (
                                                <div key={index}>
                                                    <p><strong>Grupo Sanguíneo:</strong> {historia.grupo_sanguineo}</p>
                                                    <p><strong>Factor Sanguíneo:</strong> {historia.factor_sanguineo}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="item-3">
                                            <div className="container">
                                                <h4 className="p-2 bg-light text-dark">Consultas:</h4>
                                            </div>
                                            {paciente.consultas.map((con, index) => (
                                                <div key={index}>
                                                    <h4>Consulta {index + 1}:</h4>
                                                    <p><strong>Sintomas:</strong> {con.sintomas}</p>
                                                    <p><strong>Observacion:</strong> {con.observacion}</p>
                                                    <p><strong>Fecha:</strong> {con.fecha_y_hora}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="item-4">
                                            <div className="container">
                                                <h4 className="p-2 bg-light text-dark">Medico que atendiò consultas:</h4>
                                            </div>
                                            {paciente.datosPersonalesMedicoQueAtendioConsulta.map((medi, index) => (
                                                <div key={index}>
                                                    <h4>Consulta {index + 1}:</h4>
                                                    <p><strong>Legajo:</strong> {medi.datosMedico.legajo}</p>
                                                    <p><strong>Matricula:</strong> {medi.datosMedico.matricula}</p>
                                                    <p><strong>Tìtulo:</strong> {medi.datosMedico.titulo}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="item-5">
                                            <div className="container">
                                                <h4 className="p-2 bg-light text-dark">Tratamientos farmacològicos:</h4>
                                            </div>
                                            {paciente.tratamientos_farmacologicos.map((trat, index) => (
                                                <div key={index}>
                                                    <h4>Tratamiento farmacològico {index + 1}:</h4>
                                                    <p><strong>Descripciòn:</strong> {trat.descripcion}</p>
                                                    <p><strong>Duraciòn:</strong> {trat.duracion}</p>
                                                    <p><strong>Fecha inicio:</strong> {trat.fecha_inicio}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="item-6">
                                            <div className="container">
                                                <h4 className="p-2 bg-light text-dark">Diagnòstico de cada tratamiento:</h4>
                                            </div>
                                            {paciente.diagnosticos_tratamiento.map((diag, index) => (
                                                <div key={index}>
                                                    <h4>Para el tratamiento {index + 1}:</h4>
                                                    <p><strong>Descripciòn:</strong> {diag.descripcion}</p>
                                                    <p><strong>Observaciones:</strong> {diag.observaciones}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="item-7">
                                            <div className="container">
                                                <h4 className="p-2 bg-light text-dark">Medicamento dosificado:</h4>
                                            </div>
                                            {paciente.medicamentoDosificado.map((med, index) => (
                                                <div key={index}>
                                                    <h4>Tratamiento {index + 1}:</h4>
                                                    <p><strong>Droga:</strong> {med.droga}</p>
                                                    <p><strong>Nombre:</strong> {med.nombre}</p>
                                                    <p><strong>Presentaciòn:</strong> {med.presentacion}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="item-8">
                                            <div className="container">
                                                <h4 className="p-2 bg-light text-dark">Dosificacion para cada tratamiento:</h4>
                                            </div>
                                            {paciente.dosificacionDeCadaTratamiento.map((dosif, index) => (
                                                <div key={index}>
                                                    <h4>Tratamiento {index + 1}:</h4>
                                                    <p><strong>Dosis:</strong> {dosif.dosis}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="item-9">
                                            <div className="container">
                                                <h4 className="p-2 bg-light text-dark">Profesional que receto el tratamiento:</h4>
                                            </div>
                                            {paciente.profesionalQueRecetoTratamiento.map((prof, index) => (
                                                <div key={index}>
                                                    <h4>Tratamiento {index + 1}:</h4>
                                                    <p><strong>Nombre:</strong> {prof.nombre}</p>
                                                    <p><strong>Apellido:</strong> {prof.apellido}</p>
                                                    <p><strong>Telèfono:</strong> {prof.telefono}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            ) : (
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
            )}
        </div>
    )

}

export default Pantalla3InformePaciente;