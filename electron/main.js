import { fileURLToPath } from "url";
import { dirname } from "path";

// Substituir __dirname por uma forma compatível com ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import Store from "electron-store";
import {
  criarProduto,
  listarProdutos,
  atualizarProduto,
  deletarProduto,
} from "./database/db.js";

const store = new Store();

function createWindow() {
  const splash = new BrowserWindow({
    width: store.get("winWidth") || 800,
    height: store.get("winHeight") || 600,
    x: store.get("winX"),
    y: store.get("winY"),
    frame: false,
    alwaysOnTop: true,
    transparent: true,
  });

  splash.loadFile(path.join(__dirname, "splash.html"));

  const win = new BrowserWindow({
    width: store.get("winWidth") || 800,
    height: store.get("winHeight") || 600,
    x: store.get("winX"),
    y: store.get("winY"),
    icon: path.join(__dirname, "../public/tomando-notas.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Alterado para .js
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.setMenu(null); // Tira os menus
  win.loadFile(path.join(__dirname, "../dist/index.html"));

  // Quando a interface principal estiver pronta
  win.webContents.on("did-finish-load", () => {
    splash.destroy();
    win.show();
  });

  // Salvar posição e tamanho ao fechar
  win.on("close", () => {
    const [width, height] = win.getSize();
    const [x, y] = win.getPosition();
    store.set("winWidth", width);
    store.set("winHeight", height);
    store.set("winX", x);
    store.set("winY", y);
  });
}

app.whenReady().then(createWindow);

ipcMain.handle("criar-produto", async (event, produto) => {
  try {
    // salva no banco
    await criarProduto(produto);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle("listar-produtos", async () => {
  try {
    // busca no banco
    const produtos = await listarProdutos();
    return { success: true, produtos };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle("atualizar-produto", async (event, produto) => {
  try {
    // Atualiza no banco
    await atualizarProduto(produto);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle("deletar-produto", async (event, id) => {
  try {
    // Deleta no banco
    await deletarProduto(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
