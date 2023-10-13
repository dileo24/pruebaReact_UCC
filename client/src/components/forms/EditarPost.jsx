import React, { useEffect, useState } from "react";
import { deletePost, getPosteos, updatePost } from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsFillTrashFill } from "react-icons/bs";
import ModalComponent from "../recursos/Modal";

export default function EditarPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posteos = useSelector((state) => state.posteos);
  const post = posteos.find((post) => post.id === Number(id));
  const [showModal, setShowModal] = useState(false);

  const handleModal = (boolean) => {
    boolean ? setShowModal(true) : setShowModal(false);
  };

  useEffect(() => {
    dispatch(getPosteos());
  }, [dispatch]);

  const [input, setInput] = useState({
    titulo: "",
    cuerpo: "",
  });

  // precargar datos del post cuando esté disponible
  useEffect(() => {
    if (post) {
      setInput({
        titulo: post.titulo,
        cuerpo: post.cuerpo,
      });
    }
  }, [post]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost(id, input));
    navigate("/posts");
    setInput({
      titulo: "",
      cuerpo: "",
    });
  };

  const volverFunc = () => {
    navigate(-1);
  };
  const handleDelete = (id) => {
    dispatch(deletePost(id)).then(() => {
      dispatch(getPosteos());
    });
    handleModal(false);
    navigate(`/posts`);
  };
  return (
    <div className="registerContainer">
      <button onClick={volverFunc} className="btn btn-primary volver">
        Volver
      </button>
      <div className="CardCont">
        <h1 className="">Edición de Posteo</h1>
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
              <div className="buttonss">
                <button
                  type="submit"
                  className="subBtn"
                  name="submit"
                  id="submit"
                >
                  ¡Guardar cambios!
                </button>
                <BsFillTrashFill
                  className="icon"
                  onClick={() => handleModal(true)}
                ></BsFillTrashFill>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ModalComponent
        showModal={showModal}
        handleModal={handleModal}
        funcion={() => handleDelete(post.id)}
        body={
          "¿Seguro que querés eliminar tu posteo? No vas a poder recuperarlo después."
        }
        title={"Confirma el borrado del posteo..."}
      />
    </div>
  );
}
