import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import obtenerEnfermedades from '../../funcionesJS/funciones_enfermedades.js';

const FormBuscarIdPersona = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);

    }
    const [enfermedades, setEnfermedades] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await obtenerEnfermedades();
                setEnfermedades(data);
            } catch (error) {
                // Manejar errores
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <h2>Formulario Buscar Persona</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Apellido</label>
                    <input type="text" {...register("Apellido", {
                        required: true,
                        maxLength: 15
                    })} />
                    {errors.nombre?.type === "required" && <p>Campo Requerido</p>}
                </div>
                <div>
                    <label>Tipo Documento</label>
                    <select {...register("tipo_documento")}>
                        <option value='DNI'>DNI</option>
                        <option value='LI'>LI</option>
                        <option value='LE'>LE</option>
                    </select>
                </div>
                <div>
                    <label>Nùmero Documento</label>
                    <input type="text" {...register("Nùmero Documento", {
                        required: true,
                        maxLength: 9
                    })} />
                    {errors.nombre?.type === "required" && <p>Campo Requerido</p>}
                </div>
                <div>
                    <label>Sexo</label>
                    <select {...register("sexo")}>
                        <option value='M'>M</option>
                        <option value='F'>F</option>
                    </select>
                </div>
                <input type="submit" value="Enviar" />
            </form>
        </div>
    )

}

export default FormBuscarIdPersona;