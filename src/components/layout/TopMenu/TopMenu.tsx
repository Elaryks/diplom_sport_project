import React from "react";
import { TopMenuView } from "./TopMenuView";
import { useRootStore } from "../../../hooks/useRootStore";
import { showMessage } from "../../../helpers/notifierHelpers";
import { useNavigate } from "react-router-dom";

interface ITopMenu {
  isAuthorized?: boolean;
}

export function TopMenu(props: ITopMenu) {
  const { authStore } = useRootStore();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await authStore.logOut();
    navigate("/login");
    showMessage("Вы вышли из профиля", undefined);
  };

  return <TopMenuView handleLogOut={handleLogOut} {...props} />;
}
