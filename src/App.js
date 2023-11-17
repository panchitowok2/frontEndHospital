import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Content from './components/Content/Content.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pantalla1AltaHistoriaClinica from './components/Formulario/Pantalla1AltaHistoriaClinica.jsx';
import Pantalla1InformePaciente from './components/Formulario/Pantalla1InformePaciente.jsx';
function App() {
  return (
    <Router>
      <div className="container-fluid min-vh-100 m-0 p-0">
        <Header />
        <Routes>
        <Route path="/" element={<Content />} />
          <Route path="/paciente/informe_paciente" element={<Pantalla1InformePaciente />} />                        
          <Route path="/historia-clinica/alta_historia_clinica" element={<Pantalla1AltaHistoriaClinica />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

