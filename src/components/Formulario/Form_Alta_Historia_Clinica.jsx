import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const FormularioAltaHistoriaClinica = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);

    }
    return (
        <div className='d-flex flex-column align-items-center justify-content-center w-100'>
            <h2>Formulario Alta Historia Clìnica</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                    <label>Grupo Sanguineo</label>
                    <select className="form-select" {...register("grupo_sanguineo")}>
                        <option value='A'>A</option>
                        <option value='B'>B</option>
                        <option value='AB'>AB</option>
                        <option value='O'>O</option>                        
                    </select>
                    {errors.nombre?.type === "required" && <p>Campo Factor Sanguineo Requerido</p>}
                </div>
                <div>
                    <label>Factor Sanguineo</label>
                    <select className="form-select" {...register("factor_sanguineo")}>
                        <option value='+'>+</option>
                        <option value='-'>-</option>                 
                    </select>
                    {errors.nombre?.type === 'required' && <p>Campo Grupo Sanguineo Requerido</p>}
                </div>
                
                <button className="btn btn-primary" type="button submit">
                        Enviar
                    </button>
            </form>
        </div>
    )

}

export default FormularioAltaHistoriaClinica;