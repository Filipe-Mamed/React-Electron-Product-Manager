import { toast } from "react-toastify"; // Importa o objeto toast da biblioteca react-toastify
import { Bounce, Zoom, Slide } from "react-toastify"; // Importa animações Bounce, Zoom e Slide da react-toastify
import "react-toastify/dist/ReactToastify.css"; // Importa o CSS da react-toastify para os estilos de notificação

function ShowToastify({
  message, // Mensagem a ser exibida na notificação
  type = "info", // Tipo de notificação (info, success, error, warn)
  position = "top-center", // Posição da notificação na tela
  autoClose = 6000, // Tempo para fechar automaticamente a notificação (em milissegundos)
  hideProgressBar = false, // Indica se a barra de progresso deve ser escondida
  closeOnClick = true, // Permite fechar a notificação ao clicar nela
  pauseOnHover = false, // Desativa a pausa no temporizador ao passar o mouse sobre a notificação
  draggable = true, // Permite arrastar a notificação na tela
  progress = undefined, // Controla o progresso da barra de notificação (undefined permite que a biblioteca controle)
  theme = "colored", // Aplica o tema colorido à notificação
  transition = Bounce, // Animação de transição da notificação
}) {
  // Função para mostrar a notificação com base no tipo
  function showToast() {
    if (type === "success") {
      toast.success(message, { position, autoClose, hideProgressBar, closeOnClick, pauseOnHover, draggable, progress, theme, transition});
    }
    if (type === "error") {
      toast.error(message, { position, autoClose, hideProgressBar, closeOnClick, pauseOnHover, draggable, progress, theme, transition});
    }
    if (type === "warn") {
      toast.warn(message, { position, autoClose, hideProgressBar, closeOnClick, pauseOnHover, draggable, progress, theme, transition});
    }
    if (type === "info") {
      toast.info(message, { position, autoClose, hideProgressBar, closeOnClick, pauseOnHover, draggable, progress, theme, transition});
    }
  }
   // Retorna o contêiner de notificação ToastContainer
  return (
    <>
      <ToastContainer
        position="top-center"
        closeOnClick = {true}
        autoClose = "6000"
        draggable
        newestOnTop
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover={false}
        theme="colored"
      />
    </>
  );
}

export default ShowToastify;