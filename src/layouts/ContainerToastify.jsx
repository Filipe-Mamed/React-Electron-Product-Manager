import { ToastContainer } from "react-toastify"; // Importa o componente ToastContainer da biblioteca react-toastify

// Componente ContainerShowMessage que renderiza o ToastContainer para exibição de mensagens
function ContainerToastify() {
  return (
    <>
     {/* Componente ToastContainer que exibe notificações na tela */}
      <ToastContainer
        position="top-center" // Posição do toast no topo central da tela
        closeOnClick = {true} // Permite fechar o toast ao clicar
        autoClose = "6000" // Tempo de fechamento automático do toast em milissegundos (6000ms = 6s)
        draggable // Permite arrastar o toast na tela
        newestOnTop = {true} // Exibe os toasts mais novos em cima
        rtl={false} // Desativa a orientação da direita para a esquerda
        pauseOnFocusLoss // Pausa o timer do toast se a janela perder o foco
        pauseOnHover={false} // Desativa a pausa do timer quando o mouse passa sobre o toast
        theme="colored" // Aplica o tema colorido ao toast
      />
    </>
  );
}

export default ContainerToastify;