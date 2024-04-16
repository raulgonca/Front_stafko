import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from './Components/Registro/Registro';
import Main from './Components/Proyectos/Main';
import Login from './Pages/Login';
import Header from './Container/Header';
import './styles.css'

const App = () => {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Registro />} /> {/* Ruta por defecto */}
          <Route path="/login" element={<Login/>} />
          <Route path="/main/:username" element={<Main/>} />
          <Route path="/register" element={<Registro/>} />

        </Routes>
      </div>
    </Router>
  );
}


export default App;
