import React, { useState } from "react";
import type { TaskFormData } from "../types/taskFormData";
import { db } from "../lib/idb";
const emojiOptions = [
  "😀",
  "📚",
  "💼",
  "🏃‍♂️",
  "🛒",
  "🎨",
  "💡",
  "📝",
  "🍔",
  "🎵",
];

const TaskForm: React.FC = () => {
  const [form, setForm] = useState<TaskFormData>({
    title: "",
    description: "",
    category: "",
    emoji: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    if (!form.title.trim()) {
      setError("Task title is required.");
      return false;
    }
    if (!form.description.trim()) {
      setError("Task description is required.");
      return false;
    }
    if (!form.category.trim()) {
      setError("Category is required.");
      return false;
    }
    if (!form.emoji) {
      setError("Please select an emoji.");
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmojiSelect = (emoji: string) => {
    setForm((prev) => ({ ...prev, emoji }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const key = await db.put("notes", {
        title: form.title,
        desc: form.description,
        category: form.category,
        emoji: form.emoji,
      });
      if (key) {
        const savedTask = await db.get("notes", key);
        console.log(savedTask);
      } else {
        console.log("db creation failed");
      }
    } catch (error) {
      console.log("error:", error);
    }

    setSuccess("Task created successfully!");
    setForm({ title: "", description: "", category: "", emoji: "" });
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 mt-8"
    >
      <h2 className="text-2xl font-bold mb-2 text-center">Create a Task</h2>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Task title"
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Task description"
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none min-h-[80px]"
      />
      <input
        type="text"
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Add a Category"
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
      <div className="flex flex-col gap-2">
        <label className="font-medium">Choose an emoji:</label>
        <div className="flex flex-wrap gap-2">
          {emojiOptions.map((opt) => (
            <button
              type="button"
              key={opt}
              className={`text-2xl px-2 py-1 rounded hover:bg-amber-100 border ${
                form.emoji === opt
                  ? "border-amber-400 bg-amber-50"
                  : "border-transparent"
              }`}
              onClick={() => handleEmojiSelect(opt)}
              aria-label={opt}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}
      <button
        type="submit"
        className="bg-amber-400 text-white font-semibold py-2 rounded hover:bg-amber-500 transition"
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
