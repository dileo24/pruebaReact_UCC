import { Route, Routes } from "react-router-dom";
import Usuarios from "./components/Usuarios";
import axios from "axios";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Posts from "./components/Posts";
import Perfil from "./components/Perfil";
import NuevoPost from "./components/NuevoPost";
import EditarPost from "./components/EditarPost";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/usuarios" element={<Usuarios />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/posts" element={<Posts />} />
        <Route exact path="/nuevo_post" element={<NuevoPost />} />
        <Route exact path="/usuarios/:id" element={<Perfil />} />
        <Route exact path="/posts/:id" element={<EditarPost />} />
      </Routes>
    </div>
  );
}

export default App;
