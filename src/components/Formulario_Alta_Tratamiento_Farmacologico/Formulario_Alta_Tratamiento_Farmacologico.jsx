import React,{ useState } from 'react';
import { calcularEdad } from '../../funcionesJS/funciones_persona.js';
import Buscar_Persona from '../Persona/Buscar_Persona';

const Formulario_Alta_Tratamiento_Farmacologico = () => {
  const [errors, setErrors] = useState([]);
  
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [sexo, setSexo] = useState("");
  const [persona, setPersona] = useState("");

  const personaState = {
    tipoDocumento,
    setTipoDocumento,
    documento,
    setDocumento,
    sexo,
    setSexo,
    setPersona,
    setErrors
  };

  const onSubmit = (data) => {
    console.log(data);

  }

  return(
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

      <h2 class="mb-3"> Alta de Tratamiento Farmacológico</h2>

      <div class="row">
        <div class="col-md-9">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Datos del Paciente
                </button>
              </h2>

              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <Buscar_Persona state={personaState} />
                </div>
              </div>
            </div>


            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Seleccionar un Diagnóstico
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Datos del Tratamiento
                </button>
              </h2>
              <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>

          </div>  
        </div>

        <div class="col-md-3">
          <div class="card">
            <div class="card-header">
              Ficha del paciente
            </div>

            <div class="card-body">
              <h5 class="card-title">{persona.nombre} {persona.apellido}</h5>
              <h6 class="card-subtitle mb-2 text-muted">De {persona.nacionalidad}, {calcularEdad(persona.fecha_nacimiento)} años </h6>
              
              <p class="card-text">
                <strong> Telefono: </strong> {persona.telefono} <br />
                <strong>Email: </strong> {persona.email}
              </p>
   
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        

        <input type="submit" class="btn btn-primary mb-3" value="Registrar nuevo tratamiento" />
      </form>
      
    </div>
  )

}

export default Formulario_Alta_Tratamiento_Farmacologico;