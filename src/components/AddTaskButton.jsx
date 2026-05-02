function AddTaskButton({ onAdd }) {
  return (
    <button
      onClick={onAdd}
      style={{
        marginTop: "10px",
        padding: "6px",
        width: "100%",
        background: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      + Add Task
    </button>
  );
}

export default AddTaskButton;