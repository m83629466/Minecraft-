const fetch = require("node-fetch");

const API_KEY = "ptlc_cL0PtluhuFTYEnZP909et8EVOXnOkkvubQiP3ezjRD3";
const SERVER_ID = "c255005a";
const PANEL_URL = "https://panel.magmanode.com";

module.exports = async (req, res) => {
  if (req.method === "POST") {
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

      res.setHeader("Content-Type", "application/json");
      if (response.ok) res.status(200).json({ message: "✅ Servidor iniciado com sucesso!" });
      else {
        const errText = await response.text();
        res.status(400).json({ message: "❌ Falha ao iniciar o servidor", erro: errText });
      }
    } catch (err) {
      res.status(500).json({ message: "Erro de conexão com o painel", detalhe: err.message });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
};
