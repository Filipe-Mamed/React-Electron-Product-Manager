import { useEffect } from "react";
import { Modal } from "bootstrap";
import { HiXMark } from "react-icons/hi2";

/**
 * Componente de modal de alerta reutilizável.
 *
 * Props:
 * - show: boolean para exibir ou não o modal
 * - titulo: título exibido no cabeçalho do modal
 * - mensagem: mensagem exibida no corpo do modal
 * - onConfirm: função chamada ao confirmar
 * - onCancel: função chamada ao cancelar ou fechar o modal
 */
function ModalAlert({ show, titulo, mensagem, onConfirm, onCancel }) {
  useEffect(() => {
    const modalEl = document.getElementById("modalExemplo");

    if (show && modalEl) {
      const modal = new Modal(modalEl, {
        backdrop: "static", // impede fechar clicando fora do modal
        keyboard: false, // impede fechar com tecla ESC
      });

      const handleHidden = () => {
        onCancel(); // dispara onCancel quando o modal é fechado
      };

      // Adiciona listener para quando o modal for escondido
      modalEl.addEventListener("hidden.bs.modal", handleHidden);

      // Exibe o modal
      modal.show();

      // Remove o listener ao desmontar o componente ou mudar dependências
      return () => {
        modalEl.removeEventListener("hidden.bs.modal", handleHidden);
      };
    }
  }, [show, onCancel]);

  return (
    <div
      className="modal fade"
      id="modalExemplo"
      tabIndex="-1"
      aria-labelledby="modalExemploLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Cabeçalho do modal */}
          <div className="modal-header border-bottom border-secondary modal-alert d-flex justify-content-between">
            <h5 className="modal-title" id="modalExemploLabel">
              {titulo}
            </h5>

            {/* Ícone de fechar (X) usando react-icons */}
            <HiXMark
              type="button"
              className="fs-2 button-close"
              data-bs-dismiss="modal"
              aria-label="Fechar"
              onClick={onCancel}
            />
          </div>

          {/* Corpo do modal */}
          <div className="modal-body modal-alert">{mensagem}</div>

          {/* Rodapé do modal com botões de ação */}
          <div className="modal-footer border-bottom border-secondary modal-alert">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onConfirm}
              data-bs-dismiss="modal"
            >
              Confirmar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAlert;
