import { observer } from "mobx-react-lite";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { AppRouterRoute } from "../appRouterRoute/AppRouterRoute";
import { GamePage } from "../../pages/game/GamePage";
import { PlayerPage } from "../../pages/player/PlayerPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { TablePage } from "../../pages/table/TablePage";
import { TeamPage } from "../../pages/team/TeamPage";
import { TournamentPage } from "../../pages/tournament/TournamentPage";
import { SignupPage } from "../../pages/signup/SignupPage";
import { LoginPage } from "../../pages/login/LoginPage";
import { RestorePasswordPage } from "../../pages/restorePassword/RestorePasswordPage";
import { RoomPage } from "../../pages/room/RoomPage";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/game" />} />
        <Route path="/login" element={<AppRouterRoute content={<LoginPage />} />} />
        <Route path="/signup" element={<AppRouterRoute content={<SignupPage />} />} />
        <Route path="/restore-password" element={<AppRouterRoute content={<RestorePasswordPage />} />} />
        <Route path="/game" element={<AppRouterRoute content={<GamePage />} />} />
        <Route path="/player" element={<AppRouterRoute content={<PlayerPage />} />} />
        <Route path="/profile" element={<AppRouterRoute content={<ProfilePage />} />} />
        <Route path="/room" element={<AppRouterRoute content={<RoomPage />} />} />
        <Route path="/table" element={<AppRouterRoute content={<TablePage />} />} />
        <Route path="/team" element={<AppRouterRoute content={<TeamPage />} />} />
        <Route path="/tournament" element={<AppRouterRoute content={<TournamentPage />} />} />
        <Route path="*" element={<div />} />
      </Routes>
    </Router>
  );
}

export default observer(AppRouter);
