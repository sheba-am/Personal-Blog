import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Write from "./pages/Write";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },  {
    path: "/login",
    element: <Login />,
  },  {
    path: "/single",
    element: <Single />,
  },  {
    path: "/write",
    element: <Write />,
  },
]);
function App() {
  return (
    <div className="App">
          <RouterProvider router={router} />

    </div>
  );
}

export default App;
