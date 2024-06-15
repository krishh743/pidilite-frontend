// routes/Routes.js
import Test from "../pages/admin/Test";
import AdminSetup from "../pages/admin/admin-setup/AdminSetup";
import AdminProtectedRoute from "./AdminProtectedRoute";
import TrainerProtectedRoute from "./TrainerProtectedRoute";
import ArchivesList from "../pages/trainer/game-play/archives/ArchivesList";
import GamesList from "../pages/trainer/game-play/games-list/GamesList";
import OnGoingList from "../pages/trainer/game-play/ongoing-list/OnGoingList";
import TrainerGamePlay from "../pages/trainer/game-play/TrainerGamePlayer";

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
    path: "/trainer/games-play",
    component: TrainerGamePlay,
    protectedRoute: TrainerProtectedRoute,
  },{
    path: "/trainer/games-list",
    component: GamesList,
    protectedRoute: TrainerProtectedRoute,
  },
  {
    path: "/trainer/ongoing-list",
    component: OnGoingList,
    protectedRoute: TrainerProtectedRoute,
  },
  {
    path: "/trainer/archives",
    component: ArchivesList,
    protectedRoute: TrainerProtectedRoute,
  },
];

export default routes;
