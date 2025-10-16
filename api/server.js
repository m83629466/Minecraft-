const http = require("http");
const fetch = require("node-fetch"); // node-fetch@2

const API_KEY = "ptlc_cL0PtluhuFTYEnZP909et8EVOXnOkkvubQiP3ezjRD3";
const SERVER_ID = "c255005a";
const PANEL_URL = "https://panel.magmanode.com";

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/start-server") {
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

      const result = response.ok
        ? { message: "✅ Servidor iniciado com sucesso!" }
        : { message: "❌ Falha ao iniciar o servidor" };

      res.writeHead(response.ok ? 200 : 400, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Erro de conexão com o painel", detalhe: err.message }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Servidor Node.js rodando em http://localhost:${PORT}`);
});
