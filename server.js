const fetch = require("node-fetch");

const API_KEY = "ptlc_cL0PtluhuFTYEnZP909et8EVOXnOkkvubQiP3ezjRD3"; // sua key do painel
const SERVER_ID = "c255005a";
const PANEL_URL = "https://panel.magmanode.com";
const MC_IP = "Speedfire1237-JVnv.aternos.me";
const MC_PORT = 63287;

module.exports = async (req, res) => {
  // --- LIGAR SERVIDOR VIA API ---
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

      if (response.ok) {
        res.status(200).end(JSON.stringify({ message: "✅ Servidor iniciado com sucesso!" }));
      } else {
        const errText = await response.text();
        res.status(400).end(JSON.stringify({ message: "❌ Falha ao iniciar o servidor.", erro: errText }));
      }
    } catch (err) {
      res.status(500).end(JSON.stringify({ message: "Erro de conexão com o painel.", detalhe: err.message }));
    }

  // --- EXIBIR INTERFACE HTML ---
  } else if (req.method === "GET") {
    res.setHeader("Content-Type", "text/html");
    res.end(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Speedfire1237 Server</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #2c3e50, #4ca1af);
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            text-align: center;
          }
          h1 { font-size: 28px; margin-bottom: 10px; }
          button {
            background: #27ae60;
            color: white;
            border: none;
            padding: 15px 25px;
            font-size: 18px;
            border-radius: 10px;
            cursor: pointer;
            transition: background 0.3s;
            margin: 10px;
          }
          button:hover { background: #2ecc71; }
          .info {
            background: rgba(255,255,255,0.1);
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 15px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <h1>🎮 Speedfire1237 Server</h1>
        <p>Gerencie e entre no servidor:</p>

        <button id="startServer">🚀 Ligar Servidor</button>
        <button id="openMinecraft">🎮 Abrir no Minecraft</button>
        <button id="openCraftsman">🧱 Abrir na Play Store (Craftsman)</button>

        <div class="info">
          <p><strong>IP:</strong> ${MC_IP}</p>
          <p><strong>Porta:</strong> ${MC_PORT}</p>
          <p><strong>Status:</strong> <span id="status">Carregando...</span></p>
        </div>

        <script>
          async function checkStatus() {
            try {
              const res = await fetch("https://api.mcsrvstat.us/2/${MC_IP}");
              const data = await res.json();
              document.getElementById("status").innerText = data.online ? "Online ✅" : "Offline ❌";
            } catch {
              document.getElementById("status").innerText = "Erro ao verificar status";
            }
          }

          document.getElementById("startServer").addEventListener("click", async () => {
            try {
              const res = await fetch(window.location.href, { method: "POST" });
              const data = await res.json();
              alert(data.message);
              setTimeout(checkStatus, 5000);
            } catch {
              alert("Erro ao conectar com o servidor.");
            }
          });

          document.getElementById("openMinecraft").addEventListener("click", () => {
            window.location.href = "minecraft://?addExternalServer=${MC_IP}|${MC_IP}:${MC_PORT}";
          });

          document.getElementById("openCraftsman").addEventListener("click", () => {
            window.location.href = "https://play.google.com/store/apps/details?id=com.craftsman.go";
          });

          checkStatus();
          setInterval(checkStatus, 15000);
        </script>
      </body>
      </html>
    `);
  } else {
    res.status(405).end(JSON.stringify({ message: "Método não permitido" }));
  }
};
