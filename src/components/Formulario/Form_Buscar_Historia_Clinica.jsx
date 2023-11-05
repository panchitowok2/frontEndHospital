import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import obtenerEnfermedades from '../../funcionesJS/funciones_enfermedades.js';

const FormBuscarHistoriaClinica = (idPersona) => {
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
            <h2>Formulario Buscar Historia Clìnica</h2>
            <p>La persona fue encontrada, ahora debemos verificar que la misma no poseea historia clìnica asociada.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="submit" value="Buscar Historia Clìnica" />
            </form>
        </div>
    )

}

export default FormBuscarHistoriaClinica;