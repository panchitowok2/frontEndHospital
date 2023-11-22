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
        <div className='footerSiempreAbajo m-3'>
            <div className='col-md-6'>
                <div className='card'>
                    <div className='card-header'>Formulario Alta Persona</div>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body p-3">
                        <h5>Ingrese datos personales:</h5>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="form-floating">
                                    <input type="text" id='nombre' className="form-control" {...register("nombre", { required: true, maxLength: 10 })} />
                                    <label htmlFor="nombre">Nombre</label>
                                </div>
                                <p className={`text-danger ${errors.nombre?.type === "required" ? "" : "invisible"}`}>Nombre Requerido</p>
                            </div>
                            <div className='col-md-6'>
                                <div className="form-floating">
                                    <input type="text" className="form-control" id='apellido' {...register("apellido", { required: true, maxLength: 10 })} />
                                    <label htmlFor="apellido">Apellido</label>
                                </div>
                                <p className={`text-danger ${errors.apellido?.type === "required" ? "" : "invisible"}`}>Apellido Requerido</p>
                            </div>
                            
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="form-floating">
                                    <input type="date" className="form-control" id='fechaNacimiento' {...register("fecha_nacimiento", { required: true })} />
                                    <label htmlFor="fechaNacimiento">FechaNacimiento</label>
                                </div>
                                <p className={`text-danger ${errors.fecha_nacimiento?.type === "required" ? "" : "invisible"}`}>Fecha Nacimiento Requerida</p>
                            </div>
                            <div className='col-md-6'>
                                <div className="form-floating">
                                    <input type="text" className="form-control" id='direccion' {...register("direccion", { required: true, maxLength: 20 })} />
                                    <label htmlFor="direccion">Dirección</label>
                                </div>
                                <p className={`text-danger ${errors.direccion?.type === "required" ? "" : "invisible"}`}>Dirección Requerida</p>
                            </div>
                        </div>
                        <div className='row'>
                        <div className='col-md-6'>
                                <div className="form-floating">
                                    <select className="form-select" id='tipoDocumento' {...register("tipo_documento")}>
                                        <option value='DNI'>DNI</option>
                                        <option value='LI'>LI</option>
                                        <option value='LE'>LE</option>
                                    </select>
                                    <label htmlFor="tipoDocumento">Tipo Documento</label>
                                </div>
                                <p className={`text-danger ${errors.tipo_documento?.type === "required" ? "" : "invisible"}`}>Tipo Documento Requerido</p>
                            </div>
                            <div className='col-md-6'>
                                <div className="form-floating">
                                    <input type="number" className="form-control" id='documento' {...register("documento", { required: true, maxLength: 10 })} />
                                    <label htmlFor="documento">Documento</label>
                                </div>
                                <p className={`text-danger ${errors.documento?.type === "required" ? "" : "invisible"}`}>Documento Requerido</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="form-floating">
                                    <input type="text" className="form-control" id='nacionalidad' {...register("nacionalidad", { required: true, maxLength: 10 })} />
                                    <label htmlFor="nacionalidad">Nacionalidad</label>
                                </div>
                                <p className={`text-danger ${errors.nacionalidad?.type === "required" ? "" : "invisible"}`}>Nacionalidad Requerida</p>
                            </div>
                            <div className='col-md-6'>
                                <div className="form-floating">
                                    <select className="form-select" id='sexo' {...register("sexo")}>
                                        <option value='M'>Masculino</option>
                                        <option value='F'>Femenino</option>
                                        <option value='X'>No Binario</option>
                                    </select>
                                    <label htmlFor="sexo">Sexo</label>
                                </div>
                                <p className={`text-danger ${errors.sexo?.type === "required" ? "" : "invisible"}`}>Sexo Requerido</p>
                            </div>
                        </div>
                        <h5>Ingrese datos de contacto:</h5>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="form-floating">
                                    <input type="text" className="form-control" id='telefono' {...register("telefono", { required: true, maxLength: 15 })} />
                                    <label htmlFor="telefono">Teléfono</label>
                                </div>
                                <p className={`text-danger ${errors.telefono?.type === "required" ? "" : "invisible"}`}>Teléfono Requerido</p>
                            </div>
                            <div className='col-md-6'>
                                <div className="form-floating">
                                    <input type="email" className="form-control" id='email' {...register("email", { required: true, maxLength: 50 })} />
                                    <label htmlFor="email">E-Mail</label>
                                </div>
                                <p className={`text-danger ${errors.email?.type === "required" ? "" : "invisible"}`}>Email Requerido</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary mt-2" type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default FormAltaPersona;