import React from "react";
import { TopMenuView } from "./TopMenuView";

interface ITopMenu {
  isAuthorized?: boolean;
}

export function TopMenu(props: ITopMenu) {
  return <TopMenuView {...props} />;
}
