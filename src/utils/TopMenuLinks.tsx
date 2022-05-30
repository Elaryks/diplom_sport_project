import React from "react";
import { FiArchive, FiColumns, FiList, FiTarget, FiUsers } from "react-icons/fi";

interface ITopMenuLink {
  key: string;
  text: string;
  link: string;
  icon?: React.ReactElement;
}

export const topMenuLinks: ITopMenuLink[] = [
  {
    key: "1",
    text: "Матчи",
    link: "/game",
    icon: <FiTarget />,
  },
  {
    key: "2",
    text: "Турнирная таблица",
    link: "/table",
    icon: <FiColumns />,
  },
  {
    key: "3",
    text: "Соревнования",
    link: "/tournament",
    icon: <FiList />,
  },
  {
    key: "4",
    text: "Команды",
    link: "/team",
    icon: <FiUsers />,
  },
  {
    key: "5",
    text: "Участники",
    link: "/player",
    icon: <FiUsers />,
  },
  {
    key: "6",
    text: "Места проведения",
    link: "/room",
    icon: <FiArchive />,
  },
];
