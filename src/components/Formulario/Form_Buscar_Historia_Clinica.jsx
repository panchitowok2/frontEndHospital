import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const FormBuscarHistoriaClinica = ({onSuccess, onError, id}) => {
    const { handleSubmit } = useForm();

    const onSubmit = async () => {
        let data = {_id: id};
        try {
            const response = await fetch('http://localhost:4000/api/buscar_Id_Historia_Clinica_Persona', {
                method: 'POST', // o el método correspondiente
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // asegúrate de que los datos estén en el formato adecuado
            });
            const historia_clinica = await response.json();
            if (!response.ok) {
                throw new Error(historia_clinica);
            }
            onSuccess(historia_clinica)
        } catch (error) {
            // Aquí puedes manejar errores de la solicitud
            console.error('Error:', error);
            onError(error.message)
        }
    }
    return (
        <div className='d-flex flex-column align-items-center justify-content-center w-100'>
            <h2>Formulario Buscar Historia Clìnica</h2>
            <p>La persona fue encontrada, ahora debemos verificar que la misma no poseea historia clìnica asociada.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                
            <button className="btn btn-primary" type="button submit">
                        Comprobar
                    </button>
            </form>
        </div>
    )

}

export default FormBuscarHistoriaClinica;