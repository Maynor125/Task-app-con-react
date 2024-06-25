/*import { useState } from 'react';*/
import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Task from "./components/Task";
import taskService from "./service/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  //capturar los estados de los campos titulo y descripcion.
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await taskService.getTasks();
      console.log("Respuesta de la API:", response); // Verifica la respuesta de la API en consola
      setTasks(response); // Actualiza el estado con los datos de la API
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks(); // Llama a la función para obtener las tareas cuando el componente se monte
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingTask) {
        const updateTask = {
          id: editingTask.id,
          titulo: titulo,
          descripcion: descripcion,
          fechaCreacion: editingTask.fechaCreacion,
          estado: editingTask.estado,
        };
        await taskService.updateTask(updateTask);
        getTasks();
        setEditingTask(null);
      } else {
        const newTask = {
          titulo: titulo,
          descripcion: descripcion,
          fechaCreacion: new Date().toISOString().split("T")[0],
          estado: "Incompleta",
        };
        console.log("creando tarea");
        await taskService.addTask(newTask);
        getTasks();
      }
      setTitulo("");
      setDescripcion("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (task) => {
    setTitulo(task.titulo);
    setDescripcion(task.descripcion);
    setEditingTask(task);
    console.log("el titulo",titulo)
  };

  const handleDelete = async (id) => {
    try {
      await taskService.deleteTask(id);
      getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = async(task) => {
    try {
      const updatedTask = {
        ...task,
        estado: "Completa",
      };
      await taskService.updateTask(updatedTask);
      getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <Navbar />
      <form action="" className="formulario" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titulo"
          value={titulo}
          required
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripcion"
          value={descripcion}
          required
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : editingTask ? "Actualizar" : "Enviar"}
        </button>
      </form>
      <section className="task-container">
        {loading ? (
          <div>Cargando....</div>
        ) : (
          tasks?.map((task) => (
            <Task
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onUpdate={handleEdit}
              onComplete={handleComplete}
            />
          ))
        )}
      </section>  
      <Footer />
    </main>
  );
}

export default App;
