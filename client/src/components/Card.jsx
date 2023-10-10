import React from "react";
import userIMG from "../multimedia/64096.png";

export default function Card({ nombre, apellido, openModal }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={userIMG} className="card-img-top" alt="userIMG" />
      <div className="card-body">
        <button onClick={openModal} className="card-text">
          {nombre} {apellido}
        </button>
      </div>
    </div>
  );
}
