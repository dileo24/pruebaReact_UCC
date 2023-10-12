import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsuarios } from "../redux/actions";
import Card from "./Card";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Usuarios() {
  let usuarios = useSelector((state) => state.usuariosBusq);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);

  const recargarUsuarios = () => {
    dispatch(getUsuarios());
  };

  const goPerfil = (id) => {
    navigation(`/usuarios/${id}`);
  };

  return (
    <>
      <Navbar link={"usuarios"} />
      {usuarios.length > 0 ? (
        <div className="homeContainer">
          <div className="usuariosContainer">
            {usuarios.map((user) => (
              <div key={user.id}>
                <Card
                  id={user.id}
                  nombre={user.nombre}
                  apellido={user.apellido}
                  goPerfil={goPerfil}
                />
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
