import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar bg-body-tertiary px-5 mb-5">
      <div className="container-fluid">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Nombre..."
            aria-label="Search"
          />
          <button
            className="btn btn-outline-primary btn-hover-blue"
            type="submit"
          >
            Búsqueda
          </button>
        </form>
        <a
          href="/login"
          className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
        >
          Inicio de sesión
        </a>
      </div>
    </nav>
  );
}
