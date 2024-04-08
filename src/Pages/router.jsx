import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Main from "../Components/Proyectos/Main"
import Registro from "../Components/Registro/Registro";

export const router = createBrowserRouter([
    {
      path: "/",
      // element: <Layout />,
      children: [
        {
          index: true,
          // element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path:"/main",
      element: <Main />
    },
  ])