import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Content from './components/Content/Content.jsx'
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
