import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import TodoPage from "./pages/TodoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/todo",
    element: <TodoPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
