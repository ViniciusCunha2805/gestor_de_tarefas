import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [priority, setPriority] = useState("MEDIUM");

  useEffect(() => {
    axios.get("http://localhost:3000/tasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  const addTask = async () => {
    if (!title || !description) return alert("Preencha todos os campos!");
    const newTask = { title, description, status, priority };

    const res = await axios.post("http://localhost:3000/tasks", newTask);
    setTasks([...tasks, res.data]);
    setTitle("");
    setDescription("");
  };

  const traduzirPrioridade = (priority: string) => {
    switch (priority) {
      case "LOW":
        return "Baixa";
      case "MEDIUM":
        return "Média";
      case "HIGH":
        return "Alta";
      default:
        return priority;
    }
  };

  const tarefasPendentes = tasks.filter((t) => t.status === "PENDING");
  const tarefasProgresso = tasks.filter((t) => t.status === "IN_PROGRESS");
  const tarefasConcluidas = tasks.filter((t) => t.status === "DONE");

  return (
    <div className="container">
      <h1>Gestor de Tarefas</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descrição detalhada"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="row">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="PENDING">Pendente</option>
            <option value="IN_PROGRESS">Em progresso</option>
            <option value="DONE">Concluída</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="LOW">Baixa prioridade</option>
            <option value="MEDIUM">Média prioridade</option>
            <option value="HIGH">Alta prioridade</option>
          </select>

          <button onClick={addTask}>Adicionar</button>
        </div>
      </div>

      {/* Colunas Kanban */}
      <div className="kanban">
        <div className="column">
          <h2>Pendente</h2>
          {tarefasPendentes.map((task) => (
            <div key={task.id} className="task">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="task-info">
                <span className={`priority ${task.priority.toLowerCase()}`}>
                  {traduzirPrioridade(task.priority)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="column">
          <h2>Em progresso</h2>
          {tarefasProgresso.map((task) => (
            <div key={task.id} className="task">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="task-info">
                <span className={`priority ${task.priority.toLowerCase()}`}>
                  {traduzirPrioridade(task.priority)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="column">
          <h2>Concluída</h2>
          {tarefasConcluidas.map((task) => (
            <div key={task.id} className="task done">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="task-info">
                <span className={`priority ${task.priority.toLowerCase()}`}>
                  {traduzirPrioridade(task.priority)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
