import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsuarios } from "../redux/actions";
import Card from "./Card";
import Modal from "./Modal";
import Navbar from "./Navbar";

export default function Home() {
  let usuarios = useSelector((state) => state.usuarios);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  console.log(usuarios);
  return (
    <>
      <Navbar />
      {usuarios && (
        <div className="homeContainer">
          <div className="ususariosContainer">
            {usuarios.map((user) => (
              <div key={user.id}>
                <Card
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
      )}
    </>
  );
}
