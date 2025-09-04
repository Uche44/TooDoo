import React from "react";
import { useState, useEffect } from "react";
import { db } from "../lib/idb";
import type { Props } from "../types/taskFormData";

const CategoryDisplay: React.FC<Props> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const notes = await db.getAll("notes");
      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(notes.map((note: any) => note.category).filter(Boolean))
      );
      setCategories(uniqueCategories);
    };
    fetchCategories();
  }, []);

  return (
    <section className="w-full h-fit mt-4 flex max-w-[600px] flex-wrap gap-4">
      <button
        className={`px-3 py-1 border-2 border-amber-300 text-xl rounded-[10px] font-semibold transition cursor-pointer text-center ${
          selectedCategory === ""
            ? "bg-amber-400 text-white"
            : "bg-white text-amber-300 hover:bg-amber-400 hover:text-white"
        }`}
        onClick={() => setSelectedCategory("")}
      >
        All tasks
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-3 py-1 border-2 border-amber-300 text-xl rounded-[10px] font-semibold transition cursor-pointer text-center ${
            selectedCategory === cat
              ? "bg-amber-400 text-white"
              : "bg-white text-amber-300 hover:bg-amber-400 hover:text-white"
          }`}
          onClick={() => setSelectedCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </section>
  );
};

export default CategoryDisplay;
