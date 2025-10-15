// server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURAÇÕES
const API_KEY = "ptlc_cL0PtluhuFTYEnZP909et8EVOXnOkkvubQiP3ezjRD3";
const SERVER_ID = "c255005a";
const PANEL_URL = "https://panel.magmanode.com"; // painel principal do MagmaNode

// Rota para ligar o servidor
app.post("/ligar", async (req, res) => {
  try {
    const response = await fetch(`${PANEL_URL}/api/client/servers/${SERVER_ID}/power`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "Application/vnd.pterodactyl.v1+json"
      },
      body: JSON.stringify({ signal: "start" })
    });

    if (response.ok) {
      res.json({ message: "✅ Servidor iniciado com sucesso!" });
    } else {
      const err = await response.text();
      res.status(400).json({ message: "❌ Falha ao iniciar o servidor.", erro: err });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao conectar com o painel.", detalhe: err.message });
  }
});

// Página web simples com botão
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Ligar Servidor MagmaNode</title>
      <style>
        body {
          background: linear-gradient(135deg, #2c3e50, #4ca1af);
          color: white;
          font-family: Arial;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        button {
          background: #27ae60;
          color: white;
          border: none;
          padding: 15px 25px;
          font-size: 18px;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.3s;
        }
        button:hover { background: #2ecc71; }
      </style>
    </head>
    <body>
      <h1>🚀 Ligar Servidor Minecraft</h1>
      <button id="startServer">Ligar Agora</button>
      <script>
        document.getElementById("startServer").addEventListener("click", async () => {
          const res = await fetch("/ligar", { method: "POST" });
          const data = await res.json();
          alert(data.message);
        });
      </script>
    </body>
    </html>
  `);
});

const PORT = 3000;
app.listen(PORT, () => console.log("Servidor rodando em http://localhost:" + PORT));
