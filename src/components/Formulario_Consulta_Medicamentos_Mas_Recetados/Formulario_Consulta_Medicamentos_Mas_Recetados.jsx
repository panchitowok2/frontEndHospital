import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import obtenerEspecialidades from '../../funcionesJS/funciones_especialidades.js';
import obtenerMedicamentosMasRecetados from '../../funcionesJS/funciones_medicamentos.js';
import { useAuth0 } from '@auth0/auth0-react';
import TablaMedicamentosMasRecetados from './TablaMedicamentosMasRecetados'
import GraficoMedicamentosMasRecetados from './GraficoMedicamentosMasRecetados'

const Formulario_Consulta_Medicamentos_Mas_Recetados = () => {
  const [errors, setErrors] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);

  // variables del formulario
  const [especialidad, setEspecialidad] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // para guardar la consulta
  const [medicamentosMasRecetados, setMedicamentosMasRecetados] = useState([]);

  const {
    isAuthenticated
  } = useAuth0();
 

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const medicamentosEncontrados = await obtenerMedicamentosMasRecetados(especialidad, fechaInicio, fechaFin);
      setMedicamentosMasRecetados(medicamentosEncontrados)

      // clean errors
      setErrors([])

    } catch (err) {
      setErrors([err.message])
      setMedicamentosMasRecetados([]);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerEspecialidades();
        setEspecialidades(data);
      } catch (error) {
        // Manejar errores
      }
    };

    fetchData();
  }, []);

  if (! isAuthenticated) {
    return (<h1> No estas logeado </h1>)
  }

  return (
    <div>
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
      
      <h2 class="mb-3"> Consultar medicamentos más recetados</h2>

      <form class="mb-3" onSubmit={handleSubmit}>

        <div class="form-floating mb-3 w-50">
          <select class="form-select" id="especialidad" aria-label="Seleccion de Especialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required>
          <option selected value="">Seleccioná una opción</option>
            {especialidades.map((especialidad) => (
              <option value={especialidad._id}>{especialidad.nombre}</option>
            ))}
          </select>
          <label for="especialidad">Especialidad</label>
        </div>

        <div class="form-floating mb-3 w-50">
          <input type="date" class="form-control" id="fechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required/>
          <label for="fechaInicio">Fecha de inicio</label>
        </div>

        <div class="form-floating mb-3 w-50">
          <input type="date" class="form-control" id="fechaFin" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required/>
          <label for="fechaFin">Fecha de fin</label>
        </div>

        <input type="submit" class="btn btn-primary mb-3" value="Consultar lista de medicamentos" />
      </form>

      {medicamentosMasRecetados.length > 0 && 
      <div class="row">
        <div class="col-md-8">
          <TablaMedicamentosMasRecetados medicamentosMasRecetados={medicamentosMasRecetados} />
        </div>

        <div class="col-md-4 justify-content-center">
          <GraficoMedicamentosMasRecetados medicamentosMasRecetados={medicamentosMasRecetados} />
        </div>
      </div>
      }
      
    </div>
  )
}

export default Formulario_Consulta_Medicamentos_Mas_Recetados;