const express = require("express");
const fetch = require("node-fetch"); // node-fetch@2
const cors = require("cors");

const app = express();
app.use(cors()); // permite que o HTML remoto acesse a API
app.use(express.json());

const API_KEY = "ptlc_EHYPGUJawkUfF3p9hOtl1L48yYWE8aNtVmsz87kpdE2";
const SERVER_ID = "143f80a9";
const PANEL_URL = "https://panel.magmanode.com";

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

    if (response.ok) {
      res.json({ message: "✅ Servidor iniciado com sucesso!" });
    } else {
      const errText = await response.text();
      res.status(400).json({ message: "❌ Falha ao iniciar o servidor", erro: errText });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro de conexão com o painel", detalhe: err.message });
  }
});

// Porta padrão do host ou 3000 localmente
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor Node rodando em http://localhost:${PORT}`));
