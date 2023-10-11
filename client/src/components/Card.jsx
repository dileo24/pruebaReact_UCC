import React from "react";
import userIMG from "../multimedia/64096.png";
import { useSelector } from "react-redux";

export default function Card({ id, nombre, apellido, openModal }) {
  const userActual = useSelector((state) => state.userActual);
  let userLogged = userActual && userActual.user.id === id ? true : false;

  return (
    <div className="card" style={{ width: "18rem" }}>
      {userLogged && <p className="vos">VOS</p>}
      <img
        src={userIMG}
        className={`card-img-top${userLogged ? " userCard" : ""}`}
        alt="userIMG"
      />
      <div onClick={openModal} className="card-body btn btn-primary">
        {nombre} {apellido}
      </div>
    </div>
  );
}
