import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarios, getUserActual } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { RiEyeOffLine, RiEyeLine } from "react-icons/ri";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);

  const [input, setInput] = useState({
    email: "",
    clave: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userEmail = usuarios.find((user) => user.email === input.email);
    if (userEmail) {
      dispatch(getUserActual({ email: input.email, clave: input.clave }))
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          setLoginError("Contraseña incorrecta. Pruebe de nuevo.");
        });
    } else {
      setLoginError("Este email no se encuentra registrado.");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const volverFunction = () => {
    navigate("/");
  };
  return (
    <div className="loginContainer">
      <button className="btn btn-primary volver" onClick={volverFunction}>
        Volver
      </button>
      <div className="CardCont">
        <h1 className="">Inicio de Sesión</h1>
        <div className="cardContainer">
          <div className="cardLogin ">
            <form onSubmit={handleSubmit} className="formLogin">
              <div className="email">
                <label className="emailLabel" htmlFor="email">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  className="emailInput"
                  type="email"
                  name="email"
                  placeholder="Escribe tu email"
                  value={input.email}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="clave">
                <label className="claveLabel" htmlFor="clave">
                  Contraseña
                </label>
                <input
                  className="claveInput"
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
              {loginError && <p className="errorText">{loginError}</p>}
              <button
                type="submit"
                className="submitBtn"
                name="submit"
                id="submit"
              >
                Iniciar Sesión
              </button>
            </form>
            <div className="aviso">
              <a href="/register">¿No tiene una cuenta? ¡Regístrese!</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
