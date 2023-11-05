import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import obtenerEnfermedades from '../../funcionesJS/funciones_enfermedades.js';

const FormularioAltaHistoriaClinica = () => {
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
            <h2>Formulario Alta Historia Clìnica</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                    <label>Grupo Sanguineo</label>
                    <select {...register("grupo_sanguineo")}>
                        <option value='A'>A</option>
                        <option value='B'>B</option>
                        <option value='AB'>AB</option>
                        <option value='O'>O</option>                        
                    </select>
                    {errors.nombre?.type === "required" && <p>Campo Factor Sanguineo Requerido</p>}
                </div>
                <div>
                    <label>Factor Sanguineo</label>
                    <select {...register("factor_sanguineo")}>
                        <option value='+'>+</option>
                        <option value='-'>-</option>                 
                    </select>
                    {errors.nombre?.type === 'required' && <p>Campo Grupo Sanguineo Requerido</p>}
                </div>
                
                <input type="submit" value="Enviar" />
            </form>
        </div>
    )

}

export default FormularioAltaHistoriaClinica;