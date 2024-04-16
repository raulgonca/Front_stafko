import Swal from 'sweetalert2';
import './Formulario.css'

const Formulario = (props) => {
  
  const { handleChangeUser, handleChangePassword, handleSubmit } = props;

  const redirectToComingSoon = () => {
    Swal.fire({
      icon: "warning",
      title: `Proximamente`,
      text: "Esta pagina estara disponible para que puedas recuperar tu contraseña"
    });
  };

  return (
    <div className="bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto px-4 py-10 rounded-lg shadow-lg bg-whitesmoke text-black">
        <h2 className="text-2xl font-bold mb-5">Iniciar sesión</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-5">
            <label htmlFor="username" className="block mb-1">Usuario:</label>
            <input
              type="text"
              name="username"
              onChange={(e) => handleChangeUser(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-400"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-1">Contraseña:</label>
            <input
              type="password"
              name="password"
              onChange={(e) => handleChangePassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-400"
            />
            <p className="text-center text-blue-500 cursor-pointer mt-2" onClick={redirectToComingSoon}>¿Olvidaste tu contraseña?</p>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
