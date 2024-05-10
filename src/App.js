import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from './Components/Registro/Registro';
import Main from './Components/Proyectos/Main';
import Login from './Pages/Login';
import Header from './Container/Header';
import Footer from './Container/Footer.jsx';
import Clockify from '../src/Components/Proyectos/Clockify.jsx';
import Clientes from '../src/Components/Proyectos/clientes.jsx';
import './styles.css'


const App = () => {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <div className="spacer">
          <Routes>
            <Route path="/" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/main/:username" element={<Main />} />
            <Route path="/register" element={<Registro />} />
            <Route path="/Clockify" element={<Clockify />} />
            <Route path="/Clientes" element={<Clientes />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}


export default App;
