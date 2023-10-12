import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanUserActual,
  deletePost,
  deleteUsuario,
  getUserID,
  getUsuarios,
  updateUsuario,
} from "../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { Modal, Button } from "react-bootstrap";

export default function Perfil() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usuarios = useSelector((state) => state.usuarios);
  const userData = useSelector((state) => state.perfil); //para los otros perfiles
  const userActual = useSelector((state) => state.userActual); //para el perfil logeado
  const emails = usuarios && usuarios.map((user) => user.email);
  const [registerError, setRegisterError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getUserID(id));
    dispatch(getUsuarios());
  }, [dispatch, id]);

  const [input, setInput] = useState({
    nombre: userActual ? userActual.nombre : "",
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
      setRegisterError("El email ingresado ya existe");
    } else {
      dispatch(updateUsuario(userActual.id, input));
    }
  };

  const handleModal = (boolean) => {
    boolean ? setShowModal(true) : setShowModal(false);
  };

  const handleEliminar = () => {
    userActual.Posts.map((post) => dispatch(deletePost(post.id)));
    //borrar posts antes de borrar la cuenta
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
                        {registerError && (
                          <p className="errorText">{registerError}</p>
                        )}
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
                        {userActual.Posts.length}
                      </li>
                      <li className="list-group-item">
                        <label>Profesiones:</label>{" "}
                        {userActual.Profesions.map(
                          (prof) => prof.profesion
                        ).join(", ")}
                      </li>
                    </ul>
                    <div className="mt-4">
                      <button type="submit" className="btn btn-primary me-2">
                        Guardar Cambios
                      </button>
                      <button
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
        )}{" "}
        <Modal show={showModal} onHide={() => handleModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirma el borrado de tu cuenta...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Seguro que querés eliminar tu cuenta? No vas a poder recuperarla
            después.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleEliminar}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
