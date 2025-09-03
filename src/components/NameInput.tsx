import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../lib/idb";

const NameInput = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!userName.trim()) {
      setError("Name is required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await db.put("user", { name: userName }, "user");
    } catch (error) {
      console.error("Error saving user name:", error);
      setError("Failed to save your name. Please try again.");
      return;
    }

    navigate("/todo");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-screen px-6 py-8 flex flex-col items-center justify-center md:flex-row gap-4"
    >
      <h2 className="text-3xl mb-6 absolute top-[36%]">
        Enter your name, ml 😊
      </h2>

      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="bg-white px-4 py-4 w-full rounded-[5px] md:w-[70%]"
        placeholder="Username"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        type="submit"
        className="px-7 py-2 font-semibold text-white bg-[#eeba37] mt-4 rounded-[5px] cursor-pointer"
      >
        Jump in
      </button>
    </form>
  );
};

export default NameInput;
