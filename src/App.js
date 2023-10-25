import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Content from './components/Content.jsx'
function App() {
  return (
    <div className="container-fluid position-relative vh-100 vw-100 m-0 p-0">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
