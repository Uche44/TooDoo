import { useState, useEffect } from "react";
import { db } from "../lib/idb";
import TaskForm from "../components/TaskForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import faHamburgerIcon from "@iconify-icons/fa-solid/hamburger";
import faPlus from "@iconify-icons/fa-solid/plus";
import CategoryDisplay from "../components/CategoryDisplay";

const TodoPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await db.get("user", "user");
        if (user && user.name) {
          setName(user.name);
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col items-center px-4 py-7">
      {showForm && <TaskForm />}
      {!showForm && (
        <>
          <div className="h-fit w-full max-w-[600px]">
            <Icon
              icon={faHamburgerIcon}
              className="text-2xl mb-8"
            />

            <div className="w-full h-[3rem] flex items-center justify-between">
              <div className="text w-fit h-fit">
                <h2 className="text-3xl font-bold">Hello {name}</h2>
                <p className="text-xl font-medium">You have 0 tasks</p>
              </div>
              <p className="text-[4.5rem] pb-8">👧</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-5 py-2 font-semibold text-white bg-[#eeba37] mt-8 rounded-[5px] cursor-pointer"
          >
            <Icon
              icon={faPlus}
              className="text-2xl "
            />
          </button>
        </>
      )}
      <CategoryDisplay />
    </section>
  );
};

export default TodoPage;
