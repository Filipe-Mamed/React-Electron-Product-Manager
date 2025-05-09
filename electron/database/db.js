import path from "path";
import { app } from "electron";
import sqlite3 from "sqlite3";

// Define o caminho do banco antes de criar a instância
const dbPath = path.join(app.getPath("downloads"), "hortifruti.db");
const db = new sqlite3.Database(dbPath);

// Criar tabela de produtos
db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo INTEGER NOT NULL UNIQUE,
        nome TEXT NOT NULL,
        categoria TEXT NOT NULL,
        quantidade INTEGER NOT NULL,
        preco REAL NOT NULL,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

// ✅ Criar produto com Promise
export function criarProduto(produto) {
  const { codigo, nome, categoria, quantidade, preco } = produto;
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO produtos (codigo, nome, categoria, quantidade, preco) VALUES (?, ?, ?, ?, ?)`,
      [codigo, nome, categoria, quantidade, parseFloat(preco).toFixed(2)],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

// ✅ Listar produtos com Promise
export function listarProdutos() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM produtos`, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// ✅ Atualizar produto com Promise
export function atualizarProduto(produto) {
  const { id, codigo, nome, categoria, quantidade, preco } = produto;
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE produtos SET codigo = ?, nome = ?, categoria = ?, quantidade = ?, preco = ?, atualizado_em = CURRENT_TIMESTAMP WHERE id = ?`,
      [codigo, nome, categoria, quantidade, parseFloat(preco).toFixed(2), id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      }
    );
  });
}

// ✅ Deletar produto com Promise
export function deletarProduto(id) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM produtos WHERE id = ?`, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
    });
  });
}
