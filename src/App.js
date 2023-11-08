import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Content from './components/Content/Content.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormBuscarIdPersona from './components/Formulario/Form_Buscar_IDPersona.jsx';
import FormBuscarHistoriaClinica from './components/Formulario/Form_Buscar_Historia_Clinica.jsx';
import FormularioAltaHistoriaClinica from './components/Formulario/Form_Alta_Historia_Clinica.jsx';
import FormAltaPersona from './components/Formulario/Form_Alta_Persona.jsx';
function App() {
  return (
    <Router>
      <div className="container-fluid min-vh-100 m-0 p-0">
        <Header />
        <Routes>
        <Route path="/" element={<Content />} />
          <Route path="/paciente/alta_persona" element={<FormAltaPersona />} />
          <Route path="/paciente/buscar_persona" element={<FormBuscarIdPersona />} />          
          <Route path="/historia-clinica/alta_historia_clinica" element={<FormularioAltaHistoriaClinica />} />
          <Route path="/historia-clinica/buscar_historia_clinica" element={<FormBuscarHistoriaClinica />} />          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

