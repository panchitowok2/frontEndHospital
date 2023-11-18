import React,{ useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Buscar_Persona from '../Persona/Buscar_Persona';
import Ficha_Paciente from './Ficha_Paciente';
import Seleccion_Diagnostico from './Seleccion_Diagnostico';
import Datos_Tratamiento from './Datos_Tratamiento';
import Error_General from '../Errores/Error_General';
import Mensajes_Exito from '../Mensajes_Exito/Mensajes_Exito';

const Formulario_Alta_Tratamiento_Farmacologico = () => {  
  const [errors, setErrors] = useState([]);
  const [messages, setMessages] = useState([]);

  const [tipoDocumento, setTipoDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [apellido, setApellido] = useState("");
  const [sexo, setSexo] = useState("");

  const [persona, setPersona] = useState("");
  const [historiaClinica, setHistoriaClinica] = useState("");

  const [diagnostico, setDiagnostico] = useState("");
  

  const [medico, setMedico] = useState("");

  const [buscandoPersona, setBuscandoPersona] = useState(false);

  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [duracion, setDuracion] = useState("");
  const [dosificaciones, setDosificaciones] = useState([]);

  const personaState = {
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
    historiaClinica,
    setHistoriaClinica,
    buscandoPersona,
    setBuscandoPersona,
    setErrors
  };

  const diagnosticoState = {
    diagnostico,
    setDiagnostico,
    medico,
    setMedico,
    historiaClinica,
    setErrors,
  }

  const tratamientoState = {
    tipo,
    setTipo,
    descripcion,
    setDescripcion,
    fechaInicio,
    setFechaInicio,
    duracion,
    setDuracion,
    dosificaciones,
    setDosificaciones,
    historiaClinica,
    diagnostico,
    medico,
    setErrors,
    setMessages
  }

  const {
    isAuthenticated
  } = useAuth0();

  if (! isAuthenticated) {
    return (<h1> No estas logeado </h1>)
  }
  
  return(
    <div className='m-3 footerSiempreAbajo'>
      <Mensajes_Exito messages={messages} />
      <Error_General errors={errors} />

      <h1 className="fs-2"> <i className="bi bi-heart-pulse"></i> Alta de Tratamiento Farmacológico</h1>

      <div className="row">
        <div className="col-md mt-3">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  1. Datos del Paciente
                </button>
              </h2>

              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne">
                <div className="accordion-body">
                  <Buscar_Persona state={personaState} />

                  <div className="d-md-none mt-3">
                    <Ficha_Paciente state={personaState} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  2. Seleccionar un Diagnóstico
                </button>
              </h2>
              
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo">
                <div className="accordion-body">
                  <Seleccion_Diagnostico state={diagnosticoState} />
                </div>
              </div>
            </div>
            
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  3. Datos del Tratamiento
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree">
                <div className="accordion-body">
                  <Datos_Tratamiento state={tratamientoState} />
                </div>
              </div>
            </div>

          </div>  
        </div>

        <div className="col-md-3 mt-3 d-none d-md-block ms-auto">
          <Ficha_Paciente state={personaState} />
        </div>
      </div>
    </div>
  )

}

export default Formulario_Alta_Tratamiento_Farmacologico;