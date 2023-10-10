import React from "react";

export default function Modal({
  nombre,
  apellido,
  email,
  profesiones,
  domicilio,
  closeModal,
}) {
  return (
    <div
      className="modal fade show"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {nombre} {apellido}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <ol className="list-group list-group-numbered">
              <li className="list-group-item">Email: {email}</li>
              <li className="list-group-item">Domicilio: {domicilio}</li>
              <li className="list-group-item">
                Profesiones:
                {profesiones.map((prof) => prof.profesion).join(", ")}
              </li>
            </ol>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeModal}
            >
              Cerrar
            </button>
            <button type="button" className="btn btn-primary">
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
