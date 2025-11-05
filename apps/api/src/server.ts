import express from "express";
import { PrismaClient } from "./generated/prisma/index.js";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "http://localhost:5173", // libera o frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// Buscar todas as tarefas
app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// Criar uma nova tarefa
app.post("/tasks", async (req, res) => {
  const { title, description, status, priority } = req.body;
  const task = await prisma.task.create({
    data: { title, description, status, priority, userId: 1 },
  });
  res.json(task);
});

// Criar um comentário
app.post("/comments", async (req, res) => {
  const { content, taskId } = req.body;
  const comment = await prisma.comment.create({
    data: {
      content,
      taskId,
    },
  });
  res.json(comment);
});

// Criar um anexo
app.post("/attachments", async (req, res) => {
  const { filePath, originalName, size, taskId } = req.body;
  const attachment = await prisma.attachment.create({
    data: { filePath, originalName, size, taskId },
  });
  res.json(attachment);
});

// Buscar uma tarefa específica com comentários e anexos
app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
    include: { comments: true, attachments: true },
  });
  res.json(task);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
