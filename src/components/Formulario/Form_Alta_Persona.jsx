import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const FormAltaPersona = ({ onSuccess, onError, resetError }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        try {
            resetError();
            const response = await fetch('http://localhost:4000/api/altaPersona', {
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
            onSuccess(idPersona.id)
        } catch (error) {
            // Aquí puedes manejar errores de la solicitud
            onError(error.message)
        }
    }
    return (
        <div className='card d-flex mb-5'>
            <h2 className='card-header'>Formulario Alta Persona</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body p-5 bg-light rounded">
                <div className='row'>
                    <h3>Ingrese datos de la persona:</h3>
                    <div className='col'>
                        <div className="input-group">
                            <span className='input-group-text'>Nombre</span>
                            <input type="text" className="form-control" {...register("nombre", { required: true, maxLength: 10 })} />
                        </div>
                        <p className={`text-danger ${errors.nombre?.type === "required" ? "" : "invisible"}`}>Nombre Requerido</p>
                        <div className="input-group">
                            <span className='input-group-text'>Tipo Documento</span>
                            <select className="form-select" {...register("tipo_documento")}>
                                <option value='DNI'>DNI</option>
                                <option value='LI'>LI</option>
                                <option value='LE'>LE</option>
                            </select>
                        </div>
                        <p className={`text-danger ${errors.tipo_documento?.type === "required" ? "" : "invisible"}`}>Tipo Documento Requerido</p>
                        <div className="input-group">
                            <span className='input-group-text'>Fecha de Nacimiento</span>
                            <input type="date" className="form-control" {...register("fecha_nacimiento", { required: true })} />
                        </div>
                        <p className={`text-danger ${errors.fecha_nacimiento?.type === "required" ? "" : "invisible"}`}>Fecha Nacimiento Requerida</p>
                        <div className="input-group">
                            <span className='input-group-text'>Dirección</span>
                            <input type="text" className="form-control" {...register("direccion", { required: true, maxLength: 20 })} />
                        </div>
                        <p className={`text-danger ${errors.direccion?.type === "required" ? "" : "invisible"}`}>Dirección Requerida</p>
                    </div>
                    <div className='col'>
                        <div className="input-group">
                            <span className='input-group-text'>Apellido</span>
                            <input type="text" className="form-control" {...register("apellido", { required: true, maxLength: 10 })} />
                        </div>
                        <p className={`text-danger ${errors.apellido?.type === "required" ? "" : "invisible"}`}>Apellido Requerido</p>
                        <div className="input-group">
                            <span className='input-group-text'>Documento</span>
                            <input type="number" className="form-control" {...register("documento", { required: true, maxLength: 10 })} />
                        </div>
                        <p className={`text-danger ${errors.documento?.type === "required" ? "" : "invisible"}`}>Documento Requerido</p>
                        <div className="input-group">
                            <span className='input-group-text'>Nacionalidad</span>
                            <input type="text" className="form-control" {...register("nacionalidad", { required: true, maxLength: 10 })} />
                        </div>
                        <p className={`text-danger ${errors.nacionalidad?.type === "required" ? "" : "invisible"}`}>Nacionalidad Requerida</p>
                        <div className="input-group">
                            <span className='input-group-text'>Sexo</span>
                            <select className="form-select" {...register("sexo")}>
                                <option value='M'>M</option>
                                <option value='F'>F</option>
                            </select>
                        </div>
                        <p className={`text-danger ${errors.sexo?.type === "required" ? "" : "invisible"}`}>Sexo Requerido</p>
                    </div>
                </div>
                <div className='row'>
                    <h3>Ingrese datos de contacto:</h3>
                    <div className='col'>
                        <div className="input-group">
                            <span className='input-group-text'>Teléfono</span>
                            <input type="text" className="form-control" {...register("telefono", { required: true, maxLength: 15 })} />
                        </div>
                        <p className={`text-danger ${errors.telefono?.type === "required" ? "" : "invisible"}`}>Teléfono Requerido</p>
                    </div>
                    <div className='col'>
                        <div className="input-group">
                            <span className='input-group-text'>E-mail</span>
                            <input type="email" className="form-control" {...register("email", { required: true, maxLength: 50 })} />
                        </div>
                        <p className={`text-danger ${errors.email?.type === "required" ? "" : "invisible"}`}>Email Requerido</p>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary mt-2" type="submit">Enviar</button>
                </div>
            </form>
        </div>

    );

}

export default FormAltaPersona;