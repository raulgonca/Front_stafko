import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from './Components/Registro/Registro';
import Main from './Components/Proyectos/Main';
import Login from './Pages/Login';
import Header from './Container/Header';
import Footer from './Container/Footer.jsx';
import Dashboard from '../src/Components/Proyectos/Dashboard.jsx';
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
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}


export default App;
