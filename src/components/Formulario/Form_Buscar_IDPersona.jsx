import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Error_General from './Error_General';
const FormBuscarIdPersona = ({ onSuccess, onError }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [responseData, setResponseData] = useState(null);
    const [errorsTransaction, setErrors] = useState([]);
    //metodo para obtener el id de la persona
    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:4000/api/buscar_IdPersona', {
                method: 'POST', // o el método correspondiente
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // asegúrate de que los datos estén en el formato adecuado
            });
            const idPersona = await response.json();
            if (!response.ok) {
                throw new Error(idPersona.message);
            }

            onSuccess(idPersona)
            await obtenerDatos(idPersona);
        } catch (err) {
            // Aquí puedes manejar errores de la solicitud
            console.error('Error:', err);
            setErrors([err.message])
            onError(err.message)
        }
    };
    //metodo para obtener los datos de la persona
    const obtenerDatos = async (data) => {
        try {
            const entrada = { "_id": data }
            const response = await fetch('http://localhost:4000/api/buscar_Datos_Persona', {
                method: 'POST', // o el método correspondiente
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(entrada) // asegúrate de que los datos estén en el formato adecuado
            });
            if (!response.ok) {
                throw new Error('Hubo un problema al procesar la solicitud');
            }
            const respuesta = await response.json(); // o response.text() si la respuesta no es JSON
            // Aquí puedes manejar la respuesta del servidor si es necesario
            setResponseData(respuesta);
        } catch (err) {
            // Aquí puedes manejar errores de la solicitud
            console.error('Error:', err);
            setErrors([err.message])
            setResponseData({ 'Error': 'La persona no pudo ser encontrada.' })
        }
    };
    const resetForm = () => {
        setResponseData(null);
        setErrors([])
    };
    //metodo para quitar las claves que no deseeamos que se vean en el front
    const removeUnwantedKeys = (obj) => {
        const unwantedKeys = ['_id', 'historia_clinica', '__v']; // claves no deseadas
        return Object.keys(obj)
            .filter(key => !unwantedKeys.includes(key)) // filtrar las claves no deseadas
            .reduce((acc, key) => {
                acc[key] = obj[key];
                return acc;
            }, {});
    };

    return (
        <div className='d-flex flex-column align-items-center justify-content-center w-100'>
            <h2>Formulario Buscar Persona</h2>
            {responseData ? (
                <div>
                    <table className='table table-striped'>
                        <tbody>
                            {Object.entries(removeUnwantedKeys(responseData)).map(([key, value], index) => (
                                <tr key={index}>
                                    <td>{key}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-primary" type="button" onClick={resetForm}>
                        Buscar otra persona
                    </button>
                </div>

            ) : (
                <div>
                <Error_General errors={errorsTransaction}/>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-light border rounded">
                    <div className="mb-3">
                        <label className="form-label">Apellido</label>
                        <input type="text" {...register("apellido", { required: true, maxLength: 15 })} className="form-control" />
                        {errors.apellido?.type === "required" && <p className="text-danger">El apellido es requerido</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tipo Documento</label>
                        <select className="form-select" {...register("tipo_documento")}>
                            <option value='DNI'>DNI</option>
                            <option value='LI'>LI</option>
                            <option value='LE'>LE</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Número Documento</label>
                        <input type="text" {...register("documento", { required: true, maxLength: 9 })} className="form-control" />
                        {errors.numero_documento?.type === "required" && <p className="text-danger">El número de documento es requerido</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Sexo</label>
                        <select className="form-select" {...register("sexo")}>
                            <option value='M'>M</option>
                            <option value='F'>F</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary mt-3" type="submit">Enviar</button>
                    </div>
                </form>

                </div>
            )}
        </div>
    );

}

export default FormBuscarIdPersona;