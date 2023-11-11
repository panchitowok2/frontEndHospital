import React, { useState, useEffect } from 'react';

import { obtenerMedicamentos, obtenerMedicamento } from '../../funcionesJS/funciones_medicamentos.js';
import { altaTratamientoFarmacologico } from '../../funcionesJS/funciones_tratamientos_farmacologicos.js';

const Datos_Tratamiento = ({ state }) => {

  const [dosis, setDosis] = useState([]);
  const [medicamento, setMedicamento] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [success, setSuccess] = useState(false);


  const { 
    historiaClinica,
    diagnostico,
    medico, 
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
    setErrors,
    setMessages,
  } = state;

  const agregarDosificacion = () => {
    if (!dosis || !medicamento) {
      alert("Por favor, complete tanto la dosis como el medicamento antes de agregar la dosificación.");
      return; 
    }

    const fetchMedicamento = async () => {
      try {
        const medicamentoSeleccionado = await obtenerMedicamento(medicamento);

        var listadoDosificaciones = dosificaciones;
        listadoDosificaciones.push({dosis: dosis, medicamento: medicamentoSeleccionado})
        setDosificaciones(listadoDosificaciones)

        setMedicamento("")
        setDosis("")

      } catch (err) {
        setErrors([err.message])
      }
    };

    fetchMedicamento();
  };

  const eliminarDosificacion = (position) => {
    var listadoDosificaciones = dosificaciones;
    listadoDosificaciones.splice(position, 1);
    setDosificaciones(listadoDosificaciones)
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setErrors([])
    setSuccess(false)

    const fetchAltaTratamiento = async () => {
      try {

        if (! historiaClinica) {
          setErrors(["Por favor selecciona una persona para registrar un tratamiento"])
          return;
        }
        
        if (! diagnostico) {
          setErrors(["Por favor selecciona un diagnostico para poder continuar"])
          return;
        }

        if (dosificaciones.length === 0) {
          setErrors(["No se puede registrar un tratamiento sin dosificaciones"])
          return;
        }

        var arrayDosificaciones = []
        dosificaciones.map((elemDosificacion) => {
          arrayDosificaciones.push({ 
            "dosis": elemDosificacion.dosis,
            "medicamento": elemDosificacion.medicamento._id
          })
        })

        const nuevoTratamiento = await altaTratamientoFarmacologico(tipo, descripcion, fechaInicio, duracion, historiaClinica._id, diagnostico._id, medico._id, arrayDosificaciones);
        console.log(nuevoTratamiento)
        setSuccess(true);
        setMessages(['Tratamiento creado exitosamente.'])
      } catch (err) {
        setErrors([err.message])
      }
    };

    fetchAltaTratamiento();
  }

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const listaMedicamentos = await obtenerMedicamentos();
        setMedicamentos(listaMedicamentos);
      } catch (err) {
        setErrors([err.message])
      }
    };
  
    fetchMedicamentos();
  }, []); 

  useEffect(() => {
    setSuccess(false)
    setDosificaciones([])
  }, [historiaClinica, diagnostico]); 

  useEffect(() => {
    // Función para obtener la fecha actual en formato YYYY-MM-DD
    const obtenerFechaActual = () => {
      const fechaActual = new Date();
      const year = fechaActual.getFullYear();
      const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
      const day = fechaActual.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // Establecer la fecha actual al cargar el componente
    setFechaInicio(obtenerFechaActual());
  }, []); 

  return (
    <div>
      <h3> <i class="bi bi-clipboard2-pulse"></i> Registro médico </h3>

      <form onSubmit={onSubmit}>
        <div className="form-floating mt-3">
          <input type="text" className="form-control" id="tipo" onChange={(e) => setTipo(e.target.value)} required/>
          <label htmlFor="tipo"> Tipo </label>
        </div>

        <div className="form-floating mt-3">
          <input type="text" className="form-control" id="descripcion" onChange={(e) => setDescripcion(e.target.value)} required/>
          <label htmlFor="descripcion"> Descripcion </label>
        </div>

        <div className="form-floating mt-3">
          <input
            type="date"
            className="form-control"
            id="fecha_inicio"
            onChange={(e) => setFechaInicio(e.target.value)}
            value={fechaInicio}
            required
          />
          <label htmlFor="fecha_inicio">Fecha de inicio</label>
        </div>

        <div className="form-floating mt-3">
          <input type="text" className="form-control" id="duracion" onChange={(e) => setDuracion(e.target.value)} required/>
          <label htmlFor="duracion"> Duracion </label>
        </div>

        

        <h3 className="mt-5"> <i class="bi bi-prescription2"></i> Nueva dosificacion </h3>
        <div className="row mt-3"> 
          <div className="col-md-5 mt-2">
            <div className="form-floating">
              <select value={medicamento ? medicamento._id : ""} className="form-select" id="medicamento" aria-label="Floating label select example" onChange={(e) => setMedicamento(e.target.value)}>
                <option key="" value="">
                  Seleccione una opción
                </option>

                {medicamentos.map((elemMedicamento) => (
                  <option
                    key={elemMedicamento._id}
                    value={elemMedicamento._id}
                  >
                    {`${elemMedicamento.presentacion} de ${elemMedicamento.droga} - Marca: ${elemMedicamento.nombre}`}
                  </option>
                ))}

              </select>
              
              <label htmlFor="tipoDocumento">Medicamento</label>
            </div>
          </div>

          <div className="col-md-4 mt-2">
            <div className="form-floating">
              <input type="text" className="form-control" id="dosis" value={dosis} onChange={(e) => setDosis(e.target.value)}/>
              <label htmlFor="dosis"> Dosis </label>
            </div>
          </div>

          <div className="col-md-3 d-flex align-items-center justify-content-center mt-3">
            <button type="button" className="btn btn-primary" onClick={agregarDosificacion}>
              Agregar dosificación
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th scope="col">Dosis</th>
                <th scope="col">Medicamento</th>
                <th scope="col">Droga</th>
                <th scope="col">Presentacion</th>
                <th scope="col" className="text-end">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {dosificaciones.map((elemDosificacion, index) => (
                <tr key={index}>
                  <td>{elemDosificacion.dosis}</td>
                  <td>{elemDosificacion.medicamento.nombre}</td>
                  <td>{elemDosificacion.medicamento.droga}</td>
                  <td>{elemDosificacion.medicamento.presentacion}</td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => eliminarDosificacion(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}

              {dosificaciones.length === 0 && 
                <tr>
                  <td colspan="5" className="text-danger"> No cargó ninguna dosificación por el momento. Utilice el formulario de arriba para cargar una dosificación. </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div className="row mt-5">
          <div className="col text-end">
            <div> <input type="submit" className="btn btn-primary mt-3" value="Registrar nuevo tratamiento" /> </div>
            
            {success && <p className="text-success float-end mt-3"> Bien hecho! Tratamiento creado con éxito.  </p>}
          </div>
        </div>
      </form>
    </div>
  )
}

export default Datos_Tratamiento;