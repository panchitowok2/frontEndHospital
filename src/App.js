import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Content from './components/Content/Content.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pantalla1AltaHistoriaClinica from './components/Formulario/Pantalla1AltaHistoriaClinica.jsx';
import Pantalla1InformePaciente from './components/Formulario/Pantalla1InformePaciente.jsx';
import Formulario_Alta_Tratamiento_Farmacologico from './components/Formulario_Alta_Tratamiento_Farmacologico/Formulario_Alta_Tratamiento_Farmacologico.jsx'
import AltaConsulta from './components/Formularios_alta_consulta_dianostico/Formulario_alta_consulta_diagnostico.jsx'
import ConsultasPorEnfermedad from './components/Formularios_alta_consulta_dianostico/Formulario_Consultas_ordenadas_por_enfermedad.jsx'
import MedMasRecetados from './components/Formulario_Consulta_Medicamentos_Mas_Recetados/Formulario_Consulta_Medicamentos_Mas_Recetados.jsx'
function App() {
  return (
    <Router>
      <div className="container-fluid min-vh-100 m-0 p-0">
        <Header />
        <Routes>
        <Route path="/" element={<Content />} />
          <Route path="/paciente/informe_paciente" element={<Pantalla1InformePaciente />} />                        
          <Route path="/historia-clinica/alta_historia_clinica" element={<Pantalla1AltaHistoriaClinica />} />
          <Route path="/tratamientoFarmacologico/alta_tratamiento" element={<Formulario_Alta_Tratamiento_Farmacologico/>} />
          <Route path="/consulta/alta_consulta" element={<AltaConsulta/>} />
          <Route path="/consulta/consultas_por_enfermedad" element={<ConsultasPorEnfermedad/>} />
          <Route path="/medicamento/medicamentos_mas_recetados" element={<MedMasRecetados/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

