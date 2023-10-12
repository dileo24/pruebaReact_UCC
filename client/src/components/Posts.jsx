import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosteos } from "../redux/actions";
import Navbar from "./Navbar";
import Pagination from "./Pagination";

export default function Posts() {
  const posts = useSelector((state) => state.posteosBusq);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosteos());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1); //guardar en un estado local la página actual
  const [postsPorPag, setDogsPerPage] = useState(8); //8 posts por página
  const indexOfLast = currentPage * postsPorPag; //en un principio va a ser 8
  const indexOfFirst = indexOfLast - postsPorPag; // 0
  const currentPosts = posts.slice(indexOfFirst, indexOfLast); //toma solamente entre el índice del prim y el ult
  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const recargarPosts = () => {
    dispatch(getPosteos());
  };

  return (
    <>
      <Navbar link={"posteos"} />
      {currentPosts.length > 0 ? (
        <div className="container mt-4">
          <a href="/nuevo_post" className=" btn btn-primary mb-2">
            Crear Post
          </a>

          {currentPosts?.map((post) => (
            <div className="cardPost" key={post.id}>
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
