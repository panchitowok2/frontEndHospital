import React, { useState} from 'react';
import { useForm } from 'react-hook-form';

const FormAltaPersona = ({onSuccess, onError}) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [responseData, setResponseData] = useState(null);
    const onSubmit = async (data) => {
        try {
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
            setResponseData(idPersona)
            onSuccess(idPersona.id)
            console.log(idPersona)
        } catch (error) {
            // Aquí puedes manejar errores de la solicitud
            console.error('Error:', error);
            onError(error.message)
            setResponseData('Error')
        }
    }
    const resetForm = () => {
        setResponseData(null);
    };
    return (
        <div className='d-flex flex-column align-items-center justify-content-center w-100 mb-5'>
            <h2>Formulario Alta Persona</h2>
            {responseData ? (
                responseData === 'Error' ? (
                    <div className="text-center">
                        <div className="fs-4 mb-3">Error, los ingresados ya pertenecen a otra persona.</div>
                        <button className="btn btn-primary" type="button" onClick={resetForm}>
                            Intentar Nuevamente
                        </button>
                    </div>


                ) : (
                    <div className="text-center">
                        <div className="fs-4 mb-3">La persona se creo exitosamente.</div>
                        <button className="btn btn-primary" type="button" onClick={resetForm}>
                            Crear otra persona
                        </button>
                    </div>
                )


            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-light rounded">
                    <div className='row'>
                        <h3>Ingrese datos de la persona:</h3>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input type="text" className="form-control" {...register("nombre", { required: true, maxLength: 10 })} />
                                {errors.nombre?.type === "required" && <p className="text-danger">Nombre Requerido</p>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Tipo Documento</label>
                                <select className="form-select" {...register("tipo_documento")}>
                                    <option value='DNI'>DNI</option>
                                    <option value='LI'>LI</option>
                                    <option value='LE'>LE</option>
                                </select>
                                {errors.tipo_documento?.type === 'required' && <p className="text-danger">Tipo Documento Requerido</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Fecha de Nacimiento</label>
                                <input type="date" className="form-control" {...register("fecha_nacimiento", { required: true })} />
                                {errors.fecha_nacimiento?.type === 'required' && <p className="text-danger">Fecha Nacimiento Requerida</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Direcciòn</label>
                                <input type="text" className="form-control" {...register("direccion", { required: true, maxLength: 20 })} />
                                {errors.direccion?.type === 'required' && <p className="text-danger">Direccion Requerida</p>}
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Apellido</label>
                                <input type="text" className="form-control" {...register("apellido", { required: true, maxLength: 10 })} />
                                {errors.apellido?.type === 'required' && <p className="text-danger">Apellido Requerido</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Documento</label>
                                <input type="text" className="form-control" {...register("documento", { required: true, maxLength: 10 })} />
                                {errors.documento?.type === 'required' && <p className="text-danger">Documento Requerido</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nacionalidad</label>
                                <input type="text" className="form-control" {...register("nacionalidad", { required: true, maxLength: 10 })} />
                                {errors.nacionalidad?.type === 'required' && <p className="text-danger">Nacionalidad Requerida</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Sexo</label>
                                <select className="form-select" {...register("sexo")}>
                                    <option value='M'>M</option>
                                    <option value='F'>F</option>
                                </select>
                                {errors.sexo?.type === 'required' && <p className="text-danger">Sexo Requerido</p>}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <h3>Ingrese datos de contacto:</h3>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Telèfono</label>
                                <input type="text" className="form-control" {...register("telefono", { required: true, maxLength: 15 })} />
                                {errors.telefono?.type === 'required' && <p className="text-danger">Telefono Requerido</p>}
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" {...register("email", { required: true, maxLength: 50 })} />
                                {errors.email?.type === 'required' && <p className="text-danger">Email Requerido</p>}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary mt-3" type="submit">Enviar</button>
                    </div>
                </form>
            )}
        </div>

    );

}

export default FormAltaPersona;