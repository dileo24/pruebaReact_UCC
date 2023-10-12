import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPosteos } from "../redux/actions";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export default function Posts() {
  const posts = useSelector((state) => state.posteosBusq);
  const userActual = useSelector((state) => state.userActual);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleModal = (boolean) => {
    boolean ? setShowModal(true) : setShowModal(false);
  };

  useEffect(() => {
    dispatch(getPosteos());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1); // guardar en un estado local la página actual
  const [postsPorPag, setDogsPerPage] = useState(8); // 8 posts por página
  const indexOfLast = currentPage * postsPorPag; // en un principio va a ser 8
  const indexOfFirst = indexOfLast - postsPorPag; // 0
  const currentPosts = posts.slice(indexOfFirst, indexOfLast); // toma solamente entre el índice del prim y el ult
  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const recargarPosts = () => {
    dispatch(getPosteos());
  };

  const handlePostFunction = (id, type) => {
    console.log(id, type);
    if (type === "borrar") {
      dispatch(deletePost(id)).then(() => {
        dispatch(getPosteos());
      });
      handleModal(false);
    } else {
      navigate(`/posts/${id}`);
    }
  };

  return (
    <>
      <Navbar link={"posteos"} />
      {currentPosts.length > 0 ? (
        <div className="container mt-4">
          <a href="/nuevo_post" className="btn btn-primary mb-2">
            Crear Post
          </a>

          {currentPosts?.map((post) => (
            <div
              className={`cardPost${
                post.Usuario.id === userActual.id ? " userCard" : ""
              }`}
              key={post.id}
            >
              {post.Usuario.id === userActual.id && (
                <div className="navPost">
                  <p className="vos">VOS</p>
                  <div className="buttonsPost">
                    <BsFillPencilFill
                      className="icon"
                      onClick={() => handlePostFunction(post.id, "editar")}
                    ></BsFillPencilFill>
                    <BsFillTrashFill
                      className="icon"
                      onClick={() => handleModal(true)}
                    ></BsFillTrashFill>
                  </div>
                  <Modal show={showModal} onHide={() => handleModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        Confirma el borrado del posteo...
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      ¿Seguro que querés eliminar tu posteo? No vas a poder
                      recuperarlo después.
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => handleModal(false)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handlePostFunction(post.id, "borrar")}
                      >
                        Eliminar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              )}
              <p className="title">{post.titulo}</p>
              <a href={`/usuarios/${post.Usuario.id}`} className="autor">
                {`${post.Usuario.nombre} ${post.Usuario.apellido}`}
              </a>
              <p className="cuerpo">{post.cuerpo}</p>
            </div>
          ))}
          <div className="pags">
            <Pagination
              postsPorPag={postsPorPag}
              posts={posts.length}
              currentPage={currentPage}
              paginated={paginated}
            />
          </div>
        </div>
      ) : (
        <div className="homeContainer">
          <div className="aviso">
            <h1>¡Post no encontrado!</h1>
            <button className="btn btn-primary" onClick={recargarPosts}>
              Recargar lista completa de posteos.
            </button>
          </div>
        </div>
      )}
    </>
  );
}
