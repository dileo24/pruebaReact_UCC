import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosteos } from "../redux/actions";
import Navbar from "./Navbar";

export default function Posts() {
  const posteos = useSelector((state) => state.posteos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosteos());
  }, [dispatch]);

  console.log(posteos);
  return (
    <>
      <Navbar link={"posteos"} />
      <div className="container mt-4">
        <a href="/nuevo_post" className=" btn btn-primary mb-2">
          Crear Post
        </a>
        {posteos &&
          posteos.map((post) => (
            <div className="cardPost" key={post.id}>
              <p className="title">{post.titulo}</p>
              <a href={`/usuarios/${post.Usuario.id}`} className="autor">
                {`${post.Usuario.nombre} ${post.Usuario.apellido}`}
              </a>
              <p className="cuerpo">{post.cuerpo}</p>
            </div>
          ))}
      </div>
    </>
  );
}
