import { useState, useEffect } from "react";
import initialData from "../data/initialData";
import Column from "./Column";
import { DndContext } from "@dnd-kit/core";

function Board() {
  // ✅ Load from localStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanbanTasks");
    return saved ? JSON.parse(saved) : initialData;
  });

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ Add Task
  const addTask = (column) => {
    const title = prompt("Enter task name:");
    if (!title) return;

    const newTask = {
      id: Date.now().toString(),
      title
    };

    setTasks((prev) => ({
      ...prev,
      [column]: [...prev[column], newTask]
    }));
  };

  // ✅ Delete Task
  const deleteTask = (column, taskId) => {
    if (!window.confirm("Delete this task?")) return;

    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].filter((task) => task.id !== taskId)
    }));
  };

  // ✅ Edit Task
  const editTask = (column, taskId) => {
    const newTitle = prompt("Edit task:");
    if (!newTitle) return;

    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    }));
  };

  // ✅ Drag & Drop Logic
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const sourceColumn = active.data.current.column;
    const targetColumn = over.id;

    if (sourceColumn === targetColumn) return;

    const task = tasks[sourceColumn].find(
      (t) => t.id === active.id
    );

    setTasks((prev) => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter((t) => t.id !== active.id),
      [targetColumn]: [...prev[targetColumn], task]
    }));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
          alignItems: "flex-start"
        }}
      >
        <Column
          id="todo"
          title="To Do"
          tasks={tasks.todo}
          onAddTask={() => addTask("todo")}
          onDeleteTask={(id) => deleteTask("todo", id)}
          onEditTask={(id) => editTask("todo", id)}
        />

        <Column
          id="inProgress"
          title="In Progress"
          tasks={tasks.inProgress}
          onAddTask={() => addTask("inProgress")}
          onDeleteTask={(id) => deleteTask("inProgress", id)}
          onEditTask={(id) => editTask("inProgress", id)}
        />

        <Column
          id="done"
          title="Done"
          tasks={tasks.done}
          onAddTask={() => addTask("done")}
          onDeleteTask={(id) => deleteTask("done", id)}
          onEditTask={(id) => editTask("done", id)}
        />
      </div>
    </DndContext>
  );
}

export default Board;