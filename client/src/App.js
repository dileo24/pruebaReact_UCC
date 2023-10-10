import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import axios from "axios";
import Login from "./components/Login";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
