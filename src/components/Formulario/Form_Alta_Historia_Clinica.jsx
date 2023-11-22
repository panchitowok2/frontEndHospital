import { useForm } from 'react-hook-form';

const FormularioAltaHistoriaClinica = ({ onSuccess, onError, id }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        try {
            data._id = id
            const response = await fetch('http://localhost:4000/api/alta_historia_clinica', {
                method: 'POST', // o el método correspondiente
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // asegúrate de que los datos estén en el formato adecuado
            });
            const historia_clinica = await response.json();
            if (!response.ok) {
                throw new Error(historia_clinica.message);
            }
            onSuccess(historia_clinica.hist_clinica._id)
        } catch (error) {
            onError(error)
        }
    }
    return (
        <div className='card col-md-4'>
            <div className='card-header'>Formulario Alta Historia Clínica</div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div>
                    <label>Grupo Sanguíneo</label>
                    <select className="form-select" {...register("grupo_sanguineo")}>
                        <option value='A'>A</option>
                        <option value='B'>B</option>
                        <option value='AB'>AB</option>
                        <option value='O'>O</option>
                    </select>
                    {errors.nombre?.type === "required" && <p>Campo Factor Sanguineo Requerido</p>}
                </div>
                <div>
                    <label>Factor Sanguíneo</label>
                    <select className="form-select" {...register("factor_sanguineo")}>
                        <option value='+'>+</option>
                        <option value='-'>-</option>
                    </select>
                    {errors.nombre?.type === 'required' && <p>Campo Grupo Sanguineo Requerido</p>}
                </div>

                <div className="mt-2 d-flex justify-content-end">
                    <button className="btn btn-primary" type="button submit">
                        Enviar
                    </button>
                </div>
            </form>
        </div>

    )

}

export default FormularioAltaHistoriaClinica;