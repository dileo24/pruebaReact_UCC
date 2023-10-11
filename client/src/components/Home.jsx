import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsuarios } from "../redux/actions";
import Card from "./Card";
import Modal from "./Modal";
import Navbar from "./Navbar";

export default function Home() {
  let usuarios = useSelector((state) => state.usuariosBusq);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);

  const recargarUsuarios = () => {
    dispatch(getUsuarios());
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      {usuarios.length > 0 ? (
        <div className="homeContainer">
          <div className="usuariosContainer">
            {usuarios.map((user) => (
              <div key={user.id}>
                <Card
                  id={user.id}
                  nombre={user.nombre}
                  apellido={user.apellido}
                  openModal={openModal}
                />
                {showModal && (
                  <Modal
                    nombre={user.nombre}
                    apellido={user.apellido}
                    email={user.email}
                    domicilio={user.domicilio}
                    profesiones={user.Profesions}
                    closeModal={closeModal}
                  />
                )}
                {showModal && <div className="modal-backdrop fade show"></div>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="homeContainer">
          <div className="aviso">
            <h1>Usuario no encontrado!</h1>
            <button className="btn btn-primary" onClick={recargarUsuarios}>
              Recargar lista completa de usuarios.
            </button>
          </div>
        </div>
      )}
    </>
  );
}
