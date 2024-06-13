// routes/Routes.js
import AdminPage from "../pages/admin/AdminPage";
import Test from "../pages/admin/Test";
import AdminSetup from "../pages/admin/admin-setup/AdminSetup";
import TestTrainer from "../pages/trainer/TestTrainer";
import TrainerPage from "../pages/trainer/TrainerPage";
import AdminProtectedRoute from "./AdminProtectedRoute";
import TrainerProtectedRoute from "./TrainerProtectedRoute";

const routes = [
  {
    path: "/admin/setup",
    component: AdminSetup,
    protectedRoute: AdminProtectedRoute,
  },
  {
    path: "/admin/add-user",
    component: Test,
    protectedRoute: AdminProtectedRoute,
  },

  {
    path: "/trainer/dashboard",
    component: TrainerPage,
    protectedRoute: TrainerProtectedRoute,
  },
  {
    path: "/trainer/test-t",
    component: TestTrainer,
    protectedRoute: TrainerProtectedRoute,
  },
];

export default routes;
