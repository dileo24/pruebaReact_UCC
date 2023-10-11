import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
