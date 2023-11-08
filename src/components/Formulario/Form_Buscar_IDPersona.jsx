import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const FormBuscarIdPersona = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [responseData, setResponseData] = useState(null);
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
            if (!response.ok) {
                throw new Error('Hubo un problema al procesar la solicitud');
            }
            const idPersona = await response.json(); // o response.text() si la respuesta no es JSON
            await obtenerDatos(idPersona);
        } catch (error) {
            // Aquí puedes manejar errores de la solicitud
            console.error('Error:', error);
            setResponseData({ 'Error': 'La persona no pudo ser encontrada.' })
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
        } catch (error) {
            // Aquí puedes manejar errores de la solicitud
            console.error('Error:', error);
            setResponseData({ 'Error': 'La persona no pudo ser encontrada.' })
        }
    };
    const resetForm = () => {
        setResponseData(null);
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Apellido</label>
                        <input type="text" {...register("apellido", {
                            required: true,
                            maxLength: 15
                        })} />
                        {errors.apellido?.type === "required" && <p>El apellido es requerido</p>}
                    </div>
                    <div>
                        <label>Tipo Documento</label>
                        <select className="form-select" {...register("tipo_documento")}>
                            <option value='DNI'>DNI</option>
                            <option value='LI'>LI</option>
                            <option value='LE'>LE</option>
                        </select>
                    </div>
                    <div>
                        <label>Nùmero Documento</label>
                        <input type="text" {...register("documento", {
                            required: true,
                            maxLength: 9
                        })} />
                        {errors.numero_documento?.type === "required" && <p>El numero de documento es requerido</p>}
                    </div>
                    <div>
                        <label>Sexo</label>
                        <select className="form-select" {...register("sexo")}>
                            <option value='M'>M</option>
                            <option value='F'>F</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" type="button submit">
                        Enviar
                    </button>
                </form>
            )}
        </div>
    );

}

export default FormBuscarIdPersona;