import React from "react";
import { useState, useEffect } from "react";
import { db } from "../lib/idb";

const CategoryDisplay: React.FC = () => {
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
    <section className="w-full h-fit mt-4 flex gap-4">
      <button className="px-3 py-1 mb-4 border-2 border-amber-300 bg-white text-xl rounded-[10px] text-amber-300 font-semibold hover:bg-amber-400 transition cursor-pointer text-center">
        All tasks
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className="px-3 py-1 mb-4 border-2 border-amber-300 bg-white text-xl rounded-[10px] text-amber-300 font-semibold hover:bg-amber-400 transition cursor-pointer text-center"
        >
          {cat}
        </button>
      ))}
    </section>
  );
};

export default CategoryDisplay;
