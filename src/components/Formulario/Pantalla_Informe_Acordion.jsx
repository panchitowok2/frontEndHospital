import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ErrorGeneral from './Error_General';
import moment from 'moment'
import 'moment/locale/es';


//pantalla de inicio de transaccion de alta historia clinica
const Pantalla_Informe_Acordion = ({ id }) => {

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
                            <div className='row'>
                                <div className="col-md">
                                    {paciente.consultas.map((con, index) => (
                                        <div>
                                            <div key={index}>
                                                <h4>Fecha de consulta: {moment(con.fecha_y_hora).format('dddd D-M-YYYY')}</h4>
                                                <p><strong>Sintomas:</strong> {con.sintomas}
                                                <br />
                                                <strong>Observación:</strong> {con.observacion}</p>                                                
                                                <h4>Médico</h4>
                                                <p><strong>Legajo:</strong> {paciente.medicoQueAtendioConsulta[index].legajo}
                                                <br />
                                                <strong>Matricula:</strong> {paciente.medicoQueAtendioConsulta[index].matricula}
                                                <br />
                                                <strong>Título:</strong> {paciente.medicoQueAtendioConsulta[index].titulo}</p>

                                            </div>
                                            <hr className='m-2' />
                                        </div>
                                    ))}
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
                <p>Esperando búsqueda de paciente</p>
            )

            )
            }
        </div >
    )
}

export default Pantalla_Informe_Acordion;