import Swal from 'sweetalert2';
import "./Formulario"


const Formulario = (props) => {

  const {handleChangeUser, handleChangePassword, handleSubmit} = props;


const redirectToComingSoon = () => {  // arrow funtion
  Swal.fire({
    icon: "warning",
    title: `Proximamente`,
    text: "Esta pagina estara disponible para que puedes recuperar tu contraseña"
  })
}

  return (
    <div>
      
      <div className= "conteiner">
       <form action="submit" onSubmit={(e)=>handleSubmit(e)}>
         <div className="pruebauser">
           <label htmlFor="username">Usuario:</label>
           <input type="text"
                  name="username"
                  onChange={(e) => handleChangeUser(e.target.value)} 
                  required />
                  
         </div>
         <div className="pruebapassword">
           <label htmlFor="password">Contraseña:</label>
           <input type="password" 
                  name="password"
                  onChange={(e) => handleChangePassword(e.target.value)} 
                  required />

           <br />
           <p className='olvido' onClick={redirectToComingSoon}>¿Olvidaste tu contraseña?</p>
         </div>
         <button type='submit'>Iniciar sesión</button>
       </form>
     </div>
      </div>
  )
}

export default Formulario;