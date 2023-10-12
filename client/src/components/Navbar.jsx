import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanUserActual, searchPosts, searchXname } from "../redux/actions";
import { useNavigate } from "react-router-dom";

export default function Navbar({ link }) {
  const userActual = useSelector((state) => state.userActual);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    if (e) {
      e.preventDefault(); // evita recargar página
      if (link === "home") {
        dispatch(searchXname(search));
      } else if (link === "posteos") {
        dispatch(searchPosts(search));
      }
      setSearch("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // asegura no enviar un formulario, ejecuta handleSearch
      handleSearch(e);
    }
  };

  const cerrarSesion = () => {
    dispatch(cleanUserActual());
    navigate("/");
  };

  return (
    <>
      {link !== "home" && (
        <nav className="navbar bg-body-tertiary px-5">
          <div className="container-fluid">
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="me-2"
                placeholder="Nombre..."
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={search}
              />
              <button
                className="btn btn-outline-primary btn-hover-blue"
                type="submit"
              >
                Búsqueda
              </button>
            </form>

            {userActual ? (
              <div>
                {link === "usuarios" ? (
                  <a
                    href="/posts"
                    className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover me-4"
                  >
                    Posteos
                  </a>
                ) : (
                  <a
                    href="/usuarios"
                    className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover me-4"
                  >
                    Usuarios
                  </a>
                )}
                <button onClick={cerrarSesion} className="btn btn-primary">
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div>
                {link !== "usuarios" ? (
                  <a
                    href="/posts"
                    className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover me-4"
                  >
                    Posteos
                  </a>
                ) : (
                  <a
                    href="/usuarios"
                    className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover me-4"
                  >
                    Usuarios
                  </a>
                )}
                <a
                  href="/login"
                  className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                >
                  Inicio de sesión
                </a>
              </div>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
