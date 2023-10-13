import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanUserActual,
  deleteUsuario,
  getUserID,
  getUsuarios,
  updateUsuario,
} from "../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import ModalComponent from "./Modal";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export default function Perfil() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usuarios = useSelector((state) => state.usuarios);
  const userData = useSelector((state) => state.perfil); //para los otros perfiles
  const userActual = useSelector((state) => state.userActual); //para el perfil logeado
  const emails = usuarios && usuarios.map((user) => user.email);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mensaje, setMensaje] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(getUserID(id));
    dispatch(getUsuarios());
  }, [dispatch, id]);

  const [input, setInput] = useState({
    nombre: userActual ? userActual.nombre : "",
    clave: "",
    claveAntigua: "",
    apellido: userActual ? userActual.apellido : "",
    email: userActual ? userActual.email : "",
    domicilio: userActual ? userActual.domicilio : "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      emails &&
      emails.filter((email) => email !== userActual.email).includes(input.email)
    ) {
      setError("El email ingresado ya existe");
    } else {
      dispatch(updateUsuario(userActual.id, input))
        .then(() => {
          setMensaje(true);
          setTimeout(() => {
            setMensaje(false);
            setInput({
              ...input,
              clave: "",
              claveAntigua: "",
            });
          }, 1750);
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setError("Contraseña incorrecta. Pruebe de nuevo.");
            setTimeout(() => {
              setError("");
            }, 2500);
          }
        });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleModal = (boolean) => {
    setMensaje(false);
    boolean ? setShowModal(true) : setShowModal(false);
  };

  const handleEliminar = () => {
    dispatch(deleteUsuario(id));
    dispatch(cleanUserActual());
    setShowModal(false);
    navigate("/");
  };
  return (
    <>
      <Navbar link="perfil" />
      <div className="container">
        {userData && (
          <div className="dialog" role="document">
            <div className="content">
              {userActual && userActual.id === Number(id) ? (
                <form onSubmit={handleSubmit}>
                  <div className="header mt-4">
                    <h5 className="title" id="exampleModalLabel">
                      <div className="row">
                        <div className="col-md-6">
                          <label>Nombre:</label>{" "}
                          <input
                            type="text"
                            name="nombre"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                            required
                            value={input.nombre}
                          />
                        </div>
                        <div className="col-md-6">
                          <label>Apellido:</label>{" "}
                          <input
                            type="text"
                            name="apellido"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                            required
                            value={input.apellido}
                          />
                        </div>
                      </div>
                    </h5>
                  </div>

                  <div className="body">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <label>Email:</label>
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                          onChange={(e) => handleChange(e)}
                          required
                          value={input.email}
                        />
                      </li>
                      <li className="list-group-item">
                        <label>
                          Contraseña actual (requerida para cualquier cambio):
                        </label>
                        <div className="inputt">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="claveAntigua"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                            required
                            value={input.claveAntigua}
                          />{" "}
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
                      </li>
                      <li className="list-group-item">
                        <label>Nueva Contraseña:</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="clave"
                          className="form-control"
                          onChange={(e) => handleChange(e)}
                          value={input.clave}
                        />
                      </li>
                      <li className="list-group-item">
                        <label>Domicilio:</label>
                        <input
                          type="text"
                          name="domicilio"
                          className="form-control"
                          onChange={(e) => handleChange(e)}
                          required
                          value={input.domicilio}
                        />
                      </li>
                      <li className="list-group-item">
                        <label>Cantidad de posteos: </label>{" "}
                        {userActual.Posts ? userActual.Posts.length : "0"}
                      </li>
                      <li className="list-group-item">
                        <label>Profesiones:</label>{" "}
                        {userActual.Profesions.map(
                          (prof) => prof.profesion
                        ).join(", ")}
                      </li>
                    </ul>
                    {error && <p className="errorText">{error}</p>}
                    <div className="botonesPerf mt-4 d-flex justify-content-between">
                      <button type="submit" className="btn btn-primary me-2">
                        Guardar Cambios
                      </button>
                      {mensaje && (
                        <div className="alert alert-success" role="alert">
                          Guardado correctamente
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleModal(true)} //modal
                        className="btn btn-danger"
                      >
                        Borrar cuenta
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <div className="header mt-4">
                    <h5 className="title" id="exampleModalLabel">
                      {userData.nombre} {userData.apellido}
                    </h5>
                  </div>
                  <div className="body">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <label>Email:</label> {userData.email}
                      </li>
                      <li className="list-group-item">
                        <label>Domicilio:</label> {userData.domicilio}
                      </li>
                      <li className="list-group-item">
                        <label>Cantidad de posteos:</label>{" "}
                        {userData.Posts && userData.Posts.length}
                      </li>
                      <li className="list-group-item">
                        <label>Profesiones:</label>{" "}
                        {userData.Profesions &&
                          userData.Profesions.map(
                            (prof) => prof.profesion
                          ).join(", ")}
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        <ModalComponent
          showModal={showModal}
          handleModal={handleModal}
          funcion={handleEliminar}
          body={
            "¿Seguro que querés eliminar tu cuenta? No vas a poder recuperarla después."
          }
          title={"Confirma el borrado de tu cuenta..."}
        />
      </div>
    </>
  );
}
