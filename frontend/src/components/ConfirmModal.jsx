import React from "react";

export const ConfirmModal = ({ texto, modo, visible, onConfirm, onCancel }) => {
  if (!visible) return null;

  return (
    <>
      <div className="modal-confirmacion">
        <div className="modal-contenido">
          <h3>{texto}</h3>
          <div className="modal-botones">
            <button className="btn-confirmar" onClick={onConfirm}>
              Sí, {modo}
            </button>
            <button className="btn-cancelar" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
