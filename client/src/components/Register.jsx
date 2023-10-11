import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfesiones, getUsuarios, register } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { RiEyeOffLine, RiEyeLine } from "react-icons/ri";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios);
  const profesiones = useSelector((state) => state.profesiones);
  const emails = usuarios && usuarios.map((user) => user.email);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedProfesiones, setSelectedProfesiones] = useState([]);

  const [registerError, setRegisterError] = useState(null);

  useEffect(() => {
    dispatch(getUsuarios());
    dispatch(getProfesiones());
  }, [dispatch]);

  const [input, setInput] = useState({
    email: "",
    clave: "",
    domicilio: "",
    nombre: "",
    apellido: "",
    profesiones: [],
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleProfesionChange = (e, id) => {
    const checked = e.target.checked;
    if (checked) {
      // agrega ID al arreglo
      setSelectedProfesiones([...selectedProfesiones, id]);
    } else {
      //elimina ID del arreglo
      setSelectedProfesiones(
        selectedProfesiones.filter((profId) => profId !== id)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emails && emails.includes(input.email)) {
      setRegisterError("El email ingresado ya existe");
    } else if (input.clave.length < 8) {
      setRegisterError("La contraseña debe tener al menos 8 caracteres");
    } else {
      input.profesiones = selectedProfesiones;
      dispatch(register(input));
      navigate("/");
      setInput({
        email: "",
        clave: "",
        domicilio: "",
        nombre: "",
        apellido: "",
        profesiones: [],
      });
      setSelectedProfesiones([]);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);

  // Función de validación de email

  const volverFunction = () => {
    navigate("/login");
  };

  return (
    <div className="registerContainer">
      <button className="btn btn-primary volver" onClick={volverFunction}>
        Volver
      </button>
      <div className="CardCont">
        <h1 className="">Creación de Usuarios</h1>
        <div className="cardContainer">
          <div className="cardLogin ">
            <form onSubmit={handleSubmit} className="formLogin">
              <div className="inputsDiv">
                <label htmlFor="nombre" className="labelInp">
                  Nombre
                </label>
                <input
                  className="inputs"
                  type="text"
                  name="nombre"
                  placeholder="Escribe el nombre"
                  value={input.nombre}
                  onChange={(e) => handleChange(e)}
                  autoFocus
                  required
                />
              </div>

              <div className="inputsDiv">
                <label htmlFor="apellido" className="labelInp">
                  Apellido
                </label>
                <input
                  className="inputs"
                  type="text"
                  name="apellido"
                  placeholder="Escribe el apellido"
                  value={input.apellido}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>

              <div className="inputsDiv">
                <label htmlFor="domicilio" className="labelInp">
                  Domicilio
                </label>
                <input
                  className="inputs"
                  type="text"
                  name="domicilio"
                  placeholder="Por ejemplo: Igualdad 2992"
                  value={input.domicilio}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>

              <div className="inputsDiv">
                <label className="labelInp" htmlFor="email">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  className="inputs"
                  type="email"
                  name="email"
                  placeholder="Escribe tu email"
                  value={input.email}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="inputsDiv">
                <label className="labelInp" htmlFor="clave">
                  Contraseña
                </label>
                <input
                  className="inputs"
                  type={showPassword ? "text" : "password"}
                  name="clave"
                  id="clave"
                  placeholder="Escribe tu contraseña"
                  value={input.clave}
                  onChange={(e) => handleChange(e)}
                  required
                />
                {showPassword ? (
                  <RiEyeOffLine
                    className="ojoCerrado"
                    onClick={handleShowPassword}
                  />
                ) : (
                  <RiEyeLine
                    className="ojoAbierto"
                    onClick={handleShowPassword}
                  />
                )}
              </div>
              <div className="inputsDiv">
                <label htmlFor="profesiones" className="labelInp">
                  Profesion/es
                </label>
                <div className="checks">
                  {profesiones &&
                    profesiones.map((prof) => (
                      <div key={prof.id} className="checkContainer">
                        <input
                          className="check"
                          type="checkbox"
                          name="profesiones"
                          value={prof.id}
                          checked={selectedProfesiones.includes(prof.id)} // Marca el checkbox si la profesión está en el arreglo seleccionado
                          onChange={(e) => handleProfesionChange(e, prof.id)}
                        />
                        <label className="pCheck">{prof.profesion}</label>
                      </div>
                    ))}
                </div>
              </div>

              {registerError && <p className="errorText">{registerError}</p>}
              <button
                type="submit"
                className="submitBtn"
                name="submit"
                id="submit"
              >
                Crear Usuario
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
