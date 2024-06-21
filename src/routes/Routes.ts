// routes/Routes.js
import AdminSetup from "../pages/admin/admin-setup/AdminSetup";
import AdminProtectedRoute from "./AdminProtectedRoute";
import TrainerProtectedRoute from "./TrainerProtectedRoute";
import ArchivesList from "../pages/trainer/game-play/archives/ArchivesList";
import GamesList from "../pages/trainer/game-play/games-list/GamesList";
import OnGoingList from "../pages/trainer/game-play/ongoing-list/OnGoingList";
import TrainerGamePlay from "../pages/trainer/game-play/TrainerGamePlayer";
import AddUsers from "../pages/admin/add-user/AddUsers";
import LiveGamesPages from "../pages/admin/live-games/LiveGamesPages";

const routes = [
  {
    path: "/admin/add-user",
    component: AddUsers,
    protectedRoute: AdminProtectedRoute,
  },
  {
    path: "/admin/setup",
    component: AdminSetup,
    protectedRoute: AdminProtectedRoute,
  },
  {
    path: "/admin/live-games",
    component: LiveGamesPages,
    protectedRoute: AdminProtectedRoute,
  },

  {
    path: "/trainer/games-play",
    component: TrainerGamePlay,
    protectedRoute: TrainerProtectedRoute,
  },

  {
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
