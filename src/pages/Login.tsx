import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import NameInput from "../components/NameInput";
const Login: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);
  
  const greetings: string[] = [
    "Hi there!👋",
    "Im Toodoo!📑",
    "May I know your name?🤗",
  ];

  useEffect(() => {
    if (index < greetings.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 2500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowInput(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [index, greetings.length]);

  return (
    <section className="container">
      {!showInput && (
        <AnimatePresence>
          <motion.h2
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4 }}
            className="text-5xl text-center font-bold"
          >
            {greetings[index]}
          </motion.h2>
        </AnimatePresence>
      )}

      {showInput && <NameInput />}
    </section>
  );
};

export default Login;
