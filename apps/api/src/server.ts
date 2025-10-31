import express = require("express");

// cria a aplicação (nosso servidor)
const app = express();

// cria a rota GET /health que responde "ok"
app.get("/teste", (req, res) => {
  res.send("ok");
});

// define a porta e inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
