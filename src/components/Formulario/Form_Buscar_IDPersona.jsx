import { useForm } from 'react-hook-form';
const FormBuscarIdPersona = ({ onSuccess, onError }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    //metodo para obtener el id de la persona
    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:4000/api/buscar_IdPersona', {
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

            onSuccess(idPersona)
        } catch (err) {
            onError(err.message)
        }
    };
    return (
        <div className='card w-50'>
            <h2 className='card-header'>Buscar Persona</h2>
                <div className='card-body'>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-light border rounded">
                        <div className="input-group mb-3">
                            <span className="input-group-text">Apellido</span>
                            <input type="text" {...register("apellido", { required: true, maxLength: 15 })} className="form-control" />
                        </div>
                        {errors.apellido?.type === "required" && <p className="text-danger">El apellido es requerido</p>}
                        <div className="mb-3 input-group">
                            <span className='input-group-text'>Tipo Documento</span>
                            <select className="form-select" {...register("tipo_documento")}>
                                <option value='DNI'>DNI</option>
                                <option value='LI'>LI</option>
                                <option value='LE'>LE</option>
                            </select>
                        </div>
                        <div className="mb-3 input-group">
                            <span className='input-group-text'>Número Documento</span>
                            <input type="number" {...register("documento", { required: true, maxLength: 9 })} className="form-control" />
                        </div>
                        {errors.documento?.type === "required" && <p className="text-danger">El número de documento es requerido</p>}
                        <div className="mb-3 input-group">
                            <span className='input-group-text'>Sexo</span>
                            <select className="form-select" {...register("sexo")}>
                                <option value='M'>M</option>
                                <option value='F'>F</option>
                            </select>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary mt-3" type="submit">Enviar</button>
                        </div>
                    </form>

                </div>
        </div>
    );

}

export default FormBuscarIdPersona;