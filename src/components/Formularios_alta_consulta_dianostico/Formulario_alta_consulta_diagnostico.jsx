import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Buscar_Persona from "../Persona/Buscar_Persona";

import Error_General from "../Errores/Error_General";
import {
  buscarIdPersona,
  buscarDatosPersona,
} from "../../funcionesJS/funciones_persona.js";
import { obtener_medicos } from "../../funcionesJS/funciones_medicos.js";
import { obtener_turnos } from "../../funcionesJS/funciones_turnos.js";
import Buscar_paciente from "./Buscar_paciente.jsx";
import Seleccionar_medico_fecha_y_hora from "./Seleccionar_medico_fecha_y_hora.jsx";
import Datos_consulta_y_diagnostico from "./Datos_consulta_y_diagnostico.jsx";
const Formulario_alta_consulta_diagnostico = () => {
  const [errors, setErrors] = useState([]);

  //datos para buscar y setear datos del paciente ademas de cargar los medicos
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [apellido, setApellido] = useState("");
  const [sexo, setSexo] = useState("");
  const [medicos, setMedicos] = useState([]);
  const [persona, setPersona] = useState("");
  const personaDatos = {
    tipoDocumento,
    setTipoDocumento,
    documento,
    setDocumento,
    apellido,
    setApellido,
    sexo,
    setSexo,
    persona,
    setPersona,
    setErrors,
    setMedicos,
  };
  //datos para la segunda pestaña
  const [fechaTurno, setFechaTurno] = useState("");
  const [medico, setMedico] = useState("");
  const [hora1, sethora1] = useState("");
  const [hora2, sethora2] = useState("")
  const [turnos, setTurnos] = useState([]);
  const [turnoElegido, setTurnoElegido] = useState("");
  const datos_turno={
    persona,
    fechaTurno,
    hora1,sethora1
    ,hora2,sethora2,
    medico,setTurnos,
    setErrors,
    setFechaTurno,
    setMedico,
    medicos
  }

  const { isAuthenticated } = useAuth0();

;

  
  const [sintomasConsulta, setSintomasConsulta] = useState("");
  const [observacionConsulta, setObservacionConsulta] = useState("");
  const [fechaConsulta, setFechaConsulta] = useState("");
  const [observacionDiagnostico, setObservacionDiagnostico] = useState("");
  const [descripcionDiagnostico, setDescripcionDiagnostico] = useState("");
  const [enfermedades, set_enfermedades] = useState([]);
  const [enfermedad, set_enfermedad] = useState("");
  const [historiaClinica, setHistoriaClinica] = useState("");
  const datos_consulta_diagnostico={
    sintomasConsulta,
    setSintomasConsulta,
    observacionConsulta, 
    setObservacionConsulta,
    fechaConsulta, 
    setFechaConsulta,
    observacionDiagnostico, 
    setObservacionDiagnostico,
    descripcionDiagnostico, 
    setDescripcionDiagnostico,
    enfermedades, 
    set_enfermedades,
    enfermedad, 
    set_enfermedad,
    historiaClinica, 
    setHistoriaClinica,
    turnoElegido,
    setTurnoElegido,
    turnos,
    medico,
    setErrors,
    persona
  }

  



  const [buscandoPersona, setBuscandoPersona] = useState(false);

  const [tipo, setTipo] = useState("");

  if (!isAuthenticated) {
    return <h1> No estas logeado </h1>;
  }

  

  return (
    <div className="ms-5 me-5"> 
      <Error_General errors={errors} />

      <h1 className="fs-2 mb-3"> Registrar Consulta y Diagnostico</h1>

      <div className="row">
        <div className="col-md ">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#buscarPaciente"
                  aria-expanded="true"
                  aria-controls="buscarPaciente"
                >
                  1. Datos del Paciente
                </button>
              </h2>

              <div
                id="buscarPaciente"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
              >
                <div className="accordion-body">
                  <Buscar_paciente state={personaDatos} />
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#seleccionarMedicoFecha"
                  aria-expanded="true"
                  aria-controls="seleccionarMedicoFecha"
                >
                  2. Seleccionar un medico y fecha
                </button>
              </h2>

              <div
                id="seleccionarMedicoFecha"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
              >
                <div className="accordion-body">
                  




                  <Seleccionar_medico_fecha_y_hora state={datos_turno}/>

                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#datosConsultaDiagnostico"
                  aria-expanded="true"
                  aria-controls="datosConsultaDiagnostico"
                >
                  3. Datos del consulta y diagnostico
                </button>
              </h2>
              <div
                id="datosConsultaDiagnostico"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
              >
                <div className="accordion-body">
                  <Datos_consulta_y_diagnostico state={datos_consulta_diagnostico}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulario_alta_consulta_diagnostico;
