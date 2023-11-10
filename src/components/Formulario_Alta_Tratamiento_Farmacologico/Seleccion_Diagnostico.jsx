import React, { useEffect } from 'react';

import { obtenerDatosDiagnostico } from '../../funcionesJS/funciones_diagnosticos.js';
import { obtenerConsulta } from '../../funcionesJS/funciones_consultas.js';
import { obtenerEnfermedad } from '../../funcionesJS/funciones_enfermedades.js';
import { obtenerMedico } from '../../funcionesJS/funciones_medicos.js';

const Seleccion_Diagnostico = ({ state }) => {

  const { 
    diagnostico,
    setDiagnostico,
    diagnosticos,
    setDiagnosticos,
    historiaClinica,
    consulta,
    setConsulta,
    enfermedad,
    setEnfermedad,
    medico,
    setMedico,
    setErrors
  } = state;

  function seleccionarDiagnostico(idDiagnostico) {
    const loadData = async () => {
      if (idDiagnostico) 
      {
        try {   
          const diagnosticoSeleccionado = await obtenerDatosDiagnostico(idDiagnostico);
          setDiagnostico(diagnosticoSeleccionado);
        } catch (err) {
          setErrors([err.message]);
        } 
      } else {
        setConsulta("")
        setEnfermedad("")
        setMedico("")
      }
    };

    loadData();
  }

  useEffect(() => {
    setDiagnostico("")
    setDiagnosticos([]);
    
    const fetchData = async () => {
      if (historiaClinica && historiaClinica.diagnosticos.length === 0) {
        setErrors(['No hay diagnósticos cargados en la Historia Clínica del Paciente']);
        return;
      }
  
      var listaDiagnosticos = [];
  
      try {
        if (historiaClinica) {
          for (const diagnosticoHistoriaClinica of historiaClinica.diagnosticos) {
            const diagnosticoBuscado = await obtenerDatosDiagnostico(diagnosticoHistoriaClinica);
            listaDiagnosticos.push(diagnosticoBuscado);
          }
  
          setDiagnosticos(listaDiagnosticos);
        }
      } catch (err) {
        setErrors([err.message])
      } finally {
        if (historiaClinica && listaDiagnosticos.length != historiaClinica.diagnosticos.length) {
          setErrors(['Ocurrió un error al obtener los datos de los diagnósticos']);
        }
      }
    };
  
    fetchData();
  }, [historiaClinica]); 

  useEffect(() => {
    const fetchConsulta = async () => {
      if (diagnostico) {
        try { 
          const datosConsulta = await obtenerConsulta(diagnostico.consulta);
          setConsulta(datosConsulta);
        } catch (err) {
          setErrors([err.message])
        }
      } else {
        setConsulta("")
      }
    };
  
    fetchConsulta();
  }, [diagnostico]); 

  useEffect(() => {
    const fetchEnfermedad = async () => {
      if (diagnostico) {
        try {
          const datosEnfermedad = await obtenerEnfermedad(diagnostico.enfermedad);
          setEnfermedad(datosEnfermedad);
        } catch (err) {
          setErrors([err.message])
        }
      } else {
        setEnfermedad("")
      }
    };
  
    fetchEnfermedad();
  }, [diagnostico]); 

  useEffect(() => {
    const fetchMedico = async () => {
      if (consulta) {
        try {
          const datosMedico = await obtenerMedico(consulta.medico);
          setMedico(datosMedico)
        } catch (err) {
          setErrors([err.message])
        }
      } else {
        setMedico("")
      }
    };
  
    fetchMedico();
  }, [consulta]); 

  return(
     <div>
        <p> Por favor: seleccione el diagnostico por el cual va realizar el tratamiento:</p>

        <div className="row">
          <div className="col-md-6">
            <div className="form-floating">
              <select className="form-select" id="diagnostico" aria-label="Floating label select example" onChange={(e) => seleccionarDiagnostico(e.target.value)} required>
                <option value=""> Seleccione una opción </option>

                {diagnosticos.map((elemDiagnostico) => (
                  <option key={elemDiagnostico._id} value={elemDiagnostico._id}> {elemDiagnostico.descripcion} </option>
                ))}
              </select>
              <label htmlFor="diagnostico">Diagnostico</label>
            </div>
          </div>
        </div>

        <div className="mt-3"> <strong> Observaciones: </strong> {diagnostico.observaciones} </div>
        
        <div className="row">
          <div className="col-md mt-3">
            <h3> Consulta </h3>
            <p><strong>Síntomas:</strong> {consulta.sintomas}</p>
            <p><strong>Observación:</strong> {consulta.observacion}</p>
            <p><strong>Fecha y Hora:</strong> {consulta.fecha_y_hora}</p>
          </div>

          <div className="col-md mt-3">
            <h3> Enfermedad </h3>
            <p><strong> Nombre: </strong> {enfermedad.nombre} </p>
            <p><strong> Tipo: </strong> {enfermedad.tipo} </p>
          </div>

          <div className="col-md mt-3">
            <h3> Medico </h3>
            <p><strong> Nombre: </strong> {medico.nombre} {medico.apellido} </p>
            <p><strong> Legajo: </strong> {medico.legajo} </p>
            <p><strong> Especialidad: </strong> {medico.especialidades} </p>
          </div>
        </div>
     </div>
  )
}

export default Seleccion_Diagnostico;