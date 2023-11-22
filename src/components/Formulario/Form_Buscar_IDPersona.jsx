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
        <div className='row'>
            <div className='col-md'>
                <div className='card'>
                    <div className='card-header'>Buscar Persona</div>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit(onSubmit)} className="">
                            <div className="form-floating mb-1">
                                <input type="text" id='apellido' {...register("apellido", { required: true, maxLength: 15 })} className="form-control" />
                                <label htmlFor="apellido">Apellido</label>
                            </div>
                            <div className={`text-danger ${errors.apellido?.type === "required" ? "" : "invisible"}`}>El Apellido de requerido</div>
                            <div className="form-floating mb-1">
                                <select className="form-select" id='tipoDocumento' {...register("tipo_documento")}>
                                    <option value='DNI'>DNI</option>
                                    <option value='LI'>LI</option>
                                    <option value='LE'>LE</option>
                                </select>
                                <label htmlFor="tipoDocumento">Tipo Documento</label>
                            </div>
                            <div className={`text-danger ${errors.tipo_documento?.type === "required" ? "" : "invisible"}`}>El tipo documento es requerido</div>
                            <div className="mb-1 form-floating">
                                <input type="number" id='documento' {...register("documento", { required: true, maxLength: 9 })} className="form-control" />
                                <label htmlFor="documento">Número Documento</label>
                            </div>
                            <div className={`text-danger ${errors.documento?.type === "required" ? "" : "invisible"}`}>El número de documento requerido</div>
                            <div className="mb-1 form-floating">
                                <select className="form-select" id='sexo' {...register("sexo")}>
                                    <option value='M'>Masculino</option>
                                    <option value='F'>Femenino</option>
                                    <option value='F'>No Binario</option>
                                </select>
                                <label htmlFor="sexo">Sexo</label>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-primary mt-3" type="submit">Enviar</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );

}

export default FormBuscarIdPersona;