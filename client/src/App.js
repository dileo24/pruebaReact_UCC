import { Route, Routes } from "react-router-dom";
import Usuarios from "./components/secciones/Usuarios";
import axios from "axios";
import Login from "./components/forms/Login";
import Home from "./components/secciones/Home";
import Register from "./components/forms/Register";
import Posts from "./components/secciones/Posts";
import Perfil from "./components/secciones/Perfil";
import NuevoPost from "./components/forms/NuevoPost";
import EditarPost from "./components/forms/EditarPost";
import { useSelector } from "react-redux";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const userActual = useSelector((state) => state.userActual);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/usuarios" element={<Usuarios />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/posts" element={<Posts />} />
        <Route exact path="/usuarios/:id" element={<Perfil />} />
        {userActual !== null && (
          <>
            <Route exact path="/nuevo_post" element={<NuevoPost />} />
            <Route exact path="/posts/:id" element={<EditarPost />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
