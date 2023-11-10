import React,{ useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Buscar_Persona from '../Persona/Buscar_Persona';
import Ficha_Paciente from './Ficha_Paciente';
import Seleccion_Diagnostico from './Seleccion_Diagnostico';
import Error_General from '../Errores/Error_General';

const Formulario_Alta_Tratamiento_Farmacologico = () => {  
  const [errors, setErrors] = useState([]);
  
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [apellido, setApellido] = useState("");
  const [sexo, setSexo] = useState("");

  const [persona, setPersona] = useState("");
  const [historiaClinica, setHistoriaClinica] = useState("");

  const [diagnostico, setDiagnostico] = useState("");
  const [diagnosticos, setDiagnosticos] = useState([]);

  const [consulta, setConsulta] = useState("");
  const [enfermedad, setEnfermedad] = useState("");

  const [medico, setMedico] = useState("");

  const [buscandoPersona, setBuscandoPersona] = useState(false);

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
    diagnosticos,
    setDiagnosticos,
    consulta,
    setConsulta,
    enfermedad,
    setEnfermedad,
    medico,
    setMedico,
    historiaClinica
  }

  const onSubmit = (data) => {
    console.log(data);
  }

  const {
    isAuthenticated
  } = useAuth0();

  if (! isAuthenticated) {
    return (<h1> No estas logeado </h1>)
  }
  
  return(
    <div>
      <Error_General errors={errors} />

      <h1 className="fs-2 mb-3"> Alta de Tratamiento Farmacológico</h1>

      <div className="row">
        <div className="col-md">
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
                  <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>

          </div>  
        </div>

        <Ficha_Paciente state={personaState} />
      </div>

      <form onSubmit={onSubmit}>

        <input type="submit" className="btn btn-primary mt-3" value="Registrar nuevo tratamiento" />
      </form>
    </div>
  )

}

export default Formulario_Alta_Tratamiento_Farmacologico;