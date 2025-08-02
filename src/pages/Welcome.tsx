// import { Icon } from "@iconify/react";
import "../index.css";
import { NavLink } from "react-router";

import "../styles/welcome.css";
const Welcome: React.FC = () => {
  return (
    <section className="container">
      <img
        src="/nobg.png"
        alt=""
        className="w-[100%] h-[60vh] mt-16 mb-10 "
      />
    

      <NavLink
        to="/login"
        className="nav"
      >
        Get Started
      </NavLink>
    </section>
  );
};

export default Welcome;
