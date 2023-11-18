import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoMedicamentosMasRecetados = ({ medicamentosMasRecetados }) => {

  const [data, setData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const nombreMedicamentos = medicamentosMasRecetados.map(item => item.medicamento.nombre);
    const cantidadMedicamentos = medicamentosMasRecetados.map(item => item.count);

    setData({
      labels: nombreMedicamentos,
      datasets: [
        {
          data: cantidadMedicamentos,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ]
    });
  }, []);
 
  return (
    <Pie data={data} />
  )
}

export default GraficoMedicamentosMasRecetados;