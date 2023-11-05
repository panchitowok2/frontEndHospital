import React,{ useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import obtenerEnfermedades from '../../funcionesJS/funciones_enfermedades.js';

const Formulario=()=>{
  const {register,formState:{errors},handleSubmit}=useForm();
  const onSumit=(data)=>{
    console.log(data);

  }
  const [enfermedades, setEnfermedades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerEnfermedades();
        setEnfermedades(data);
      } catch (error) {
        // Manejar errores
      }
    };

    fetchData();
  }, []);
  return(
    <div>
      <h2>formulario prueba 1</h2>
      <form onSubmit={handleSubmit(onSumit)}>
        <div>
          <label>nombre</label>
          <input type="text" {...register("nombre",{required:true,
          maxLength:10
          })} />
          {errors.nombre?.type==="required" && <p>campo requerido</p>}
        </div>
        <div>
          <label >direccion</label>
          <input type="text" {...register("direccion")} />
        </div>
        <div>
          <label >edad</label>
          <input type="number" {...register("edad")} />
        </div>
        <div>
          
          <label >pais</label>
          <select {...register("pais")}>
          {enfermedades.map((enfermedad) => (
        <option value={enfermedad._id}>{enfermedad.nombre}</option>
      ))}
          </select>
        </div>
        <input type="submit"  value="enviar"/>
      </form>
    </div>
  )

}

export default Formulario;