import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import AddTaskButton from "./AddTaskButton";

function Column({ id, title, tasks, onAddTask, onDeleteTask, onEditTask }) {
  const { setNodeRef } = useDroppable({
    id: id
  });

  return (
    <div
      ref={setNodeRef}
     style={{
  background: "#f9fafb",
  padding: "12px",
  width: "300px",
  borderRadius: "12px",
  minHeight: "250px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
}}
    >
      <h2>{title}</h2>

      {tasks.map((task) => (
        <TaskCard
  key={task.id}
  task={task}
  columnId={id}
  onDelete={onDeleteTask}
  onEdit={onEditTask}
/>
      ))}

      <AddTaskButton onAdd={onAddTask} />
    </div>
  );
}

export default Column;