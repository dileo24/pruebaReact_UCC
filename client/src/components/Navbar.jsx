import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanUserActual, searchXname } from "../redux/actions";
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
    e.preventDefault();
    if (search !== "") {
      dispatch(searchXname(search));
      setSearch("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const cerrarSesion = () => {
    dispatch(cleanUserActual());
    navigate("/");
  };

  return (
    <nav className="navbar bg-body-tertiary px-5">
      <div className="container-fluid">
        {link !== "perfil" ? (
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
        ) : (
          <a href="/posts" className="btn btn-primary me-2">
            Posteos
          </a>
        )}
        {userActual ? (
          <div>
            {link === "home" ? (
              <a href="/posts" className="btn btn-primary me-2">
                Posteos
              </a>
            ) : (
              <a href="/" className="btn btn-primary me-2">
                Inicio
              </a>
            )}
            <button onClick={cerrarSesion} className="btn btn-primary">
              Cerrar sesión
            </button>
          </div>
        ) : (
          <a
            href="/login"
            className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
          >
            Inicio de sesión
          </a>
        )}
      </div>
    </nav>
  );
}
