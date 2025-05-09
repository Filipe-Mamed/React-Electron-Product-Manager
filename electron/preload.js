const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  criarProduto: (produto) => ipcRenderer.invoke("criar-produto", produto),
  listarProdutos: () => ipcRenderer.invoke("listar-produtos"),
  atualizarProduto: (produto) =>
    ipcRenderer.invoke("atualizar-produto", produto),
  deletarProduto: (id) => ipcRenderer.invoke("deletar-produto", id),
});
