import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import TablaMedicamentosMasRecetados from './TablaMedicamentosMasRecetados'
import GraficoMedicamentosMasRecetados from './GraficoMedicamentosMasRecetados'
import Error_General from '../Errores/Error_General';

import obtenerEspecialidades from '../../funcionesJS/funciones_especialidades.js';
import obtenerMedicamentosMasRecetados from '../../funcionesJS/funciones_medicamentos.js';

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

    // clean errors
    setErrors([])

    try {
      const medicamentosEncontrados = await obtenerMedicamentosMasRecetados(especialidad, fechaInicio, fechaFin);
      setMedicamentosMasRecetados(medicamentosEncontrados)

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

  useEffect(() => {
    setErrors([]);

  }, [especialidad]);

  if (! isAuthenticated) {
    return (<h1> No estas logeado </h1>)
  }

  return (
    <div>
      <Error_General errors={errors} />
      
      <h2 class="mt-3"> <i class="bi bi-capsule-pill"></i> Consultar medicamentos más recetados</h2>

      <div className="row mt-3">
        <div className="col-md-9">
          <p> 
            Descubrí qué medicamentos fueron más recetados en una fecha específica por especialistas.
            Ingresá la fecha de interés y seleccioná el tipo de especialista. 
          </p>

          <p>       
            Explorá ahora para obtener datos relevantes y tomar decisiones informadas sobre la Clínica. 
            Nuestra base de datos te proporcionará información con una lista detallada y un grafico circular. 
          </p>

        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div class="form-floating">
              <select class="form-select" id="especialidad" aria-label="Seleccion de Especialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required>
              <option selected value="">Seleccioná una opción</option>
                {especialidades.map((especialidad) => (
                  <option value={especialidad._id}>{especialidad.nombre}</option>
                ))}
              </select>

              <label for="especialidad">Especialidad</label>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col">
            <div class="form-floating mt-3">
              <input type="date" class="form-control" id="fechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required/>
              <label for="fechaInicio">Fecha de inicio</label>
            </div>
          </div>

          <div className="col">
            <div class="form-floating mt-3">
              <input type="date" class="form-control" id="fechaFin" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required/>
              <label for="fechaFin">Fecha de fin</label>
            </div>
          </div>
        </div>

        <input type="submit" class="btn btn-primary mt-4" value="Consultar lista de medicamentos" />
      </form>

      {medicamentosMasRecetados.length > 0 && 
      <div class="row">
        <div class="col-md-8 mt-4">
          <TablaMedicamentosMasRecetados medicamentosMasRecetados={medicamentosMasRecetados} />
        </div>

        <div class="col-md-4 justify-content-center mt-4">
          <GraficoMedicamentosMasRecetados medicamentosMasRecetados={medicamentosMasRecetados} />
        </div>
      </div>
      }
    </div>
  )
}

export default Formulario_Consulta_Medicamentos_Mas_Recetados;