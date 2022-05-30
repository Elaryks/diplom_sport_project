import React from "react";
import { UnauthorizedLayout } from "../../../layouts/unauthorized";

interface IAppRouterRoute {
  content: React.ReactElement;
  // null/undefined - страница доступна всем, true - только аутентифицированным, false - только не аутентифицированным
  isPrivate?: boolean;
  requiredPermissions?: string[];
  // Страница, на которую произойдёт перенаправление, если нет необходимого доступа для текущей страницы
  fallbackPage?: string;
}

export function AppRouterRoute(props: IAppRouterRoute) {
  return <UnauthorizedLayout>{props.content}</UnauthorizedLayout>;
}
