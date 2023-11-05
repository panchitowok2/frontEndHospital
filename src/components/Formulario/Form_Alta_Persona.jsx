import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import obtenerEnfermedades from '../../funcionesJS/funciones_enfermedades.js';

const FormAltaPersona = () => {
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
            <h2>Formulario Alta Persona</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                    <label>Nombre</label>
                    <input type="text" {...register("nombre", {
                        required: true,
                        maxLength: 10
                    })} />
                    {errors.nombre?.type === "required" && <p>Campo Nombre Requerido</p>}
                </div>
                <div>
                    <label>Apellido</label>
                    <input type="text" {...register("Apellido", {
                        required: true,
                        maxLength: 10
                    })} />
                    {errors.nombre?.type === 'required' && <p>Campo Apellido Requerido</p>}
                </div>
                <div>
                    <label>Documento</label>
                    <input type="text" {...register("documento", {
                        required: true,
                        maxLength: 10
                    })} />
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
                    <label>Telèfono</label>
                    <input type="text" {...register("telefono", {
                        required: true,
                        maxLength: 15
                    })} />

                </div>
                <div>
                    <label>Nacionalidad</label>
                    <input type="text" {...register("nacionalidad", {
                        required: true,
                        maxLength: 10
                    })} />
                </div>
                <div>
                    <label>Fecha de Nacimiento</label>
                </div>
                <div>
                    <label>Direcciòn</label>
                    <input type="text" {...register("direccion", {
                        required: true,
                        maxLength: 20
                    })} />
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

export default FormAltaPersona;