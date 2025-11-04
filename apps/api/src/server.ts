import express from "express";
import { PrismaClient } from "./generated/prisma/index.js";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const { title, description } = req.body;
  const task = await prisma.task.create({
    data: {
      title,
      description,
      userId: 1, // usuário de teste (ajuste conforme seu banco)
    },
  });
  res.json(task);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
