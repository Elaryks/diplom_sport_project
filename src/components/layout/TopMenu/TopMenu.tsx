import React from "react";
import { TopMenuView } from "./TopMenuView";
import { useRootStore } from "../../../hooks/useRootStore";
import { showMessage } from "../../../helpers/notifierHelpers";

interface ITopMenu {
  isAuthorized?: boolean;
}

export function TopMenu(props: ITopMenu) {
  const { authStore } = useRootStore();

  const handleLogOut = async () => {
    await authStore.logOut();
    showMessage("Вы вышли из профиля", undefined);
  };

  return <TopMenuView handleLogOut={handleLogOut} {...props} />;
}
