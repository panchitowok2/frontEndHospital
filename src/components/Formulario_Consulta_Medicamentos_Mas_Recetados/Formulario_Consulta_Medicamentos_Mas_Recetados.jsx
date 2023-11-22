import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import TablaMedicamentosMasRecetados from './TablaMedicamentosMasRecetados'
import GraficoMedicamentosMasRecetados from './GraficoMedicamentosMasRecetados'
import Error_General from '../Errores/Error_General';

import obtenerEspecialidades, { obtenerTratamientosFarmacologicosConEspecialidad } from '../../funcionesJS/funciones_especialidades.js';
import obtenerMedicamentosMasRecetados from '../../funcionesJS/funciones_medicamentos.js';
import { buscarTratamientosFarmacologicosEnLaFecha } from '../../funcionesJS/funciones_tratamientos_farmacologicos.js';

const Formulario_Consulta_Medicamentos_Mas_Recetados = () => {
  const [errors, setErrors] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);

  // variables del formulario
  const [especialidad, setEspecialidad] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // para guardar la consulta
  const [medicamentosMasRecetados, setMedicamentosMasRecetados] = useState([]);

  // manejar errores dinamicos
  const [errorEspecialidad, setErrorEspecialidad] = useState("");
  const [errorFechas, setErrorFechas] = useState("");
  

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
    setErrorEspecialidad('')

    const fetchObtenerTratamientosFarmacologicosConEspecialidad = async () => {
      if (! especialidad) return;
 
      try {
        await obtenerTratamientosFarmacologicosConEspecialidad(especialidad);
        
      } catch (err) {
        // Manejar errores
        setErrorEspecialidad('No existen tratamientos farmacologicos con dicha especialidad médica')
      }
    };

    fetchObtenerTratamientosFarmacologicosConEspecialidad();

  }, [especialidad]);

  useEffect(() => {
    setErrors([]);
    setErrorFechas('')
    
    const fetchBuscarTratamientosFarmacologicosEnLaFecha = async () => {
      try {
        const regexFecha = /^(?!0{1,3}\d)(?:[1-9]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

        if (!regexFecha.test(fechaInicio) || !regexFecha.test(fechaFin)) {
          return; // Si las fechas no están en el formato YYYY-MM-DD
        }

        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);

        if (fin < inicio) {
          setErrorFechas(['La fecha de fin debe ser mayor o igual que la fecha de inicio'])
          return;
        }
      
        await buscarTratamientosFarmacologicosEnLaFecha(fechaInicio, fechaFin);

      } catch (err) {
        // Manejar errores
        setErrorFechas('No se encontraron tratamientos en el rango de fechas seleccionado')
      }
    };

    fetchBuscarTratamientosFarmacologicosEnLaFecha();

  }, [fechaInicio, fechaFin]);

  if (! isAuthenticated) {
    return (<h1> No estas logeado </h1>)
  }

  return (
    <div className='m-3 footerSiempreAbajo'>
      <Error_General errors={errors} />
      
      <h2 className="mt-3"> <i className="bi bi-capsule-pill"></i> Consultar medicamentos más recetados</h2>

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
            <div className="form-floating">
            <select className="form-select" id="especialidad" aria-label="Seleccion de Especialidad" defaultValue={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required>
              <option value="">Seleccioná una opción</option>
              {especialidades.map((especialidad) => (
                <option key={especialidad._id} value={especialidad._id}>
                  {especialidad.nombre}
                </option>
              ))}
            </select>

            <label>Especialidad</label>
            </div>

            {errorEspecialidad && <div className="text-danger"> {errorEspecialidad}</div>}
          </div>
        </div>
        
        <div className="row">
          <div className="col">
            <div className="form-floating mt-3">
              <input type="date" className="form-control" id="fechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required/>
              <label>Fecha de inicio</label>
            </div>
          </div>

          <div className="col">
            <div className="form-floating mt-3">
              <input type="date" className="form-control" id="fechaFin" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required/>
              <label>Fecha de fin</label>
            </div>
          </div>

          {errorFechas && <div className="text-danger"> {errorFechas}</div>}
        </div>

        <input type="submit" className={`btn btn-primary mt-4 ${errorFechas || errorEspecialidad ? 'disabled' : ''}`} value="Consultar lista de medicamentos" />
      </form>

      {medicamentosMasRecetados.length > 0 && 
      <div className="row">
        <div className="col-md-8 mt-4">
          <TablaMedicamentosMasRecetados medicamentosMasRecetados={medicamentosMasRecetados} />
        </div>

        <div className="col-md-4 justify-content-center mt-4">
          <GraficoMedicamentosMasRecetados medicamentosMasRecetados={medicamentosMasRecetados} />
        </div>
      </div>
      }
    </div>
  )
}

export default Formulario_Consulta_Medicamentos_Mas_Recetados;