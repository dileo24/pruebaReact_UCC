import React from "react";
import Navbar from "./Navbar";
import fondo from "../multimedia/fondo.png";

export default function Home() {
  return (
    <div>
      <Navbar link="home" />
      <div className="containerH">
        <div className="content">
          <p className="titulo">¡PostPage!</p>
          <div className="text">
            <p>
              Una página diseñada para compartir tus posts a gusto y poder leer
              los de los otros usuarios.
            </p>
            <p>
              Además podrás ver a los distintos usuarios existentes en la
              página.
            </p>
          </div>
          <a href="/posts" className="btn btn-primary">
            ¡Empieza a interactuar!
          </a>
        </div>
        <img src={fondo} alt="fondo" className="image" />
      </div>
    </div>
  );
}
