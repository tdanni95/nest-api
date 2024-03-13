import { createBrowserRouter } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";
import { Home } from "./Home";
import { PrivateRoute } from "./routing/PirvateRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute to="/login">
        <Home />
      </PrivateRoute>
    ),
    children: [{ path: "/", element: <Home /> }],
  },
]);

export default router;
