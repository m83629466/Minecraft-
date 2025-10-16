const fetch = require("node-fetch"); // node-fetch@2

const API_KEY = "ptlc_cL0PtluhuFTYEnZP909et8EVOXnOkkvubQiP3ezjRD3";
const SERVER_ID = "c255005a";
const PANEL_URL = "https://panel.magmanode.com";

async function startServer() {
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
      console.log("✅ Servidor iniciado com sucesso!");
    } else {
      const errText = await response.text();
      console.error("❌ Falha ao iniciar o servidor:", errText);
    }
  } catch (err) {
    console.error("Erro de conexão com o painel:", err.message);
  }
}

// Executa
startServer();
