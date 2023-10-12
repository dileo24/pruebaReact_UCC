import React, { useEffect, useState } from "react";
import { createPost, getPosteos } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function NuevoPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActual = useSelector((state) => state.userActual);

  useEffect(() => {
    dispatch(getPosteos());
  }, [dispatch]);

  const [input, setInput] = useState({
    userId: userActual.id,
    titulo: "",
    cuerpo: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(input));
    navigate("/posts");
    setInput({
      titulo: "",
      cuerpo: "",
    });
  };

  return (
    <div className="registerContainer">
      <a href="/posts" className="btn btn-primary volver">
        Volver
      </a>
      <div className="CardCont">
        <h1 className="">Creación de Posteos</h1>
        <div className="cardContainer">
          <div className="cardLogin ">
            <form onSubmit={handleSubmit} className="formLogin">
              <div className="inputsDiv">
                <label htmlFor="titulo" className="labelInp">
                  Título:
                </label>
                <input
                  className="inputs"
                  type="text"
                  name="titulo"
                  placeholder="Un Gran Título Llama la Atención"
                  value={input.titulo}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>

              <div className="inputsDiv">
                <label htmlFor="cuerpo" className="labelInp">
                  Cuerpo del posteo:
                </label>
                <textarea
                  className="inputs"
                  type="text"
                  name="cuerpo"
                  placeholder="Escriba lo que desee..."
                  value={input.cuerpo}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>

              <button
                type="submit"
                className="submitBtn"
                name="submit"
                id="submit"
              >
                ¡Subir Posteo!
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
