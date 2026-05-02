import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function TaskCard({ task, columnId, onDelete, onEdit }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { column: columnId }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: "transform 0.2s ease",
    background: "white",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "grab"
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="task-card"
    >
      <span
        onDoubleClick={() => onEdit(task.id)}
        style={{
          fontWeight: "500",
          fontSize: "14px",
          color: "#333"
        }}
      >
        {task.title}
      </span>

     <button
  onClick={(e) => {
    e.stopPropagation();   
    onDelete(task.id);
  }}
  className="delete-btn"
>
  ✕
</button>
    </div>
  );
}

export default TaskCard;