import React, { useEffect, useState } from 'react';

import { obtenerDatosDiagnostico } from '../../funcionesJS/funciones_diagnosticos.js';
import { obtenerConsulta } from '../../funcionesJS/funciones_consultas.js';
import { obtenerEnfermedad } from '../../funcionesJS/funciones_enfermedades.js';
import { obtenerMedico, obtenerEspecialidades } from '../../funcionesJS/funciones_medicos.js';
import { buscarDiagnosticosHistoriaClinica } from '../../funcionesJS/funciones_historia_clinica.js';

import moment from 'moment';

const Seleccion_Diagnostico = ({ state }) => {

  const { 
    diagnostico,
    setDiagnostico,
    historiaClinica,
    medico,
    setMedico,
    setErrors
  } = state;

  const [diagnosticos, setDiagnosticos] = useState([]);
  const [consulta, setConsulta] = useState("");
  const [enfermedad, setEnfermedad] = useState("");
  const [especialidades, setEspecialidades] = useState([]);

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
        setDiagnostico("")
      }
    };

    loadData();
  }

  useEffect(() => {
    setDiagnostico("")
    setDiagnosticos([]);
    
    const fetchDiagnosticos = async () => {
      if (! historiaClinica) return;

      if (historiaClinica.diagnosticos.length === 0) {
        setErrors(['No hay diagnósticos cargados en la Historia Clínica del Paciente']);
        return;
      }
  
      try {
        const listaDiagnosticos = await buscarDiagnosticosHistoriaClinica(historiaClinica._id)
        setDiagnosticos(listaDiagnosticos);

      } catch (err) {
        setErrors([err.message])
      }
    };
  
    fetchDiagnosticos();
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

  useEffect(() => {
    const fetchEspecialidades = async () => {
      if (medico) {
        try {
          var listaEspecialidades = await obtenerEspecialidades(medico._id)
          
          setEspecialidades(listaEspecialidades);

        } catch (err) {
          setErrors([err.message])
        }
      } else {
        setEspecialidades([])
      }
    };
  
    fetchEspecialidades();
  }, [medico]); 

  return(
     <div>
        <p> Por favor: seleccione el diagnostico por el cual va realizar el tratamiento:</p>

        <div className="row">
          <div className="col-md-9">
            <div className="form-floating">
              <select className="form-select" id="diagnostico" aria-label="Floating label select example" onChange={(e) => seleccionarDiagnostico(e.target.value)} required>
                <option value=""> Seleccione una opción </option>

                {diagnosticos.map((elemDiagnostico) => (
                  <option key={elemDiagnostico._id} value={elemDiagnostico._id}> {elemDiagnostico.descripcion} - Enfermedad: {elemDiagnostico.enfermedad.nombre} </option>
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
            <p><strong>Fecha y Hora:</strong> {consulta.fecha_y_hora && moment(consulta.fecha_y_hora).format('DD/MM/YYYY HH:mm')} </p>
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
            <p><strong> Especialidad: </strong> </p>
            {especialidades.map((elemEspecialidad) => (
                  <li key={elemEspecialidad._id}> {elemEspecialidad.nombre} </li>
            ))}
          </div>
        </div>
     </div>
  )
}

export default Seleccion_Diagnostico;