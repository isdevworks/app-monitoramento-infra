const express = require("express");
const cors = require("cors");
const os = require("os");
const si = require("systeminformation"); // Nova ferramenta importada

const app = express();
app.use(cors());

// Note que adicionámos 'async' porque a leitura do disco demora milissegundos
app.get("/metricas", async (req, res) => {
  try {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const memPercent = ((usedMem / totalMem) * 100).toFixed(1);

    // Lendo os dados dos discos (SSDs/HDDs)
    const disco = await si.fsSize();
    const discoPrincipal = disco[0]; // Pega no primeiro volume (geralmente C:)

    res.json({
      sistema: os.type(),
      hostname: os.hostname(), // Novo: Nome do seu PC
      nucleosCPU: os.cpus().length,
      memoria: {
        usoPorcentagem: memPercent,
        totalGB: (totalMem / 1024 ** 3).toFixed(2),
        usadaGB: (usedMem / 1024 ** 3).toFixed(2),
      },
      disco: {
        usoPorcentagem: discoPrincipal ? discoPrincipal.use.toFixed(1) : 0,
        totalGB: discoPrincipal
          ? (discoPrincipal.size / 1024 ** 3).toFixed(2)
          : 0,
        usadoGB: discoPrincipal
          ? (discoPrincipal.used / 1024 ** 3).toFixed(2)
          : 0,
      },
      uptimeHoras: (os.uptime() / 3600).toFixed(1),
    });
  } catch (error) {
    res.status(500).json({ erro: "Falha ao ler hardware" });
  }
});

app.listen(3000, "0.0.0.0", () =>
  console.log("API de Infra a correr na porta 3000!"),
);
