import React from 'react';



const Tabla_Medicamentos_Mas_Recetados = ({ medicamentosMasRecetados }) => {

  return (
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col"> Medicamento </th>
                <th scope="col"> Droga </th>
                <th scope="col"> Cantidad recetada </th>
              </tr>
            </thead>

            <tbody>
            {medicamentosMasRecetados.map((medicamento) => (
              <tr>
                <th scope="row"> {medicamentosMasRecetados.indexOf(medicamento) + 1} </th>
                <td> {medicamento.medicamento.nombre} </td>
                <td> {medicamento.medicamento.droga} </td>
                <td> {medicamento.count} </td>
              </tr>
            ))}
              
            </tbody>
          </table>
  )

}

export default Tabla_Medicamentos_Mas_Recetados;