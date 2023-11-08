import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const FormBuscarHistoriaClinica = (idPersona) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);

    }
    return (
        <div className='d-flex flex-column align-items-center justify-content-center w-100'>
            <h2>Formulario Buscar Historia Clìnica</h2>
            <p>La persona fue encontrada, ahora debemos verificar que la misma no poseea historia clìnica asociada.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                
            <button className="btn btn-primary" type="button submit">
                        Buscar
                    </button>
            </form>
        </div>
    )

}

export default FormBuscarHistoriaClinica;