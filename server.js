const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = "ptlc_cL0PtluhuFTYEnZP909et8EVOXnOkkvubQiP3ezjRD3";
const SERVER_ID = "c255005a";
const PANEL_URL = "https://panel.magmanode.com";

app.use(express.json());

// Endpoint para ligar o servidor
app.post("/start-server", async (req, res) => {
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

    if (response.ok) res.status(200).json({ message: "✅ Servidor iniciado com sucesso!" });
    else {
      const errText = await response.text();
      res.status(400).json({ message: "❌ Falha ao iniciar o servidor", erro: errText });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro de conexão com o painel", detalhe: err.message });
  }
});

// Servir o HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
