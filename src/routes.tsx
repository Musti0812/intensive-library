import { createBrowserRouter } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import DashboardPage from "./pages/DashboardPage";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "/categories", element: <CategoriesPage /> },
    ],
  },
]);

export default router;
