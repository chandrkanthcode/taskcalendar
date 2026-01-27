import { useState } from "react";

const TaskForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    priority: initialData?.priority || "medium",
    tags: initialData?.tags || "",
    dueDate: initialData?.dueDate || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      tags: form.tags.split(",").map(t => t.trim())
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
      />

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />

      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
