import { useState, useEffect } from "react";
import { db } from "../lib/idb";
import type { Task } from "../types/taskFormData";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchTasks = async () => {
      const allTasks = await db.getAll("notes");
      setTasks(allTasks);
    };
    fetchTasks();
  }, []);

  const handleCheck = (id: number | undefined) => {
    if (id === undefined) return;
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = async (id: number | undefined) => {
    if (id === undefined) return;
    await db.delete("notes", id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setChecked((prev) => {
      const newChecked = { ...prev };
      delete newChecked[id];
      return newChecked;
    });
  };

  return (
    <section className="max-w-[600px] w-full h-fit flex flex-col gap-4 mt-4">
      {tasks.length === 0 && (
        <p className="text-center text-gray-400">No tasks found.</p>
      )}
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between bg-white rounded shadow p-3 gap-2"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={!!checked[task.id ?? 0]}
              onChange={() => handleCheck(task.id)}
              className="accent-amber-400 w-5 h-5"
            />
            <span className="text-2xl">{task.emoji}</span>
            <div>
              <div className="font-semibold text-lg">{task.title}</div>
              <div className="text-gray-500 text-sm">{task.desc}</div>
            </div>
          </div>
          {checked[task.id ?? 0] && (
            <button
              onClick={() => handleDelete(task.id)}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </section>
  );
};

export default Tasks;
