import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import obtener_Enfermedades from '../../funcionesJS/funciones_enfermedades.js';
import obtener_consultas_por_enfermedad from '../../funcionesJS/funciones_consultas.js';

const Formulario_Consultas_ordenadas_por_enfermedad = () => {
  const [errors, setErrors] = useState([]);
  const [enfermedades, set_enfermedades] = useState([]);

  // variables del formulario
  const[enfermedad,set_enfermedad]=useState("")
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [consultas, set_consultas] = useState([]);
  const {
    isAuthenticated
  } = useAuth0();

  let handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const resultado = await obtener_consultas_por_enfermedad(enfermedad,fechaInicio,fechaFin)
console.log(resultado);
set_consultas(resultado) 
setErrors([])
    } catch (error) {
      setErrors([error.message])
      set_consultas([]);
    }
  }

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const data= await obtener_Enfermedades();
        set_enfermedades(data)
      } catch (error) {
        
      }
    };
    fetchData();



  },[]);
  if (!isAuthenticated) {
    return(<h1>no estas logeado reeeee</h1>)
    
  }
  return(<div>
    {errors.length > 0 && 
      <div class="alert alert-danger mt-3">
        <p> <strong> Error al procesar la transacción </strong> </p>

        <ul>
          {errors.map((error) => (
            <ul>
              <li> {error} </li>
            </ul>
          ))}
        </ul>
      </div>
      }
      <h2 class="mb-3"> Obtener consultas realizadas para un tipo de enfermedad</h2>
      <form class="mb-3" onSubmit={handleSubmit}>
        <div  class="form-floating mb-3 w-50">
        <select class="form-select" id="enfermedad" aria-label="Seleccion de enfermedad" value={enfermedad} onChange={(e) => set_enfermedad(e.target.value)} required>
        <option selected value="">Seleccioná una opción</option>
            {enfermedades.map((enfermedad) => (
              <option value={enfermedad._id}>{enfermedad.nombre}</option>
            ))}
          </select>
          <label for="enfermedad">Enfermedad</label>
        </div>

        <div class="form-floating mb-3 w-50">
          <input type="date" class="form-control" id="fechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required/>
          <label for="fechaInicio">Fecha de inicio</label>
        </div>

        <div class="form-floating mb-3 w-50">
          <input type="date" class="form-control" id="fechaFin" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required/>
          <label for="fechaFin">Fecha de fin</label>
        </div>

        <input type="submit" class="btn btn-primary mb-3" value="Realizar Consulta" />
      </form>
  
      {consultas.length > 0 && 
      <div class="row">
        <div class="col-md-8">
          
        </div>

        <div class="col-md-4 justify-content-center">
        
        </div>
      </div>
      }
  
  
  
  
  
  
  
  
  
  
  
  </div>)
}

export default Formulario_Consultas_ordenadas_por_enfermedad;