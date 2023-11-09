import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormBuscarIdPersona from './Form_Buscar_IDPersona';
const FormInformePaciente = () => {
    const { formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);

    }
    const [idPersona, setIdPersona] = useState(null);
  const [error, setError] = useState(null);

  const handleSuccess = (id) => {
    setIdPersona(id);
    setError(null);
  };

  const handleError = (err) => {
    setError(err);
    setIdPersona(null);
  };
    return (
        <div>
            <h1>Informe de paciente</h1>
            {!idPersona ? (
            <FormBuscarIdPersona onSuccess={handleSuccess} onError={handleError}/>
            ) : (
                <div>hola</div>
            )}
            
        </div>
    )

}

export default FormInformePaciente;